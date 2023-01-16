import { InitChatListItem } from "./ChatListItem.js";

export const InitChatList = ({  chatStore, setSelectedChatId, getSelectedChatId }) => {
    const node = document.querySelector("#chatsList");
    const addChat = (chat) => node.appendChild(InitChatListItem({setSelectedChatId, ...chat, getSelectedChatId}));
    const fillChats = () => chatStore.getChats().forEach(chat => addChat(chat));
    fillChats();

    chatStore.subscribeOnNewChat((chat) => addChat(chat))
    return node;
}