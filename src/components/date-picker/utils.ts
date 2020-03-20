import dayjs, { Dayjs } from 'dayjs'

function initDateBox(value: Date): Dayjs[] {
  const year = dayjs(value).year()
  const month = dayjs(value).month()
  const monthFirst = dayjs(new Date(year, month, 1))
  const monthFirstDay = monthFirst.day() // 获取这个月第一天在星期几
  const dateBox: Dayjs[] = [] // 存放当前显示日期
  let index = 0
  const dateBoxStart = monthFirst.subtract(monthFirstDay, 'day')
  while (index < 42) {
    dateBox.push(dateBoxStart.add(index, 'day'))
    index++
  }
  return dateBox
}

function initYear(value: Date): number {
  return dayjs(value).year()
}

function initMonth(value: Date): string {
  const month = dayjs(value).month()
  let result = `${month + 1}`
  if (month + 1 < 10) {
    result = `0${month + 1}`
  }
  return result
}

export { initDateBox, initMonth, initYear }
