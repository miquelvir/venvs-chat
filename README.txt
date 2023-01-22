EMAIL
miquel.vazquez02@estudiant.upf.edu

NIA
229232

STAGING
Test the chat here: https://miquelvir.github.io/venvs-chat/

OVERVIEW
- The web is a single HTML file. 
- Inside that one HTML, there are multiple pages (avatarPicker, chat, login, ...) which are set to display none when they should not be visible.
- /components has the initialisation or creation functions for all components of each page.
- global state is saved in the /stores. They keep track of messages, rooms, users and the current user id.
- Stores also encapsulate a subscription mechanism through JS events to subscribe to changes in state. The reason for this is allowing decoupling of the different components to improve maintainability.
- /realtimeSyncronizer.js is in charge of keeping local state changes in sync with other users using the websockets client.

EMOJI FEATURE
- Start typing a message. 
- Write some text emoji like: :) (Y) or <3
- Press space or enter, and it will be replaced by an emoji.

AVATARS FEATURE
- When you open the page, you are prompted to choose an avatar.
- Other users see your avatar next to your messages.
- The protocol proposal sends the username with each message. For consistency, we do the same with the avatar. This is not optimal.
- You can click your avatar in the top left corner to change it. Other users will see the changes reflected when you send a message in the room.

ROOM DISCOVERY FEATURE
- Every 15s, the realtimeSyncronizer polls the server to see what new public rooms are active.
- All new rooms are added to the room list in the left pane.

ROOM LIST SEARCH FEATURE
- On top of the room list, there is a search bar. 
- Start typing to filter the list.

SHORTCUTS
- Press ESC when creating a new room or changing the avatar to go back to the chat page without changing anything.

CREDITS
Avatars by https://getavataaars.com/
Favicon created by dmitri13 - Flaticon (https://www.flaticon.com/free-icon/chat_811476?term=chat&page=1&position=21&origin=tag&related_id=811476)
