const rules = [
    // * Code Block
    [ /`{3}(?:(.*$)\n)?([\s\S]*)`{3}/m, '<code><pre>$2</pre></code>' ],

    // * Checkbox
    [ /- \[ \] (.*)/g, `<label><input type="checkbox" onclick="return false;"><span>$1</span></label><br>` ],
    [ /- \[x\] (.*)/g, `<label><input type="checkbox" checked onclick="return false;"><span>$1</span></label><br>` ],
    
    // * Header rules
    [ /#{6}\s?([^\n]+)/g, "<h6>$1</h6>" ],
    [ /#{5}\s?([^\n]+)/g, "<h5>$1</h5>" ],
    [ /#{4}\s?([^\n]+)/g, "<h4>$1</h4>" ],
    [ /#{3}\s?([^\n]+)/g, "<h3>$1</h3>" ],
    [ /#{2}\s?([^\n]+)/g, "<h2>$1</h2>" ],
    [ /#{1}\s?([^\n]+)/g, "<h1>$1</h1>" ],
    
    // * Blockquotes
    [ /(&gt;)\s?([^\n]+)/g, `<div class="blockquote">$2</div>` ],
    
    // * Bold, Italics and paragragh rules
    [ /\*\*\s?([^\n]+)\*\*/g, "<b>$1</b>" ],
    [ /\*\s?([^\n]+)\*/g, "<i>$1</i>" ],
    [ /__([^_]+)__/g, "<b>$1</b>" ],
    [ /_([^_`]+)_/g, "<i>$1</i>" ],
    // [ /([^\n]+\n?)/g, "<p>$1</p>" ],
    
    // * Monospace
    [ /(`{1})(\s?[^\n,]+\s?)(`{1})/g, '<code class="monospace">$2</code>' ],
    
    // * Image
    [ /!\[([^\[]+)\]\(([^\)]+)\)/g, `<img src="$2" alt="$1">` ],

    // * Links
    [ /\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" class="link" target="_blank">$1</a>' ],

    // * Lists
    [ /(\*|\+|\-)(.*)/g, `<ul><li>$2</li></ul>` ],

    // * Warning, Error
    [ /\n!!!{1}\s?([^\n]+)/g, `<div class="error">$1</div>` ],
    [ /\n!!{1}\s?([^\n]+)/g, `<div class="warning">$1</div>` ]
];

const uts = (UT, one, two, five) => {
    if (`${ UT }`.split('').reverse()[ 1 ] === '1') return `${ UT }${ five }`;
    if (`${ UT }`.split('').reverse()[ 0 ] === '1') return `${ UT }${ one }`;
    if (+(`${ UT }`.split('').reverse()[ 0 ]) >= 2 && +(`${ UT }`.split('').reverse()[ 0 ]) <= 4) return `${ UT }${ two }`;
    return `${ UT }${ five }`;
}

const timeago = (time = Date.now()) => {
    let msPerMinute = 60 * 1000,
        msPerHour = msPerMinute * 60;
        msPerDay = msPerHour * 24,
        elapsed = Date.now() - time;
    
    if (elapsed < msPerMinute) return `${uts(Math.round(elapsed / 1000), ' second', ' seconds', ' seconds')} ago`;
        else if (elapsed < msPerHour) return `${uts(Math.round(elapsed / msPerMinute), ' minute', ' minutes', ' minutes')} ago`;
            else if (elapsed < msPerDay) return `${uts(Math.round(elapsed / msPerHour), ' hour', ' hours', ' hours')} ago`;
                else {
                    let { day, month_name, year } = unix(time);
                    return `${day} ${month_name} ${year}`;
                }
}

const unix = (unix = Date.now()) => {
    const Months_name = [ "january", "february", "martha", "april", "may", "june", "july", "august", "september", "october", "november", "december" ];

    let date = new Date(unix),
        year = date.getFullYear(),
        day = date.getDate(),
        month = date.getMonth(),
        hours = date.getHours(),
        minutes = date.getMinutes(),
        seconds = date.getSeconds();

    if (month < 10) month = `0${ month }`;
    if (day < 10) day = `0${ day }`;
    if (hours < 10) hours = `0${ hours }`;
    if (hours >= 24) hours = `0${ hours - new Number(24) }`;
    if (minutes < 10) minutes = `0${ minutes }`;
    if (minutes >= 60) minutes = `0${ minutes - new Number(60) }`;
    if (seconds < 10) seconds = `0${ seconds }`;
    if (seconds >= 60) seconds = `0${ seconds - new Number(60) }`;


    return {
        year: year,
        day: day,
        month: month,
        month_name: Months_name[Number(month)],
        hours: hours,
        minutes: minutes,
        seconds: seconds
    }
}

const randomHex = (count) => {
    let array = [];
    for (let i = 0; i < count; i++) array.push('#' + Math.random().toString(16).substr(-6));
    return array;
}

const md = (text) => {
    text = text.replace(/</g, '&lt;').replace(/>/g, '&gt;');
    for (let [rule, template] of rules) text = text.replace(rule, template);
    return text;
}