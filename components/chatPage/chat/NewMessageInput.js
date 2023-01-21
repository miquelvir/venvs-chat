import { LineType, Status, Side, MessageContentType, INTERNAL_CURRENT_USER_ID } from "../../../enums.js";

export const InitNewMessageInput = ({ chatStore }) => {
    const newMessageInput = document.querySelector("#newMessageInput");
    newMessageInput.addEventListener("keypress", (event) => {
        if (event.key !== "Enter") return;
        event.preventDefault();
        if (!newMessageInput.value?.trim()) return; // empty message
        chatStore.newMessage(chatStore.getSelectedChatId(), {
            content: newMessageInput.value, 
            timestamp: new Date(Date.parse("2022-01-01T10:11:00.000Z")),
            status: Status.SENT, 
            side: Side.SENT,
            type: LineType.Message,
            contentType: MessageContentType.PlainText,
            userId: INTERNAL_CURRENT_USER_ID  // sent from us
        });
        newMessageInput.value = '';  // reset
    });
}