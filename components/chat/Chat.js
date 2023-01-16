import { InitMessages } from './Messages.js';

export const InitChat = ({ getChats, onSelectedChatIdChanged, getSelectedChatId, setChats }) => {
    const init = () => {
        const selectedChatId = getSelectedChatId();
        const selectedChat = getChats().find(chat => chat.id === selectedChatId);
        InitMessages({messages: selectedChat.messages, 
            setMessages: (newMessage) => {
                setChats((chats) => {
                    const thisChat = chats.find(chat => chat.id === selectedChatId);
                    return [...chats.filter(chat => chat.id !== selectedChatId), {  // todo refactor this into a newMessageEvent
                    ...thisChat,
                    messages: [...thisChat.messages, newMessage] 
                }]})}
            })  // todo should components rerender or hold state, choose one
        document.querySelector(".header .profilePicture .avatar").src = selectedChat.avatarUri;
        document.querySelector(".header .displayName").innerHTML = selectedChat.displayName;
    }

    onSelectedChatIdChanged(init);
    init();
} 