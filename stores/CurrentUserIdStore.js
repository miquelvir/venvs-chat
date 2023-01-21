const logGroup = '[CurrentUserStore]';
const userInfoChangedEventId = 'user-info-changed';

export class CurrentUserIdStore {
    constructor(id = null) {
      this._id = id;

      this._userInfoChangedTarget = new EventTarget();

      console.debug(`${logGroup} Initialised current user with id: id ${id}`);
    }

    setId(id){ 
        this._id = id;
        console.debug(`${logGroup} User id set to: ${id}`);
        this._userInfoChangedTarget.dispatchEvent(new Event(userInfoChangedEventId));
    } 
    getId(){ return this._id; } 

    subscribeOnUserInfoChanged(f){
        return this._userInfoChangedTarget.addEventListener(userInfoChangedEventId, f);
    }

    unsubscribeOnUserInfoChanged(token){
        this._userInfoChangedTarget.removeEventListener(token);
    }
  }