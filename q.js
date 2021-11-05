/**
 * 
 * @param {Object} options 123
 * 
 * @param {"Custom"|"All"|"Numbers"|"Letters"|"Symbols"} options.type 1
 * @param {String} options.str - 2
 * @param {Number} options.length 3
 * 
*/
function generat({type = `Numbers`, str = ``, length = 6}) {
    let numbers = `0123456789`
    let symbols = `/+-=\\)(*&^%$#@!:"';.?,<>| []{}`
    let letters = `ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz`
    let q = numbers
    switch(type) {
        case "Custom":
            if (!str) return
            q = str
            break;
        case "All":
            q = letters + numbers
            break;
        case "Numbers":
            q = numbers
            break;
        case "Letters":
            q = letters
            break;
        case "Symbols":
            q = symbols
            break;
    }
    return Array(length).fill(q)
    .map(x => {
        return x[Math.floor(Math.random() * x.length)]
    }).join('');
}

module.exports.generat = generat
