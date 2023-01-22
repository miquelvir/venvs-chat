import { CreateRoomListItem } from "./RoomListItem.js";
import { InitCurrentUserInfo } from "../CurrentUserInfo.js";

export const InitRoomList = ({  roomStore, userStore, showLoginPicker, showCreateRoomPage }) => {
    InitCurrentUserInfo({ userStore, showLoginPicker });

    document.querySelector("#newRoomButton").addEventListener('click', showCreateRoomPage);
    
    const node = document.querySelector("#chatsList");
    const addRoom = (room) => node.appendChild(CreateRoomListItem({userStore, ...room, roomStore, selectedByDefault: roomStore.getSelectedRoomId() === room.id}));
    
    document.querySelector("#searchbar").addEventListener('input', (event) => {
        const query = event.target.value.toLowerCase();
        const chats = roomStore.getRooms();
        let idx = 0;
        for (const child of node.children)
        {
            if (chats[idx].username.toLowerCase().includes(query)){
                child.style.display = 'flex';
            } else {
                child.style.display = 'none';
            }
            idx += 1;
        }
    })

    roomStore.getRooms().forEach(addRoom);
    roomStore.subscribeOnNewRoom(( { detail }) => addRoom(detail.room))
    return node;
}