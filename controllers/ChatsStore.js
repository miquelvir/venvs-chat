import { uuid4 } from "../utils";

export class ChatsStore {
    constructor(initialChats) {
      this._chatsArray = initialChats;
      this._cacheChatIndexes();

      this._newChatTarget = new EventTarget();
      this._newMessageTarget = new EventTarget();
    }

    /* CHATS */
    newChat({ avatarUri, displayName, messages, id }){
        this._chatsArray.push({ avatarUri, displayName, messages, id });
        this._cacheChatIndexes();
        this._newChatTarget.dispatchEvent(new Event(id))
    }

    getChats(){
        /* do not edit return value by reference */
        return this._chatsArray;
    }

    subscribeOnNewChat(f){
        return _newChatTarget.addEventListener(uuid4(), f);
    }

    unsubscribeOnNewChat(token){
        _newChatTarget.removeEventListener(token);
    }

    getChatById(chatId){
        /* do not edit return value by reference */
        return this._chatsArray[this._chatIdToIdx[chatId]];
    }

    /* MESSAGES */
    newMessage(chatId, {content, timestamp, status, side}){
        this.getChatById(chatId).messages.push({content, timestamp, status, side});
        this._newMessageTarget.dispatchEvent(new Event(chatId));
    }

    subscribeOnNewMessage(f, chatId){
        return _newMessageTarget.addEventListener(chatId, f);
    }

    unsubscribeOnNewMessage(token){
        _newMessageTarget.removeEventListener(token);
    }
    
    /* PRIVATE */
    _cacheChatIndexes(){
        this._chatIdToIdx = Object.assign({}, ...this.initialChats.map((chat, idx) => ({[chat.id]: idx})));
    }
  }