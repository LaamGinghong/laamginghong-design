import initial from './initial'

initial('zh')

function i18n(...str: string[]) {
  const i18nData = window.i18n[window.language ?? 'zh']
  const n = str.length
  if (n > 1) {
    const [key, ...rest] = str
    let value = i18nData[key]
    if (!value) throw Error(`can't find key = ${key}`)
    rest.forEach((item, index) => {
      value = value.replace(`PARAM${index + 1}`, item)
    })
    return value
  } else {
    const [letter] = str
    return i18nData[letter] ?? letter
  }
}

export default i18n
