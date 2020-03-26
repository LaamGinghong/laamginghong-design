const DAYS = ['日', '一', '二', '三', '四', '五', '六']
const MONTHS = ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月']

const DATE_HOURS: string[] = []
for (let i = 0; i < 24; i++) {
    if (i < 10) {
        DATE_HOURS.push(`0${i}`)
    } else {
        DATE_HOURS.push(`${i}`)
    }
}

const DATE_MINUTES: string[] = []
for (let i = 0; i < 60; i++) {
    if (i < 10) {
        DATE_MINUTES.push(`0${i}`)
    } else {
        DATE_MINUTES.push(`${i}`)
    }
}

const DATE_SECONDS = [...DATE_MINUTES]

const YEAR_DECADE = 10

const YEAR_CENTURY = 100

export { DAYS, MONTHS, DATE_HOURS, DATE_MINUTES, DATE_SECONDS, YEAR_DECADE, YEAR_CENTURY }
