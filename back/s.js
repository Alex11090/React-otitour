let str = "Ціна: 99 грн."

str = parseInt(str.replace(/[^a-zA-Z0-9 ]/g, ''))
console.log(str)