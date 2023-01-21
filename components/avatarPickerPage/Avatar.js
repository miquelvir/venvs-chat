import { htmlToElement } from "../../utils.js"
export const GetAvatar = ({ avatarUri, onClick }) => {
    const node = htmlToElement(`<img class="avatar" src="${avatarUri}" alt="avatar ${avatarUri} profile picture">`);
    node.addEventListener('click', onClick);
    return node;
}