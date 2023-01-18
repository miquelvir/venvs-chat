import { chats, users } from './mockData.js';
import { InitChatList } from './components/chatsList/ChatList.js';
import { InitChat } from './components/chat/Chat.js';
import { ChatStore } from './stores/ChatStore.js';
import { UserStore } from './stores/UserStore.js';
import { Page } from './enums.js';
import { InitLoginPage } from './components/login/LoginPage.js';
import { CurrentUserStore } from './stores/CurrentUserStore.js';

export var ChatController = {
    // state
    chatStore: null,
    userStore: null,
    currentUserStore: null,

    // methods
    init: () => {
        ChatController.chatStore = new ChatStore(chats);
        ChatController.userStore = new UserStore(users);
        ChatController.currentUserStore = new CurrentUserStore('92e5d4d5-1c16-4785-a656-27c2c0c7d3a8'); // todo from api

        InitLoginPage({ displayChat: ChatController._displayChat, userStore: ChatController.userStore, currentUserStore: ChatController.currentUserStore });
    },

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

    _displayChat: () => {
        InitChat({ chatStore: ChatController.chatStore, userStore: ChatController.userStore });
        InitChatList({ chatStore: ChatController.chatStore, userStore: ChatController.userStore, currentUserStore: ChatController.currentUserStore });
        ChatController._showPage(Page.Chat);
    }
}

ChatController.init();

// todo mobile
// todo agenjo slide
// todo max width of messages
// todo bug not scrolling to bottom on init
// todo nice animation or something in the login page
// todo avatar picker on home page
// todo default character avatars