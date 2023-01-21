import { INTERNAL_CURRENT_USER_ID } from "../../enums.js";

export const InitLoginPage = ({ nextPage, userStore }) => {
    const usernameInput = document.querySelector("#usernameInput");

    // navigate to chat page on enter
    usernameInput.addEventListener("keypress", (event) => {
        if (event.key !== "Enter") return;
        event.preventDefault();

        userStore.updateUserById(INTERNAL_CURRENT_USER_ID, { displayName: usernameInput.value });
        nextPage();
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