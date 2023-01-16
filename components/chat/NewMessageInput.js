export const InitNewMessageInput = ({ setMessages }) => {
        document.querySelector("#newMessageInput").addEventListener("keypress", (event) => {
        if (event.key !== "Enter") return;
        console.log("here")
        event.preventDefault();
        setMessages(messages => [...messages, { // todo maybe more fine event
            content: 'yo yooo', 
            timestamp: new Date(Date.parse("2022-01-01T10:11:00.000Z")),
            status: Status.SENT, 
            side: Side.SENT,
            type: LineType.Message
        }])
    });
}