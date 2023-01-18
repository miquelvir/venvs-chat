export const InitLoginPage = ({ displayChat, userStore, currentUserStore }) => {
    const usernameInput = document.querySelector("#usernameInput");

    // navigate to chat page on enter
    usernameInput.addEventListener("keypress", (event) => {
        if (event.key !== "Enter") return;
        event.preventDefault();

        userStore.getUserById(currentUserStore.getId()).displayName = usernameInput.value;  // todo do not edit by ref
        displayChat();
    });

    // show hint only if input > 0
    const hint = document.querySelector(".loginCard .hint");
    usernameInput.addEventListener("input", (event) => {
        if (event.target.value.length > 0){
            hint.style.visibility = 'visible';
        } else {
            hint.style.visibility = 'hidden';
        }
    });
}