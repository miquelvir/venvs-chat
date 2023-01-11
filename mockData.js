import { Side, Status } from './components/chat/Message.js';
import { LineType } from './components/chat/chatLineFactory.js';

export const chats = [
    {
        avatarUri: 'public/avatars/avatar2.jpg', 
        displayName: 'Nerea Sastre',
        messages: [
            {
                content: 'helloo', 
                timestamp: new Date(Date.parse("2022-01-01T10:11:00.000Z")),
                status: Status.SEEN, 
                side: Side.SENT,
                type: LineType.Message
            },
            {
                content: 'we met today at dance class', 
                timestamp: new Date(Date.parse("2022-01-01T10:12:00.000Z")), 
                status: Status.SEEN, 
                side: Side.SENT,
                type: LineType.Message
            },
            {
                content: 'yepp i remember u speak to you later', 
                timestamp: new Date(Date.parse("2022-01-01T10:15:00.000Z")), 
                status: null, 
                side: Side.RECEIVED,
                type: LineType.Message
            },
            {
                content: 'helloo', 
                timestamp: new Date(Date.parse("2022-01-01T23:01:00.000Z")), 
                status: Status.SEEN, 
                side: Side.SENT,
                type: LineType.Message
            },
            {
                content: 'wanna go for a coffe now?', 
                timestamp: new Date(Date.parse("2022-01-01T23:03:00.000Z")), 
                status: null, 
                side: Side.RECEIVED,
                type: LineType.Message
            },
            {
                content: 'sureee!', 
                timestamp: new Date(Date.parse("2022-01-01T23:17:00.000Z")), 
                status: Status.RECEIVED, 
                side: Side.SENT,
                type: LineType.Message
            },
            {
                content: 'u alive?', 
                timestamp: new Date(Date.parse("2022-01-02T00:35:00.000Z")), 
                status: Status.SENT, 
                side: Side.SENT,
                type: LineType.Message
            }
        ],
        id: '2db0fe8e-ba22-4d41-a135-a9f05d7ae047'
    },
    {
        avatarUri: 'public/avatars/avatar3.jpg', 
        displayName: 'Cristian Fernández',
        messages: [
            {
                content: 'hi', 
                timestamp: new Date(Date.parse("2022-01-02T00:35:00.000Z")), 
                status: Status.SENT, 
                side: Side.SENT,
                type: LineType.Message
            }
        ],
        id: '2a01624b-4552-4ac2-95fa-9f63fa11f1ce'
    },
    {
        avatarUri: 'public/avatars/avatar1.jpg', 
        displayName: 'Júlia Coll', 
        messages: [],
        id: 'd6f64d89-24a2-4cc3-87d0-203e26533a4c'
    }
];