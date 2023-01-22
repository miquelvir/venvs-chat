const WS_SERVER_URI = "wss://ecv-etic.upf.edu/node/9000/ws";
import { INTERNAL_CURRENT_USER_ID, Side, MessageType } from './constants.js';

const logGroup = '[RealtimeSyncronizer]';

export const InitRealtimeSyncronizer = ({ userStore, roomStore, currentUserIdStore, messageStore }) => {
    const wsClient = new SillyClient();
    wsClient.on_ready = (id) => currentUserIdStore.setId(id);

    const toServerMessage = (internalMessage) => {
        const my = userStore.getUserById(internalMessage.userId);
        return {
            ...internalMessage,
            username: my.username,
            avatarUri: my.avatarUri,
            userId: internalMessage.userId === INTERNAL_CURRENT_USER_ID ? currentUserIdStore.getId() : internalMessage.userId,
            side: Side.RECEIVED
        }
    }

    wsClient.on_user_connected = (id) => {
        const chatId = roomStore.getSelectedRoomId();
        wsClient.getRoomInfo(chatId, (roomInfo) => {
            const myId = currentUserIdStore.getId();
            const earliestClientId = Math.min(...roomInfo.clients);
            console.debug(`${logGroup} New joiner: ${id} | Oldest client: ${earliestClientId} | I am: ${myId}`);
            if (roomInfo.clients.length !== 0 && myId !== earliestClientId) return;  // someone else will send history

            wsClient.sendMessage(JSON.stringify({
                type: 'history',
                content: messageStore.getMessages().map(toServerMessage)
            }), [id]);
            console.debug(`${logGroup} Published history to ${id}`);
        })
    }

    messageStore.subscribeOnNewMessage(({ detail }) => {
        if (detail.message.userId !== INTERNAL_CURRENT_USER_ID) return;  // not a message we are sending
        wsClient.sendMessage(JSON.stringify(toServerMessage(detail.message)));
        console.debug(`${logGroup} Published message: ${detail.message.content}`);
    });

    roomStore.subscribeOnSelectedRoomChanged(({ detail }) => {
        wsClient.connect(WS_SERVER_URI, detail.room.id);
    });

    function fetchNewRooms() {
        console.debug(`${logGroup} Fetching new rooms...`);

        wsClient.getReportWithUrl(WS_SERVER_URI, function (report) {
            Object.keys(report.rooms).forEach(_id => {
                const id = decodeURI(_id);
                try {
                    roomStore.getRoomById(id)
                } catch (err) {  // add chat if not already in roomStore
                    roomStore.createRoom({ avatarUri: 'public/default-avatar.jpg', username: id, messages: [], id })
                }
            });
        });

        setTimeout(fetchNewRooms, 10000);
    }

    fetchNewRooms();

    wsClient.on_message = (authorId, rawMessage) => {
        let message;
        try {
            message = JSON.parse(rawMessage);
        } catch {
            console.warning(`${logGroup} Received invalid message, could not parse JSON: ${rawMessage}`);
            return;
        }

        if (message.type === MessageType.History) {
            console.debug(`${logGroup} Received history from ${authorId}: ${message.content.length} messages`);
            message.content.forEach(message => {
                if (!message.userId) message.userId = 9999999999; // for chat clients that are not sending user id
                userStore.upsertUser({ avatarUri: message.avatarUri, username: message.username, id: message.userId })  // todo update or create
                messageStore.newMessage(message);
            })
        } else if (message.type === MessageType.PlainText) {
            userStore.upsertUser({ avatarUri: message.avatarUri, username: message.username, id: authorId })  // todo update or create

            if (!message.userId) message.userId = authorId; // fill the user id if not given
            messageStore.newMessage(message);
        }
    }

}