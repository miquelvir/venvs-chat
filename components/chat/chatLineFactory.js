import { Message } from './Message.js';
import { DaySeparator } from './DaySeparator.js';

export const chatLineFactory = ({ type, ...props }) => {
    if (type === LineType.Message) return Message({ type, ...props });
    if (type === LineType.DayDivider) return DaySeparator({ type, ...props });
    throw new Error(`type ${type} not implemented`)
}

export const LineType = {
    Message: 'message',
    DayDivider: 'day-divider'
}