export const InitNewRoomPage = ({ nextPage, roomStore }) => {
    const newRoomInput = document.querySelector("#newRoomInput");

    // navigate to chat page on enter
    newRoomInput.addEventListener("keypress", (event) => {
        if (event.key !== "Enter") return;
        event.preventDefault();

        if (!newRoomInput.value.trim()) nextPage(); // leave without changes

        roomStore.createRoom({ 
            avatarUri: '/public/default-avatar.jpg', 
            username: newRoomInput.value, 
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
