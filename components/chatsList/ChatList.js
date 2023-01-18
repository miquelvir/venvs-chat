import { CreateChatListItem } from "./ChatListItem.js";
import { InitCurrentUserInfo } from "./CurrentUserInfo.js";

export const InitChatList = ({  chatStore, userStore, currentUserStore }) => {
    InitCurrentUserInfo({ userStore, currentUserStore });
    
    const node = document.querySelector("#chatsList");
    const selectedChatId = chatStore.getSelectedChatId();
    const addChat = (chat) => node.appendChild(CreateChatListItem({userStore, ...chat, chatStore, selectedByDefault: selectedChatId === chat.id}));
    const fillChats = () => chatStore.getChats().forEach(chat => addChat(chat));
    fillChats();

    chatStore.subscribeOnNewChat((chat) => addChat(chat))
    return node;
}