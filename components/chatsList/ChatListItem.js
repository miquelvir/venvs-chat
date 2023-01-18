import { htmlToElement, timestampToTime } from '../../utils.js';
import { roomInfoProviderFromType } from '../roomInfoProfiderFromRoomType.js';

const getSummary = (messages) => {
    if (messages.length === 0) return {
        summaryText: null,
        summaryTime: null
    }
    const lastMessage = messages[messages.length-1];
    const summaryText = lastMessage.content;
    const summaryTime = timestampToTime(lastMessage.timestamp);
    return { summaryText, summaryTime };
}

export const CreateChatListItem = ({chatStore, displayName, messages, id, type, userStore, selectedByDefault}) => {
    const {summaryText, summaryTime} = getSummary(messages);
    const { avatarUri, name } = roomInfoProviderFromType[type]({ userStore, id, displayName });
    const node = htmlToElement(`<div class="chat ${selectedByDefault? 'active': ''}">
        <div class="profilePicture" >
            <img class="avatar" src="${avatarUri}" alt="user profile picture">
        </div>
        <div class="text">
            <div class="displayName">${name}</div>
            <div class="summary">${summaryText? summaryText: ''}</div>
        </div>
        <div class="time" >
        ${summaryTime? summaryTime: ''}
        </div>
    </div>`);
    node.addEventListener('click', () => {
        document.querySelectorAll(".chat.active").forEach(item => {
            item.classList.remove('active');
        })
        node.classList.add('active');
        chatStore.selectChat(id);
    })

    return node;
}