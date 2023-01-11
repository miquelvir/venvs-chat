import { chats } from './mockData.js';
import { useState } from './utils.js';
import { ChatList } from './components/chats/ChatList.js';
import { Chat } from './components/chat/Chat.js';

var {get: getChats, onChange: onChatsChanged} = useState(chats);
var {get: getSelectedChatId, set: setSelectedChatId, onChange: onSelectedChatIdChanged} = useState(chats[0].id);

Chat({ getChats, onSelectedChatIdChanged, getSelectedChatId })
ChatList({ getChats, onChatsChanged, setSelectedChatId })
