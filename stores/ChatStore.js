import { ChatType, Side, Status, MessageContentType } from "../enums.js";

const newChatEventId = 'new-chat';
const selectedChatEventId = 'selected-chat-changed';
const logGroup = '[ChatStore]';

export class ChatStore {
    constructor(initialChats=[]) {
      this._chatsArray = initialChats;
      this._cacheChatIndexes();
      this._selectedChatId = initialChats[0]?.id;

      this._newChatTarget = new EventTarget();
      this._newMessageTarget = new EventTarget();
      this._selectedChatIdTarget = new EventTarget();

      console.debug(`${logGroup} Initialised with ${initialChats.length} chats`);
    }

    /* CHATS */
    newChat({ avatarUri, displayName, messages, id, type }){
        if (!Object.values(ChatType).includes(type)) throw new Error(`Chat type ${type} is not a valid ChatType.`);

        this._chatsArray.push({ avatarUri, displayName, messages, id, type });
        this._cacheChatIndexes();
        this._newChatTarget.dispatchEvent(new Event(newChatEventId));

        console.debug(`${logGroup} New chat with id: ${id}`);
    }

    getChats(){
        /* do not edit return value by reference */
        return this._chatsArray;
    }

    getChatById(chatId){
        /* do not edit return value by reference */
        const idx = this._chatIdToIdx[chatId];
        if (idx === undefined) throw new Error(`Chat with id ${chatId} is not found`);
        return this._chatsArray[idx];
    }

    subscribeOnNewChat(f){
        return this._newChatTarget.addEventListener(newChatEventId, f);
    }

    unsubscribeOnNewChat(token){
        this._newChatTarget.removeEventListener(token);
    }

    /* SELECTED CHAT */
    selectChat(chatId){
        this._selectedChatId = chatId;
        this._selectedChatIdTarget.dispatchEvent(new Event(selectedChatEventId));
    }

    getSelectedChatId(){
        return this._selectedChatId;
    }

    subscribeOnSelectedChatChanged(f){
        return this._selectedChatIdTarget.addEventListener(selectedChatEventId, f);
    }

    unsubscribeOnSelectedChatChanged(token){
        this._selectedChatIdTarget.removeEventListener(token);
    }

    /* MESSAGES */
    newMessage(chatId, {content, timestamp, status, side, contentType }){
        if (!Object.values(Side).includes(side)) throw new Error(`Message side ${side} is not a valid Side.`);
        if (!Object.values(Status).includes(status)) throw new Error(`Message status ${status} is not a valid Status.`);
        if (!Object.values(MessageContentType).includes(contentType)) throw new Error(`Message contentType ${contentType} is not a valid MessageContentType.`);

        this.getChatById(chatId).messages.push({content, timestamp, status, side, contentType});
        this._newMessageTarget.dispatchEvent(new Event(chatId));

        console.debug(`${logGroup} New message in chat ${chatId}: ${content}`);
    }

    subscribeOnNewMessage(f, chatId){
        return _newMessageTarget.addEventListener(chatId, f);
    }

    unsubscribeOnNewMessage(token){
        _newMessageTarget.removeEventListener(token);
    }
    
    /* PRIVATE */
    _cacheChatIndexes(){
        this._chatIdToIdx = Object.assign({}, ...this._chatsArray.map((chat, idx) => ({[chat.id]: idx})));
    }
  }