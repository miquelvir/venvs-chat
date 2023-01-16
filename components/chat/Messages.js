import { chatLineFactory } from './chatLineFactory.js';
import { constructLines } from './utils.js';
import { InitNewMessageInput } from './NewMessageInput.js';

export const InitMessages = ({ messages, setMessages }) => {
    InitNewMessageInput({setMessages})
    const node = document.querySelector(".messages");
    node.replaceChildren();  // empty
    constructLines(messages).forEach((line) => {
        node.appendChild(chatLineFactory(line))
    });
    node.scroll({ top: node.scrollHeight, behavior: 'smooth' });
    return node;
}