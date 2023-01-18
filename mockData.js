import { ChatType, LineType, Side, Status, MessageContentType } from './enums.js';

export const chats = [
    {
        type: ChatType.DirectMessage,
        messages: [
            {
                content: 'helloo', 
                timestamp: new Date(Date.parse("2022-01-01T10:11:00.000Z")),
                status: Status.SEEN, 
                side: Side.SENT,
                type: LineType.Message,
                userId: '92e5d4d5-1c16-4785-a656-27c2c0c7d3a8',
                contentType: MessageContentType.PlainText
            },
            {
                content: 'we met today at dance class', 
                timestamp: new Date(Date.parse("2022-01-01T10:12:00.000Z")), 
                status: Status.SEEN, 
                side: Side.SENT,
                type: LineType.Message,
                userId: '92e5d4d5-1c16-4785-a656-27c2c0c7d3a8',
                contentType: MessageContentType.PlainText
            },
            {
                content: 'yepp i remember u speak to you later', 
                timestamp: new Date(Date.parse("2022-01-01T10:15:00.000Z")), 
                status: null, 
                side: Side.RECEIVED,
                type: LineType.Message,
                userId: '92e5d4d5-1c16-4785-a656-27c2c0c7d3a9',
                contentType: MessageContentType.PlainText
            },
            {
                content: 'helloo', 
                timestamp: new Date(Date.parse("2022-01-01T23:01:00.000Z")), 
                status: Status.SEEN, 
                side: Side.SENT,
                type: LineType.Message,
                userId: '92e5d4d5-1c16-4785-a656-27c2c0c7d3a8',
                contentType: MessageContentType.PlainText
            },
            {
                content: 'wanna go for a coffe now?', 
                timestamp: new Date(Date.parse("2022-01-01T23:03:00.000Z")), 
                status: null, 
                side: Side.RECEIVED,
                type: LineType.Message,
                userId: '92e5d4d5-1c16-4785-a656-27c2c0c7d3a9',
                contentType: MessageContentType.PlainText
            },
            {
                content: 'sureee!', 
                timestamp: new Date(Date.parse("2022-01-01T23:17:00.000Z")), 
                status: Status.RECEIVED, 
                side: Side.SENT,
                type: LineType.Message,
                userId: '92e5d4d5-1c16-4785-a656-27c2c0c7d3a9',
                contentType: MessageContentType.PlainText
            },
            {
                content: 'u alive?', 
                timestamp: new Date(Date.parse("2022-01-02T00:35:00.000Z")), 
                status: Status.SENT, 
                side: Side.SENT,
                type: LineType.Message,
                userId: '92e5d4d5-1c16-4785-a656-27c2c0c7d3a8',
                contentType: MessageContentType.PlainText
            },
            {
                content: 'helloo', 
                timestamp: new Date(Date.parse("2022-01-01T10:11:00.000Z")),
                status: Status.SEEN, 
                side: Side.SENT,
                type: LineType.Message,
                userId: '92e5d4d5-1c16-4785-a656-27c2c0c7d3a8',
                contentType: MessageContentType.PlainText
            },
            {
                content: 'we met today at dance class', 
                timestamp: new Date(Date.parse("2022-01-01T10:12:00.000Z")), 
                status: Status.SEEN, 
                side: Side.SENT,
                type: LineType.Message,
                userId: '92e5d4d5-1c16-4785-a656-27c2c0c7d3a8',
                contentType: MessageContentType.PlainText
            },
            {
                content: 'yepp i remember u speak to you later', 
                timestamp: new Date(Date.parse("2022-01-01T10:15:00.000Z")), 
                status: null, 
                side: Side.RECEIVED,
                type: LineType.Message,
                userId: '92e5d4d5-1c16-4785-a656-27c2c0c7d3a9',
                contentType: MessageContentType.PlainText
            },
            {
                content: 'helloo', 
                timestamp: new Date(Date.parse("2022-01-01T23:01:00.000Z")), 
                status: Status.SEEN, 
                side: Side.SENT,
                type: LineType.Message,
                userId: '92e5d4d5-1c16-4785-a656-27c2c0c7d3a8',
                contentType: MessageContentType.PlainText
            },
            {
                content: 'wanna go for a coffe now?', 
                timestamp: new Date(Date.parse("2022-01-01T23:03:00.000Z")), 
                status: null, 
                side: Side.RECEIVED,
                type: LineType.Message,
                userId: '92e5d4d5-1c16-4785-a656-27c2c0c7d3a9',
                contentType: MessageContentType.PlainText
            },
            {
                content: 'sureee!', 
                timestamp: new Date(Date.parse("2022-01-01T23:17:00.000Z")), 
                status: Status.RECEIVED, 
                side: Side.SENT,
                type: LineType.Message,
                userId: '92e5d4d5-1c16-4785-a656-27c2c0c7d3a8',
                contentType: MessageContentType.PlainText
            },
            {
                content: 'u alive?', 
                timestamp: new Date(Date.parse("2022-01-02T00:35:00.000Z")), 
                status: Status.SENT, 
                side: Side.SENT,
                type: LineType.Message,
                userId: '92e5d4d5-1c16-4785-a656-27c2c0c7d3a8',
                contentType: MessageContentType.PlainText
            },
            {
                content: 'helloo', 
                timestamp: new Date(Date.parse("2022-01-01T10:11:00.000Z")),
                status: Status.SEEN, 
                side: Side.SENT,
                type: LineType.Message,
                userId: '92e5d4d5-1c16-4785-a656-27c2c0c7d3a8',
                contentType: MessageContentType.PlainText
            },
            {
                content: 'sureee!', 
                timestamp: new Date(Date.parse("2022-01-01T23:17:00.000Z")), 
                status: Status.RECEIVED, 
                side: Side.SENT,
                type: LineType.Message,
                userId: '92e5d4d5-1c16-4785-a656-27c2c0c7d3a8',
                contentType: MessageContentType.PlainText
            },
            {
                content: 'u alive?', 
                timestamp: new Date(Date.parse("2022-01-02T00:35:00.000Z")), 
                status: Status.SENT, 
                side: Side.SENT,
                type: LineType.Message,
                userId: '92e5d4d5-1c16-4785-a656-27c2c0c7d3a8',
                contentType: MessageContentType.PlainText
            }
        ],
        id: '92e5d4d5-1c16-4785-a656-27c2c0c7d3a9'
    },
    {
        type: ChatType.DirectMessage,
        messages: [
            {
                content: 'hi', 
                timestamp: new Date(Date.parse("2022-01-02T00:35:00.000Z")), 
                status: Status.RECEIVED, 
                side: Side.RECEIVED,
                type: LineType.Message,
                contentType: MessageContentType.PlainText,
                userId: '92e5d4d5-1c16-4785-a656-27c2c0c7d3a7'
            }
        ],
        id: '92e5d4d5-1c16-4785-a656-27c2c0c7d3a7'
    },
    {
        displayName: 'UPF room', 
        type: ChatType.Group,
        messages: [
            {
                content: 'hi', 
                timestamp: new Date(Date.parse("2022-01-02T00:35:00.000Z")), 
                status: Status.RECEIVED, 
                side: Side.RECEIVED,
                type: LineType.Message,
                userId: '92e5d4d5-1c16-4785-a656-27c2c0c7d3a7',
                contentType: MessageContentType.PlainText
            },
            {
                content: 'hii', 
                timestamp: new Date(Date.parse("2022-01-02T00:35:00.000Z")), 
                status: Status.RECEIVED, 
                side: Side.SENT,
                type: LineType.Message,
                userId: '92e5d4d5-1c16-4785-a656-27c2c0c7d3a8',
                contentType: MessageContentType.PlainText
            },
            {
                content: 'heyoo', 
                timestamp: new Date(Date.parse("2022-01-02T00:35:00.000Z")), 
                status: Status.RECEIVED, 
                side: Side.RECEIVED,
                type: LineType.Message,
                userId: '92e5d4d5-1c16-4785-a656-27c2c0c7d3a9',
                contentType: MessageContentType.PlainText
            }
        ],
        id: 'd6f64d89-24a2-4cc3-87d0-203e26533a4c'
    }
];

export const users = [
    {
        avatarUri: 'public/avatars/avatar2.jpg', 
        displayName: 'Nerea Sastre',
        id: '92e5d4d5-1c16-4785-a656-27c2c0c7d3a9'
    },
    {
        avatarUri: 'public/avatars/avatar0.jpg', 
        displayName: 'Miquel Vázquez',
        id: '92e5d4d5-1c16-4785-a656-27c2c0c7d3a8'
    },
    {
        avatarUri: 'public/avatars/avatar1.jpg', 
        displayName: 'Júlia Coll',
        id: '92e5d4d5-1c16-4785-a656-27c2c0c7d3a7'
    }
];