import { Side, Status, MessageContentType, LineType } from "../enums.js";
import { uuid4 } from "../utils.js";

const logGroup = '[MessageStore]';
const newMessageEventId = 'new-message';

export class MessageStore {
    constructor() {
      this._messagesArray = [];
      
      this._newMessageTarget = new EventTarget();
      this._newMessageSubscribers = {};

      console.debug(`${logGroup} Initialised with ${this._messagesArray.length} messages`);
    }

    reset(){
        this._messagesArray = [];
        console.debug(`${logGroup} Reset completed`);
    }
    
    newMessage({content, timestamp, status, side, contentType, userId }){
        if (!userId) throw new Error(`userId is required.`);
        if (!Object.values(Side).includes(side)) throw new Error(`Message side ${side} is not a valid Side.`);
        if (!Object.values(Status).includes(status)) throw new Error(`Message status ${status} is not a valid Status.`);
        if (!Object.values(MessageContentType).includes(contentType)) throw new Error(`Message contentType ${contentType} is not a valid MessageContentType.`);
        const message = {content, timestamp, status, side, contentType, type: LineType.Message, userId };
        this._messagesArray.push(message);
        this._newMessageTarget.dispatchEvent(new CustomEvent(newMessageEventId, { 'detail': { 'message' : message }}));

        console.debug(`${logGroup} New message: ${content}`);
    }

    subscribeOnNewMessage(f, token = null){
        if (token) {
            this._newMessageTarget.removeEventListener(...this._newMessageSubscribers[token]);
            delete this._newMessageSubscribers[token]
        }
        
        this._newMessageTarget.addEventListener(newMessageEventId, f);
        
        const newToken = uuid4();
        this._newMessageSubscribers[newToken] = [newMessageEventId, f];

        return newToken;
    }

    getMessages(){
        // do not edit return value by reference
        return this._messagesArray;
    }
  }