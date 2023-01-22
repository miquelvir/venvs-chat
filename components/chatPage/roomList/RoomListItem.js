import { htmlToElement } from '../../../utils.js';

export const CreateRoomListItem = ({roomStore, displayName, id, selectedByDefault}) => {
    const avatarUri = 'public/avatars/default-avatar.jpg';
    const node = htmlToElement(`<div class="chat ${selectedByDefault? 'active': ''}">
        <div class="profilePicture" >
            <img class="avatar" src="${avatarUri}" alt="user profile picture">
        </div>
        <div class="text">
            <div class="displayName">${displayName}</div>
        </div>
    </div>`);
    node.addEventListener('click', () => {
        document.querySelectorAll(".chat.active").forEach(item => {
            item.classList.remove('active');
        })
        node.classList.add('active');
        roomStore.selectRoom(id);
    })

    return node;
}