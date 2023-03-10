import { InitRoomList } from './components/chatPage/roomList/RoomList.js';
import { InitChat } from './components/chatPage/chat/Chat.js';
import { RoomStore } from './stores/RoomStore.js';
import { UserStore } from './stores/UserStore.js';
import { INTERNAL_CURRENT_USER_ID, Page } from './constants.js';
import { InitLoginPage } from './components/loginPage/LoginPage.js';
import { CurrentUserIdStore } from './stores/CurrentUserIdStore.js';
import { InitAvatarPickerPage } from './components/avatarPickerPage/AvatarPickerPage.js';
import { InitRealtimeSyncronizer } from './realtimeSyncronizer.js';
import { MessageStore } from './stores/MessageStore.js';
import { InitNewRoomPage } from './components/newRoomPage/NewRoomPage.js';

var ChatController = {
    // state
    _roomStore: null,
    _messageStore: null,
    _userStore: null,
    _currentUserIdStore: null,
    _currentPage: null,

    // init
    init: () => {
        // stores (keep track of state and alllow subscription to changes)
        ChatController._messageStore = new MessageStore();
        ChatController._roomStore = new RoomStore({ messageStore: ChatController._messageStore });
        ChatController._userStore = new UserStore([{ id: INTERNAL_CURRENT_USER_ID, avatarUri: 'public/default-avatar.jpg', username: 'unnamed' }]);  // initialise the user store with the internal user representing the current user
        ChatController._currentUserIdStore = new CurrentUserIdStore();

        // init components
        InitLoginPage({ nextPage: ChatController._avatarPickerPage, userStore: ChatController._userStore });
        InitAvatarPickerPage({ userStore: ChatController._userStore, nextPage: ChatController._chatPage });
        InitChat({ roomStore: ChatController._roomStore, userStore: ChatController._userStore, messageStore: ChatController._messageStore });
        InitRoomList({ roomStore: ChatController._roomStore, userStore: ChatController._userStore, showLoginPicker: ChatController._avatarPickerPage, showCreateRoomPage: ChatController._newRoomPage });
        InitRealtimeSyncronizer({ roomStore: ChatController._roomStore, userStore: ChatController._userStore, currentUserIdStore: ChatController._currentUserIdStore, messageStore: ChatController._messageStore })
        InitNewRoomPage({ roomStore: ChatController._roomStore, nextPage: ChatController._chatPage });
        
        // allow shortcuts to navigate between pages
        document.addEventListener('keydown', function(e) {
            if(e.key == 'Escape'){
              if ([Page.NewRoomPage, Page.AvatarPicker].includes(ChatController._currentPage)) {
                ChatController._chatPage();
              }
            }
        });

        // show the login page
        ChatController._loginPage();
    },

    // pages
    _loginPage: () => ChatController.__showPage(Page.Login),
    _chatPage: () => ChatController.__showPage(Page.Chat),
    _avatarPickerPage: () => ChatController.__showPage(Page.AvatarPicker),
    _newRoomPage: () => ChatController.__showPage(Page.NewRoomPage),
    __showPage: (selectedPage) => {
        if (!Object.values(Page).includes(selectedPage)) throw new Error(`Page ${selectedPage} is not a valid Page.`);
        Object.values(Page).forEach((page) => {
            if (page === selectedPage) {
                document.querySelector(`#${page}`).style.display = 'flex';
            } else {
                document.querySelector(`#${page}`).style.display = 'none';
            }
        });
        ChatController._currentPage = selectedPage;
    },
}

ChatController.init();

// todo mobile
