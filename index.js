import { InitRoomList } from './components/chatPage/roomList/RoomList.js';
import { InitChat } from './components/chatPage/chat/Chat.js';
import { RoomStore } from './stores/RoomStore.js';
import { UserStore } from './stores/UserStore.js';
import { INTERNAL_CURRENT_USER_ID, Page } from './enums.js';
import { InitLoginPage } from './components/loginPage/LoginPage.js';
import { CurrentUserIdStore } from './stores/CurrentUserIdStore.js';
import { InitAvatarPickerPage } from './components/avatarPickerPage/AvatarPickerPage.js';
import { InitRealtimeSyncronizer } from './realtimeSyncronizer.js';
import { MessageStore } from './stores/MessageStore.js';


var ChatController = {
    // state
    _roomStore: null,  // todo rename to rooms
    _messageStore: null,
    _userStore: null,
    _currentUserIdStore: null,

    // init
    init: () => {
        // stores (keep track of state and alllow subscription to changes)
        ChatController._messageStore = new MessageStore();
        ChatController._roomStore = new RoomStore({ messageStore: ChatController._messageStore });
        ChatController._userStore = new UserStore([{ id: INTERNAL_CURRENT_USER_ID, avatarUri: 'public/avatars/default-avatar.jpg', displayName: 'unnamed' }]);  // initialise the user store with the internal user representing the current user
        ChatController._currentUserIdStore = new CurrentUserIdStore();

        // init components
        InitLoginPage({ nextPage: ChatController._avatarPickerPage, userStore: ChatController._userStore });
        InitAvatarPickerPage({ userStore: ChatController._userStore, nextPage: ChatController._chatPage });
        InitChat({ roomStore: ChatController._roomStore, userStore: ChatController._userStore, messageStore: ChatController._messageStore });
        InitRoomList({ roomStore: ChatController._roomStore, userStore: ChatController._userStore, showLoginPicker: ChatController._avatarPickerPage });
        InitRealtimeSyncronizer({ roomStore: ChatController._roomStore, userStore: ChatController._userStore, currentUserIdStore: ChatController._currentUserIdStore, messageStore: ChatController._messageStore })
        
        // show the login page
        ChatController._loginPage();
    },

    // pages
    _loginPage: () => ChatController.__showPage(Page.Login),
    _chatPage: () => ChatController.__showPage(Page.Chat),
    _avatarPickerPage: () => ChatController.__showPage(Page.AvatarPicker),
    __showPage: (selectedPage) => {
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
// todo just show pfp on first message
// todo private messages
// todo all unsubscribes
// todo remove console logs
// todo to sync component