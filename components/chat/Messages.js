import { chatLineFactory } from './chatLineFactory.js';
import { constructLines } from './utils.js';

export const Messages = ({ messages }) => {
    const node = document.querySelector(".messages");
    node.replaceChildren();  // empty
    constructLines(messages).forEach((line) => {
        node.appendChild(chatLineFactory(line))
    });
    return node;
}