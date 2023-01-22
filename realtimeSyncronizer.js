const WS_SERVER_URI = "wss://ecv-etic.upf.edu/node/9000/ws";
import { INTERNAL_CURRENT_USER_ID, Status, Side, MessageContentType } from './constants.js';

const logGroup = '[RealtimeSyncronizer]';

export const InitRealtimeSyncronizer = ({ userStore, roomStore, currentUserIdStore, messageStore }) => {
    const wsClient = new SillyClient();
    wsClient.on_ready = (id) => {
        currentUserIdStore.setId(id);
    }

    const toServerMessage = (internalMessage) => {
        // todo remove
        const my = userStore.getUserById(internalMessage.userId);
        return {
            type: internalMessage.contentType,  // todo remove type and simplify this
            username: my.displayName,
            avatarUri: my.avatarUri,
            content: internalMessage.content,
            timestamp: internalMessage.timestamp,
            userId: internalMessage.userId === INTERNAL_CURRENT_USER_ID? currentUserIdStore.getId(): internalMessage.userId
        }
    }

    const toInternalMessage = (serverMessage) => {
        // todo remove
        return {
            content: serverMessage.content, 
            timestamp: tryParseTimestamp(serverMessage?.timestamp) ?? new Date(), // fallback for users not sending a timestamp
            status: Status.SENT, // todo
            side: Side.RECEIVED, 
            contentType: serverMessage.type,  // todo simplify 
            userId: serverMessage.userId
        }
    }

    wsClient.on_user_connected = (id) => {
        const chatId = roomStore.getSelectedRoomId();
        wsClient.getRoomInfo(chatId, (roomInfo) => {
            const myId = currentUserIdStore.getId();
            const earliestClientId = Math.min(...roomInfo.clients);
            console.debug(`${id} joined the room, earliest is ${earliestClientId} and I am ${myId}`);
            if (roomInfo.clients.length !== 0 && myId !== earliestClientId) return;  // someone else will send history
            console.debug(`Sending history for ${id}`);
            wsClient.sendMessage(JSON.stringify({
                type: 'history',
                content: messageStore.getMessages().map(toServerMessage)
            }), [id]);  // send history only to new joiner
        })
    }
    
    messageStore.subscribeOnNewMessage(({ detail }) => {
        if (detail.message.userId !== INTERNAL_CURRENT_USER_ID) return;  // not a message we are sending
        wsClient.sendMessage(JSON.stringify(toServerMessage(detail.message)))
        console.debug("Sent message", detail.message)  // todo log grooup
    });

    roomStore.subscribeOnSelectedRoomChanged(({ detail }) => {
        wsClient.connect(WS_SERVER_URI, detail.room.id);
    });

    function fetchNewRooms() {
        wsClient.getReportWithUrl(WS_SERVER_URI, function (report) {
            Object.keys(report.rooms).forEach(_id => {
                const id = decodeURI(_id);
                try {
                    roomStore.getRoomById(id)
                } catch (err) {  // add chat if not already in roomStore
                    roomStore.createRoom({ avatarUri: 'public/avatars/default-avatar.jpg', displayName: id, messages: [], id })
                }
            })
        });  // todo get updates
    
        setTimeout(fetchNewRooms, 10000);
    }
    
    fetchNewRooms();

    const tryParseTimestamp = (timestamp) => {
        let result = null;
        try {
            result = new Date(Date.parse(timestamp));
        } catch {}
        if (isNaN(result)) result = null;
        return result;
    }
    wsClient.on_message = (authorId, rawMessage) => {
        console.debug(`${authorId}: ${rawMessage}`)
        let message;
        try {
            message = JSON.parse(rawMessage);
        } catch {
            console.debug(`Received invalid message, could not parse JSON: ${rawMessage}`);
            return;
        }
        
        // skip unimplemented protocols
        if (!Object.values(MessageContentType).includes(message.type)) return;

        if (message.type === MessageContentType.History){
            console.debug(`Received history from ${authorId}: ${JSON.stringify(message.content)}`);
            message.content.forEach(message => {
                userStore.upsertUser({ avatarUri: message.avatarUri, displayName: message.username, id: message.userId })  // todo update or create
                messageStore.newMessage(toInternalMessage(message));
            })
        } else {
            userStore.upsertUser({ avatarUri: message.avatarUri, displayName: message.username, id: authorId })  // todo update or create

            if (!message.userId) message.userId = authorId; // fill the user id if not given
            messageStore.newMessage(toInternalMessage(message));
        }
    }

}