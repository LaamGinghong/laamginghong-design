async function initial(lan: Language) {
  window.language = lan
  window.i18n = window.i18n ?? {}
  window.i18n[lan] = await import(`./${lan}.json`).then(
    (module) => module.default,
  )
}

export default initial
