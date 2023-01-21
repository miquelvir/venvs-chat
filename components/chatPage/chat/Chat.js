import { InitMessages } from './Messages.js';
import { roomInfoProviderFromType } from '../roomInfoProfiderFromRoomType.js';

export const InitChat = ({ chatStore, userStore }) => {
    const init = () => {
        InitMessages({ chatStore, userStore });

        const profilePictureNode = document.querySelector(".header .profilePicture .avatar");
        const input = document.querySelector(".inputTools");

        const selectedChatId = chatStore.getSelectedChatId();
        if (selectedChatId === null) {
            profilePictureNode.style.visibility = 'hidden';
            input.style.visibility = 'hidden';
            return;
        }

        const selectedChat = chatStore.getChatById(selectedChatId);
        const { name, avatarUri} = roomInfoProviderFromType[selectedChat.type]({...selectedChat, userStore});
        profilePictureNode.src = avatarUri;
        profilePictureNode.style.visibility = 'visible';
        input.style.visibility = 'visible';
        document.querySelector(".header .displayName").innerHTML = name;
    }

    chatStore.subscribeOnSelectedChatChanged(init);
    init();
} 
