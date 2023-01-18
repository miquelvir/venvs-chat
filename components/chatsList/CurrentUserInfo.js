export const InitCurrentUserInfo = ({ currentUserStore, userStore }) => {
    const init = () => {
        const userId = currentUserStore.getId();
        const user = userStore.getUserById(userId);
        document.querySelector(".toolbar .profilePicture .avatar").src = user.avatarUri;
        document.querySelector(".toolbar .displayName").innerHTML = user.displayName;
    };

    init();
    currentUserStore.subscribeOnUserInfoChanged(init);
}