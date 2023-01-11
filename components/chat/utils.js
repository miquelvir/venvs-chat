import { LineType } from "./chatLineFactory.js";

export const constructLines = (messages) => {
    const lines = [];
    let lastDay = null;
    messages.forEach(message => {
        const { timestamp } = message;
        const day = timestamp.toLocaleDateString('en-GB');
        if (lastDay === null || lastDay !== day) {
            lastDay = day;
            lines.push({
                timestamp: timestamp,
                type: LineType.DayDivider
            });
        }
        lines.push(message);
    });    
    return lines;
}
