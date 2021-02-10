const moment = require('moment')

let a = new Date("2020-04-09 15:00:00")
let b = (moment.utc(a).format('YYYY-MM-DD hh:mm:ss.SSSZ')).slice(0, -3)
let c = new Date("2020-04-09 00:00:00")
let d = (moment.utc(c).format('YYYY-MM-DD HH:mm:ss.SSSZ')).slice(0, -3)

console.log('a', a)
console.log('b', b)
console.log('c', c)
console.log('d', d)