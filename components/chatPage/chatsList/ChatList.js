import { CreateChatListItem } from "./ChatListItem.js";
import { InitCurrentUserInfo } from "./CurrentUserInfo.js";
import { ChatType } from "../../../enums.js";
export const InitChatList = ({  chatStore, userStore, showLoginPicker }) => {
    InitCurrentUserInfo({ userStore, showLoginPicker });

    document.querySelector("#newGroupButton").addEventListener('click', () => {
        const displayName = prompt("Room name"); // todo dont use prompt
        chatStore.newChat({ 
            avatarUri: '/public/avatars/default-avatar.jpg', 
            displayName: displayName, 
            messages: [], 
            id: displayName, 
            type: ChatType.Group
        })
    })
    
    const node = document.querySelector("#chatsList");
    const addChat = (chat) => node.appendChild(CreateChatListItem({userStore, ...chat, chatStore, selectedByDefault: chatStore.getSelectedChatId() === chat.id}));
    
    document.querySelector("#searchbar").addEventListener('input', (event) => {
        const query = event.target.value.toLowerCase();
        const chats = chatStore.getChats();
        console.log(node.children)
        let idx = 0;
        for (const child of node.children)
        {
            console.log(child)
            console.log(chats[idx].displayName)
            if (chats[idx].displayName.toLowerCase().includes(query)){
                child.style.display = 'flex';
            } else {
                child.style.display = 'none';
            }
            idx += 1;
        }
    })

    chatStore.getChats().forEach(addChat);
    chatStore.subscribeOnNewChat(( { detail }) => addChat(detail.chat))
    
    return node;
}