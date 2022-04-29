import { readFile } from 'fs/promises'
import papaparse from 'papaparse'

const options = {
    base: 1000,
    cost: 0,
    hold: 0,
    stock: 0,
    isSaleHalf: false
}
let total = 0

try {
    const controller = new AbortController()
    const { signal } = controller
    const res = await readFile('./pb.csv', { signal, encoding: 'utf8'})
    const data = papaparse.parse(res).data.reverse()
    data.pop()
    data.filter((item, index) => index % 5 === 0).map(([time,point,pb,temperature]) => {
        const tp = Number(temperature)
        const price = Number(point)
        total += options.base
        let cost = 0
        if (tp < 10) {
            cost = options.base
        } else if (tp < 20) {
            cost = options.base * 0.8
        } else if (tp < 25) {
            cost = options.base * 0.6
        } else if (tp < 30) {
            cost = options.base * 0.5
        } else if (tp < 40) {
            // nothing
        } else if (tp < 50) {
            if (options.isSaleHalf) return
            const half = options.hold * 0.5
            options.stock += half * price
            options.hold = options.hold - half
            options.isSaleHalf = true
        } else {
            options.stock += options.hold * price
            options.hold = 0
            options.isSaleHalf = false
        }
        options.cost += cost
        options.hold += cost / price
    })
    console.log(options, data[data.length - 1][1] * options.hold + options.stock, total)
} catch (e) {
    console.error(e)
}