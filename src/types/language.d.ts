declare type Language = 'zh' | 'en'

declare interface Window {
  language: Language
  i18n: {
    [key in Language]: {
      [key: string]: string
    }
  }
}
