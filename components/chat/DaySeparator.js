import { htmlToElement } from '../../utils.js'

export const DaySeparator = ({ timestamp, ...other }) => {
    return htmlToElement(
        `<div class="line daySeparator">
            <div class="snack">
                ${timestamp.toLocaleDateString('en-GB')}
            </div>
        </div>`
    );
}