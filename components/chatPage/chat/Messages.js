import { chatLineFactory } from './chatLineFactory.js';
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


let newMessageSubscriptionCancelToken = null;
export const InitMessages = ({ roomStore, userStore, messageStore }) => {
    const selectedChatId = roomStore.getSelectedRoomId();
    if (selectedChatId === null) return;

    const node = document.querySelector(".messages");
    node.replaceChildren();  // empty
    constructLines(messageStore.getMessages()).forEach((line) => {  // todo refactor to on new chat only
        node.appendChild(chatLineFactory({ userStore, ...line}))
    });

    const scrollDown = () => node.scroll({ top: node.scrollHeight, behavior: 'smooth' });
    scrollDown();

    newMessageSubscriptionCancelToken = messageStore.subscribeOnNewMessage((event) => {
        node.appendChild(chatLineFactory({ userStore, ...event.detail.message}));  // todo pass message without this
        scrollDown();
    }, newMessageSubscriptionCancelToken);

    return node;
}