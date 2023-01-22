export const InitNewRoomPage = ({ nextPage, roomStore }) => {
    const newRoomInput = document.querySelector("#newRoomInput");

    // navigate to chat page on enter
    newRoomInput.addEventListener("keypress", (event) => {
        if (event.key !== "Enter") return;
        event.preventDefault();

        roomStore.createRoom({ 
            avatarUri: '/public/avatars/default-avatar.jpg', 
            displayName: newRoomInput.value, 
            id: newRoomInput.value
        });

        nextPage();
    });

    // show hint only if input > 0
    const hint = document.querySelector(".newRoomCard .hint");
    newRoomInput.addEventListener("input", (event) => {
        if (event.target.value.length > 0){
            hint.style.visibility = 'visible';
        } else {
            hint.style.visibility = 'hidden';
        }
    });
}
