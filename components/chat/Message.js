import { htmlToElement, timestampToTime } from '../../utils.js'
import { Side } from '../../enums.js';
import { MessageContentType } from '../../enums.js';

const doubleTick = `<svg viewBox="0 0 16 18" height="11" width="16" preserveAspectRatio="xMidYMid meet" class="dh5rsm73 hpdpob1j" version="1.1" x="0px" y="0px" enable-background="new 0 0 16 11" xml:space="preserve"><path fill="currentColor" d="M17.394,5.035l-0.57-0.444c-0.188-0.147-0.462-0.113-0.609,0.076l-6.39,8.198 c-0.147,0.188-0.406,0.206-0.577,0.039l-0.427-0.388c-0.171-0.167-0.431-0.15-0.578,0.038L7.792,13.13 c-0.147,0.188-0.128,0.478,0.043,0.645l1.575,1.51c0.171,0.167,0.43,0.149,0.577-0.039l7.483-9.602 C17.616,5.456,17.582,5.182,17.394,5.035z M12.502,5.035l-0.57-0.444c-0.188-0.147-0.462-0.113-0.609,0.076l-6.39,8.198 c-0.147,0.188-0.406,0.206-0.577,0.039l-2.614-2.556c-0.171-0.167-0.447-0.164-0.614,0.007l-0.505,0.516 c-0.167,0.171-0.164,0.447,0.007,0.614l3.887,3.8c0.171,0.167,0.43,0.149,0.577-0.039l7.483-9.602 C12.724,5.456,12.69,5.182,12.502,5.035z"></path></svg>`;
const singleTick = `<svg viewBox="0 0 16 18" height="11" width="12" preserveAspectRatio="xMidYMid meet" class="" fill="none"><path d="M11.1549 0.652832C11.0745 0.585124 10.9729 0.55127 10.8502 0.55127C10.7021 0.55127 10.5751 0.610514 10.4693 0.729004L4.28038 8.36523L1.87461 6.09277C1.8323 6.04622 1.78151 6.01025 1.72227 5.98486C1.66303 5.95947 1.60166 5.94678 1.53819 5.94678C1.407 5.94678 1.29275 5.99544 1.19541 6.09277L0.884379 6.40381C0.79128 6.49268 0.744731 6.60482 0.744731 6.74023C0.744731 6.87565 0.79128 6.98991 0.884379 7.08301L3.88047 10.0791C4.02859 10.2145 4.19574 10.2822 4.38194 10.2822C4.48773 10.2822 4.58929 10.259 4.68663 10.2124C4.78396 10.1659 4.86436 10.1003 4.92784 10.0156L11.5738 1.59863C11.6458 1.5013 11.6817 1.40186 11.6817 1.30029C11.6817 1.14372 11.6183 1.01888 11.4913 0.925781L11.1549 0.652832Z" fill="currentcolor"></path></svg>`;

const StatusMark = ({ status }) => {
    return `<div class="status ${status}">
                ${status === 'sent' ? singleTick : doubleTick}
            </div>`;
}


export const GetMessage = ({ content, timestamp, status, side, contentType }) => {
    if (contentType !== MessageContentType.PlainText) throw new Error(`ContentType ${contentType} not implemented`);
    return htmlToElement(
        `<div class="line message ${side}">
            <div class="bubble">
                <div class="content">${content}</div>
                <div class="meta">
                    <div class="time">${timestampToTime(timestamp)}</div>
                    ${side === Side.SENT ? StatusMark({ status }) : ''}
                </div>
            </div>
        </div>`
    );
}

