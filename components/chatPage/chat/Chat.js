import { InitMessages } from './Messages.js';
import { InitNewMessageInput } from './NewMessageInput.js';

export const InitChat = ({ roomStore, userStore, messageStore }) => {
    InitNewMessageInput({ messageStore });

    const init = () => {
        InitMessages({roomStore, userStore, messageStore })
        const profilePictureNode = document.querySelector(".header .profilePicture .avatar");
        const input = document.querySelector(".inputTools");

        const selectedChatId = roomStore.getSelectedRoomId();
        if (selectedChatId === null) {
            profilePictureNode.style.visibility = 'hidden';
            input.style.visibility = 'hidden';
            return;
        }

        const selectedChat = roomStore.getRoomById(selectedChatId);
        profilePictureNode.style.visibility = 'visible';
        input.style.visibility = 'visible';
        document.querySelector(".header .displayName").innerHTML = selectedChat.displayName;
    }

    roomStore.subscribeOnSelectedRoomChanged(init);
    init();
} 
