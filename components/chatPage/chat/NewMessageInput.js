import { LineType, Status, Side, MessageContentType, INTERNAL_CURRENT_USER_ID } from "../../../constants.js";

const WELL_KNOWN_EMOJIS = {
    ':)': '☺️',
    ':(': '😔',
    '<3': '💛',
    '<<3': '💕',
    'o_o': '😯',
    ':-D': '😎',
    ':-)': '😁',
    ':"D': '😂',
    ":'-)": '🥲',
    '>:(': '😡',
    "D-':": '😨',
    ':-3': '😸',
    ':x': '😘',
    ':-P': '😛',
    ':|': '😑',
    ':-|': '😐',
    ':$': '😖',
    '>:)': '😈',
    'O:-)': '😇',
    '|;-)': '😎',
    '%-)': '😵‍💫',
    ':E': '😬',
    'x_x': '😵',
    '(-_-)': '😴',
    'uwu': '😌',
    'UwU': '😌',
    'zzz': '💤',
    '(Y)': '👍',
    '(N)': '👎'
}

const replaceEmojis = (src) => {
    let value = src;
    Object.keys(WELL_KNOWN_EMOJIS).forEach(textEmoji => {
        const searchTextEmoji = `${textEmoji} `; // must have finished sentence and clicked space
        const replacementEmoji = `${WELL_KNOWN_EMOJIS[textEmoji]} `; // preserve space
        value = value.replace(searchTextEmoji, replacementEmoji);
    });
    return value;
}

export const InitNewMessageInput = ({ messageStore }) => {
    const newMessageInput = document.querySelector("#newMessageInput");
    newMessageInput.addEventListener("keypress", (event) => {
        if (event.key !== "Enter") return;
        event.preventDefault();
        if (!newMessageInput.value?.trim()) return; // empty message
        
        const value = replaceEmojis(newMessageInput.value+' ');

        messageStore.newMessage({
            content: value.trim(), 
            timestamp: new Date(),
            status: Status.SENT, 
            side: Side.SENT,
            type: LineType.Message,
            contentType: MessageContentType.PlainText,
            userId: INTERNAL_CURRENT_USER_ID  // sent from us
        });
        newMessageInput.value = '';  // reset
    });

    newMessageInput.addEventListener("input", (event) => {
        newMessageInput.value = replaceEmojis(event.target.value);
    });
}