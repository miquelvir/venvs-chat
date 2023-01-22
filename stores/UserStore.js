const logGroup = '[UserStore]';
const newUserEventId = 'new-user';

export class UserStore {
    constructor(initialUsers=[]) {
      this._usersArray = initialUsers;
      this._cacheUserIndexes();

      this._newUserTarget = new EventTarget();
      this._userUpdatedTarget = new EventTarget();

      console.debug(`${logGroup} Initialised with ${initialUsers.length} users`);
    }

    /* USERS */
    newUser({ avatarUri, displayName, id }){
        this._usersArray.push({ avatarUri, displayName, id });
        this._cacheUserIndexes();
        this._newUserTarget.dispatchEvent(new Event(newUserEventId));

        console.debug(`${logGroup} New user with id: ${id}`);
    }

    upsertUser({ avatarUri, displayName, id }){
        const userIdx = this._userIdToIdx[id];
        if (userIdx === undefined) return this.newUser({ avatarUri, displayName, id });
        return this.updateUserById(id, { avatarUri, displayName });
    }

    getUsers(){
        /* do not edit return value by reference */
        return this._usersArray;
    }

    getUserById(userId){
        /* do not edit return value by reference */
        const idx = this._userIdToIdx[userId];
        if (idx === undefined) throw new Error(`User with id ${userId} not found`);
        return this._usersArray[idx];
    }

    updateUserById(userId, user){
        /* do not edit return value by reference */
        const idx = this._userIdToIdx[userId];
        if (idx === undefined) throw new Error(`User with id ${idx} not found`);
        const updatedUser = {...this._usersArray[idx] , ...user};
        if (JSON.stringify(this._usersArray[idx]) === JSON.stringify(updatedUser)) return;  // no changes
        this._usersArray[idx] = updatedUser;
        this._userUpdatedTarget.dispatchEvent(new CustomEvent(userId, { detail: { user: updatedUser }}));
        console.debug(`${logGroup} User ${userId} updated: ${JSON.stringify(user)}`)
    }

    subscribeOnNewUser(f){
        return this._newUserTarget.addEventListener(newUserEventId, f);
    }

    subscribeOnUserUpdated(userId, f){
        return this._userUpdatedTarget.addEventListener(userId, f);
    }
    
    /* PRIVATE */
    _cacheUserIndexes(){
        this._userIdToIdx = Object.assign({}, ...this._usersArray.map((user, idx) => ({[user.id]: idx})));
    }
  }