import { Status, Side, MessageType, INTERNAL_CURRENT_USER_ID } from "../../../constants.js";

const WELL_KNOWN_EMOJIS = {
    ':)': 'βΊοΈ',
    ':(': 'π',
    '<3': 'π',
    '<<3': 'π',
    'o_o': 'π―',
    ':-D': 'π',
    ':-)': 'π',
    ':"D': 'π',
    ":'-)": 'π₯²',
    '>:(': 'π‘',
    "D-':": 'π¨',
    ':-3': 'πΈ',
    ':x': 'π',
    ':-P': 'π',
    ':|': 'π',
    ':-|': 'π',
    ':$': 'π',
    '>:)': 'π',
    'O:-)': 'π',
    '|;-)': 'π',
    '%-)': 'π΅βπ«',
    ':E': 'π¬',
    'x_x': 'π΅',
    '(-_-)': 'π΄',
    'uwu': 'π',
    'UwU': 'π',
    'zzz': 'π€',
    '(Y)': 'π',
    '(N)': 'π'
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
            type: MessageType.PlainText,
            userId: INTERNAL_CURRENT_USER_ID  // sent from us
        });
        newMessageInput.value = '';  // reset
    });

    newMessageInput.addEventListener("input", (event) => {
        newMessageInput.value = replaceEmojis(event.target.value);
    });
}