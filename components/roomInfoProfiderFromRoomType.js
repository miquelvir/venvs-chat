import { ChatType } from "../enums.js";

export const roomInfoProviderFromType = {
    [ChatType.Group]: ({ displayName, ...other }) => ({
        name: displayName,
        avatarUri: 'public/avatars/default-avatar.jpg'
    }),
    [ChatType.DirectMessage]: ({userStore, id, ...other}) => {
        const user = userStore.getUserById(id);
        return {
            name: user.displayName,
            avatarUri: user.avatarUri
        }
    },
}