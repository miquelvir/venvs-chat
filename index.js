import { chats, users } from './mockData.js';
import { InitChatList } from './components/chatPage/chatsList/ChatList.js';
import { InitChat } from './components/chatPage/chat/Chat.js';
import { ChatStore } from './stores/ChatStore.js';
import { UserStore } from './stores/UserStore.js';
import { Page, ChatType, INTERNAL_CURRENT_USER_ID, Status, Side, MessageContentType } from './enums.js';
import { InitLoginPage } from './components/loginPage/LoginPage.js';
import { CurrentUserIdStore } from './stores/CurrentUserIdStore.js';
import { InitAvatarPickerPage } from './components/avatarPickerPage/AvatarPickerPage.js';

const WS_SERVER_URI = "wss://ecv-etic.upf.edu/node/9000/ws";

var ChatController = {
    // state
    _chatStore: null,
    _userStore: null,
    _currentUserIdStore: null,

    // clients
    _wsClient: null,

    // init
    init: () => {
        // init stores
        ChatController._chatStore = new ChatStore();
        ChatController._userStore = new UserStore([...users, { id: -1, avatarUri: 'public/avatars/default-avatar.jpg', displayName: 'unnamed' }]);
        ChatController._currentUserIdStore = new CurrentUserIdStore();

        // init components
        InitLoginPage({ nextPage: ChatController._avatarPickerPage, userStore: ChatController._userStore });
        InitAvatarPickerPage({ userStore: ChatController._userStore, nextPage: ChatController._chatPage });
        InitChat({ chatStore: ChatController._chatStore, userStore: ChatController._userStore });
        InitChatList({ chatStore: ChatController._chatStore, userStore: ChatController._userStore, showLoginPicker: ChatController._avatarPickerPage });

        // start at the login page
        ChatController._loginPage();

        // syncronization
        // todo to another object
        ChatController._wsClient = new SillyClient();
        ChatController._wsClient.on_connect = () => console.log("on connect");
        
        let token = null;
        
        ChatController._wsClient.on_ready = (id) => {
            ChatController._currentUserIdStore.setId(id);
        }

        ChatController._chatStore.subscribeOnSelectedChatChanged(({ detail }) => {
            ChatController._wsClient.connect(WS_SERVER_URI, detail.chat.id);
            
            if (token) ChatController._chatStore.unsubscribeOnNewMessage(token);
            token = ChatController._chatStore.subscribeOnNewMessage(({ detail }) => {
                if (detail.message.userId !== INTERNAL_CURRENT_USER_ID) return;  // not a message we are sending
                const my = ChatController._userStore.getUserById(INTERNAL_CURRENT_USER_ID);
                ChatController._wsClient.sendMessage(JSON.stringify({
                    type: detail.message.contentType,  // todo remove type and simplify this
                    username: my.displayName,
                    avatarUri: my.avatarUri,
                    content: detail.message.content,
                    timestamp: detail.message.timestamp
                }))
                console.debug("Sent message", detail.message)  // todo log grooup
            }, detail.chat.id);
        });

        function fetchNewRooms() {
            ChatController._wsClient.getReportWithUrl(WS_SERVER_URI, function (report) {
                Object.keys(report.rooms).forEach(_id => {
                    const id = decodeURI(_id);
                    try {
                        ChatController._chatStore.getChatById(id)
                    } catch (err) {  // add chat if not already in chatStore
                        ChatController._chatStore.newChat({ avatarUri: 'public/avatars/default-avatar.jpg', displayName: id, messages: [], id, type: ChatType.Group })
                    }
                })
            });  // todo get updates
        
            setTimeout(fetchNewRooms, 10000);
        }
        
        fetchNewRooms();

        
        const tryParseTimestamp = (timestamp) => {
            try {
                return new Date(Date.parse(timestamp));
            } catch {
                return null;
            }
        }
        ChatController._wsClient.on_message = (authorId, rawMessage) => {
            let message;
            try {
                message = JSON.parse(rawMessage);
            } catch {
                console.debug(`Received invalid message, could not parse JSON: ${rawMessage}`);
                return;
            }
            
            // skip unimplemented protocols
            if (!Object.values(MessageContentType).includes(message.type)) return;

            ChatController._userStore.upsertUser({ avatarUri: message.avatarUri, displayName: message.username, id: authorId })  // todo update or create

            ChatController._chatStore.newMessage(ChatController._chatStore.getSelectedChatId(), 
            {
                content: message.content, 
                timestamp: tryParseTimestamp(message?.timestamp), 
                status: Status.SENT, // todo
                side: Side.RECEIVED, 
                contentType: message.type,  // todo simplify 
                userId: authorId
            })
        }

    },

    // pages
    _loginPage: () => ChatController._showPage(Page.Login),
    _chatPage: () => ChatController._showPage(Page.Chat),
    _avatarPickerPage: () => ChatController._showPage(Page.AvatarPicker),

    // utils
    _showPage: (selectedPage) => {
        if (!Object.values(Page).includes(selectedPage)) throw new Error(`Page ${selectedPage} is not a valid Page.`);
        Object.values(Page).forEach((page) => {
            if (page === selectedPage) {
                document.querySelector(`#${page}`).style.display = 'flex';
            } else {
                document.querySelector(`#${page}`).style.display = 'none';
            }
        });
    },
}

ChatController.init();

// todo mobile
// todo agenjo slide
// todo max width of messages
// todo bug not scrolling to bottom on init
// todo nice animation or something in the login page
// todo avatar picker on home page
// todo default character avatars
// todo favicon
// todo search through chats
// todo use name instead of user id?
// todo update previous messages profile pictures