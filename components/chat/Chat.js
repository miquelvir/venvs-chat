import { InitMessages } from './Messages.js';
import { roomInfoProviderFromType } from '../roomInfoProfiderFromRoomType.js';

export const InitChat = ({ chatStore, userStore }) => {
    const init = () => {
        const selectedChat = chatStore.getChatById(chatStore.getSelectedChatId());
        InitMessages({messages: selectedChat.messages, chatStore});
        const { name, avatarUri} = roomInfoProviderFromType[selectedChat.type]({...selectedChat, userStore});
        document.querySelector(".header .profilePicture .avatar").src = avatarUri;
        document.querySelector(".header .displayName").innerHTML = name;
    }

    chatStore.subscribeOnSelectedChatChanged(init);
    init();
} 
