import { chats } from './mockData.js';
import { useState } from './utils.js';
import { InitChatList } from './components/chatsList/ChatList.js';
import { InitChat } from './components/chat/Chat.js';
import { ChatsStore } from './controllers/ChatsStore.js';
export var ChatController = {
    init: () => {
        const chatStore = new ChatsStore(chats);
        
        var {get: getSelectedChatId, set: setSelectedChatId, onChange: onSelectedChatIdChanged} = useState(chats[0].id);

        InitChat({ chatStore, onSelectedChatIdChanged, getSelectedChatId });
        InitChatList({ chatStore, setSelectedChatId, getSelectedChatId });
        
    }
}

ChatController.init();

// todo mobile
// todo agenjo slide
// todo max width of messages