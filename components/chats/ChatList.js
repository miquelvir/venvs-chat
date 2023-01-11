import { ChatListItem } from "./ChatListItem.js";

export const ChatList = ({  getChats, onChatsChanged, setSelectedChatId }) => {
    const node = document.querySelector("#chatsList");
    const fillChats = () => getChats().forEach(chat => node.appendChild(ChatListItem({setSelectedChatId, ...chat})));
    fillChats();
    onChatsChanged(() => {
        document.querySelector("#chatsList").replaceChildren();
        fillChats();
    })
    return node;
}