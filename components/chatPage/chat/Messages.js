import { GetMessage } from "./Message.js";

let newMessageSubscriptionCancelToken = null;
export const InitMessages = ({ roomStore, userStore, messageStore }) => {
    const selectedChatId = roomStore.getSelectedRoomId();
    if (selectedChatId === null) return;

    const node = document.querySelector(".messages");
    node.replaceChildren();  // empty
    messageStore.getMessages().forEach((message) => {
        node.appendChild(GetMessage({ userStore, message }))
    });

    const scrollDown = () => node.scroll({ top: node.scrollHeight, behavior: 'smooth' });
    scrollDown();

    newMessageSubscriptionCancelToken = messageStore.subscribeOnNewMessage((event) => {
        node.appendChild(GetMessage({ userStore, message: event.detail.message}));
        scrollDown();
    }, newMessageSubscriptionCancelToken);

    return node;
}
