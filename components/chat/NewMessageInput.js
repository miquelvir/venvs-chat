import { LineType, Status, Side } from "../../enums.js";

export const InitNewMessageInput = ({ chatStore }) => {
        document.querySelector("#newMessageInput").addEventListener("keypress", (event) => {
        if (event.key !== "Enter") return;
        console.log("here")
        event.preventDefault();
        chatStore.newMessage(chatStore.getSelectedChatId(), {
            content: 'yo yooo', 
            timestamp: new Date(Date.parse("2022-01-01T10:11:00.000Z")),
            status: Status.SENT, 
            side: Side.SENT,
            type: LineType.Message
        })
    });
}