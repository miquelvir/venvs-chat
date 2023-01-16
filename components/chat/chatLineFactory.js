import { GetMessage } from './Message.js';
import { GetDaySeparator } from './DaySeparator.js';

export const chatLineFactory = ({ type, ...props }) => {
    if (type === LineType.Message) return GetMessage({ type, ...props });
    if (type === LineType.DayDivider) return GetDaySeparator({ type, ...props });
    throw new Error(`type ${type} not implemented`)
}

export const LineType = {
    Message: 'message',
    DayDivider: 'day-divider'
}