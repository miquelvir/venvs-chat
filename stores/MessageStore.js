import { Side, Status, MessageType } from "../constants.js";
import { uuid4 } from "../utils.js";
import { tryParseTimestamp } from "../utils.js";

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
    
    newMessage({content, timestamp, side = Side.RECEIVED, type, userId }){
        if (!userId) throw new Error(`userId is required.`);
        if (!Object.values(Side).includes(side)) throw new Error(`Message side ${side} is not a valid Side.`);
        if (!Object.values(MessageType).includes(type)) throw new Error(`Message type ${type} is not a valid MessageType.`);
        const validatedTimestamp = tryParseTimestamp(timestamp) ?? new Date()
        const message = {content, timestamp: validatedTimestamp, side, type, userId };
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