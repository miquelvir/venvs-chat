import { Messages } from './Messages.js';

export const Chat = ({ getChats, onSelectedChatIdChanged, getSelectedChatId }) => {
    const init = () => {
        const selectedChatId = getSelectedChatId();
        const selectedChat = getChats().find(chat => chat.id === selectedChatId);
        Messages({messages: selectedChat.messages})  // todo should components rerender or hold state, choose one
        document.querySelector(".header .profilePicture .avatar").src = selectedChat.avatarUri;
        document.querySelector(".header .displayName").innerHTML = selectedChat.displayName;
    }

    onSelectedChatIdChanged(init);
    init();
}