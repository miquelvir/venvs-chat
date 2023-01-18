const logGroup = '[UserStore]';
const newUserEventId = 'new-user';

export class UserStore {
    constructor(initialUsers=[]) {
      this._usersArray = initialUsers;
      this._cacheUserIndexes();

      this._newUserTarget = new EventTarget();

      console.debug(`${logGroup} Initialised with ${initialUsers.length} users`);
    }

    /* USERS */
    newUser({ avatarUri, displayName, id }){
        this._usersArray.push({ avatarUri, displayName, id });
        this._cacheUserIndexes();
        this._newUserTarget.dispatchEvent(new Event(newUserEventId));

        console.debug(`${logGroup} New user with id: ${id}`);
    }

    getUsers(){
        /* do not edit return value by reference */
        return this._usersArray;
    }

    getUserById(userId){
        /* do not edit return value by reference */
        const idx = this._userIdToIdx[userId];
        if (idx === undefined) throw new Error(`User with id ${idx} not found`);
        return this._usersArray[idx];
    }

    subscribeOnNewUser(f){
        return this._newUserTarget.addEventListener(newUserEventId, f);
    }

    unsubscribeOnNewUser(token){
        this._newUserTarget.removeEventListener(token);
    }
    
    /* PRIVATE */
    _cacheUserIndexes(){
        this._userIdToIdx = Object.assign({}, ...this._usersArray.map((user, idx) => ({[user.id]: idx})));
    }
  }