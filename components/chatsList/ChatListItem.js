import { htmlToElement, timestampToTime } from '../../utils.js'

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

export const InitChatListItem = ({setSelectedChatId, avatarUri, displayName, messages, id, getSelectedChatId}) => {
    const {summaryText, summaryTime} = getSummary(messages);
    const node = htmlToElement(`<div class="chat ${getSelectedChatId() === id? 'active': ''}">
        <div class="profilePicture" >
            <img class="avatar" src="${avatarUri}" alt="user profile picture">
        </div>
        <div class="text">
            <div class="displayName">${displayName}</div>
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
        setSelectedChatId(() => id);
    })

    return node;
}