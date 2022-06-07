const rules = [
  // * Code Block
  [/`{3}(?:(.*$)\n)?([\s\S]*)`{3}/m, '<code><pre>$2</pre></code>'],

  // * Checkbox
  [/- \[ \] (.*)/g, `<label><input type='checkbox' onclick='return false;'><span>$1</span></label><br>`],
  [/- \[x\] (.*)/g, `<label><input type='checkbox' checked onclick='return false;'><span>$1</span></label><br>`],

  // * Header rules
  [/#{6}\s?([^\n]+)/g, '<h6>$1</h6>'],
  [/#{5}\s?([^\n]+)/g, '<h5>$1</h5>'],
  [/#{4}\s?([^\n]+)/g, '<h4>$1</h4>'],
  [/#{3}\s?([^\n]+)/g, '<h3>$1</h3>'],
  [/#{2}\s?([^\n]+)/g, '<h2>$1</h2>'],
  [/#{1}\s?([^\n]+)/g, '<h1>$1</h1>'],

  // * Blockquotes
  [/(&gt;)\s?([^\n]+)/g, `<div class='blockquote'>$2</div>`],

  // * Bold, Italics and paragragh rules
  [/\*\*\s?([^\n]+)\*\*/g, '<b>$1</b>'],
  [/\*\s?([^\n]+)\*/g, '<i>$1</i>'],
  [/__([^_]+)__/g, '<b>$1</b>'],
  [/_([^_`]+)_/g, '<i>$1</i>'],
  // [ /([^\n]+\n?)/g, "<p>$1</p>" ],

  // * Monospace
  [/(`{1})(\s?[^\n,]+\s?)(`{1})/g, '<code class="monospace">$2</code>'],

  // * Image
  [/!\[([^\[]+)\]\(([^\)]+)\)/g, `<img src='$2' alt='$1'>`],

  // * Links
  [/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" class="link" target="_blank">$1</a>'],

  // * Lists
  [/(\*|\+|\-)(.*)/g, `<ul><li>$2</li></ul>`],

  // * Warning, Error
  [/\n!!!{1}\s?([^\n]+)/g, `<div class='error'>$1</div>`],
  [/\n!!{1}\s?([^\n]+)/g, `<div class='warning'>$1</div>`],
];

export default rules;