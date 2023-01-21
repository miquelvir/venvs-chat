import { chatLineFactory } from './chatLineFactory.js';
import { InitNewMessageInput } from './NewMessageInput.js';
import { LineType } from "../../../enums.js";

export const constructLines = (messages) => {
    const lines = [];
    let lastDay = null;
    messages.forEach(message => {
        const { timestamp } = message;
        const day = timestamp.toLocaleDateString('en-GB');
        if (lastDay === null || lastDay !== day) {
            lastDay = day;
            lines.push({
                timestamp: timestamp,
                type: LineType.DayDivider
            });
        }
        lines.push(message);
    });    
    return lines;
}


export const InitMessages = ({ chatStore, userStore }) => {
    InitNewMessageInput({chatStore})

    const selectedChatId = chatStore.getSelectedChatId();
    if (selectedChatId === null) return;
    const selectedChat = chatStore.getChatById(selectedChatId);
        
    const node = document.querySelector(".messages");
    node.replaceChildren();  // empty
    constructLines(selectedChat.messages).forEach((line) => {
        node.appendChild(chatLineFactory({ userStore, chatType: selectedChat.type, ...line}))
    });

    const scrollDown = () => node.scroll({ top: node.scrollHeight, behavior: 'smooth' });;

    chatStore.subscribeOnNewMessage((event) => {
        console.log(event.detail.message)
        node.appendChild(chatLineFactory({ userStore, chatType: selectedChat.type, ...event.detail.message}));  // todo pass message without this
        scrollDown();
    }, selectedChatId);

    scrollDown();
    return node;
}