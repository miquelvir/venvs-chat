import { INTERNAL_CURRENT_USER_ID } from "../../../enums.js";

export const InitCurrentUserInfo = ({ userStore, showLoginPicker }) => {
    const init = () => {
        const user = userStore.getUserById(INTERNAL_CURRENT_USER_ID);  // current user
        const avatar = document.querySelector(".toolbar .profilePicture .avatar");
        avatar.src = user.avatarUri;
        avatar.addEventListener('click', showLoginPicker);
        document.querySelector(".toolbar .displayName").innerHTML = user.displayName;
    };
    
    init();
    userStore.subscribeOnUserUpdated(INTERNAL_CURRENT_USER_ID, init);  // todo constant or something current user
}