import { chatLineFactory } from './chatLineFactory.js';
import { InitNewMessageInput } from './NewMessageInput.js';
import { LineType } from "../../enums.js";

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


export const InitMessages = ({ messages, chatStore }) => {
    InitNewMessageInput({chatStore})
    const node = document.querySelector(".messages");
    node.replaceChildren();  // empty
    constructLines(messages).forEach((line) => {
        node.appendChild(chatLineFactory(line))
    });
    // todo on new message
    node.scroll({ top: node.scrollHeight, behavior: 'smooth' });
    return node;
}