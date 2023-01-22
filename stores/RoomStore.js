const newRoomEventId = 'new-room';
const selectedRoomEventId = 'selected-room-changed';
const logGroup = '[RoomStore]';

export class RoomStore {
    constructor({ messageStore }) {
      this._roomsArray = [];
      this._cacheRoomIndexes();
      this._selectedRoomId = null;

      this._messageStore = messageStore;

      this._newRoomTarget = new EventTarget();
      this._selectedRoomIdTarget = new EventTarget();

      console.debug(`${logGroup} Initialised with ${this._roomsArray.length} rooms`);
    }

    /* CHATS */
    createRoom({ avatarUri, displayName, id }){
        const room = { avatarUri: avatarUri, displayName: displayName, id: id };
        this._roomsArray.push(room);
        this._cacheRoomIndexes();
        this._newRoomTarget.dispatchEvent(new CustomEvent(newRoomEventId, { detail: { room }}));

        console.debug(`${logGroup} New room with id: ${id}`);
    }

    getRooms(){
        /* do not edit return value by reference */
        return this._roomsArray;
    }

    getRoomById(roomId){
        /* do not edit return value by reference */
        const idx = this._roomIndexesCache[roomId];
        if (idx === undefined) throw new Error(`Room with id ${roomId} not found`);
        return this._roomsArray[idx];
    }

    subscribeOnNewRoom(f){
        return this._newRoomTarget.addEventListener(newRoomEventId, f);
    }

    unsubscribeOnNewRoom(token){
        this._newRoomTarget.removeEventListener(token);
    }

    /* SELECTED CHAT */
    selectRoom(roomId){
        this._selectedRoomId = roomId;
        this._messageStore.reset();
        this._selectedRoomIdTarget.dispatchEvent(new CustomEvent(selectedRoomEventId, { detail: { room: this.getRoomById(this.getSelectedRoomId()) }}));
        console.debug(`Selected room with id: ${roomId}`);
    }

    getSelectedRoomId(){
        return this._selectedRoomId;
    }

    subscribeOnSelectedRoomChanged(f){
        return this._selectedRoomIdTarget.addEventListener(selectedRoomEventId, f);
    }

    unsubscribeOnSelectedRoomChanged(token){
        this._selectedRoomIdTarget.removeEventListener(token);
    }
    
    /* PRIVATE */
    _cacheRoomIndexes(){
        this._roomIndexesCache = Object.assign({}, ...this._roomsArray.map((chat, idx) => ({[chat.id]: idx})));
    }
  }