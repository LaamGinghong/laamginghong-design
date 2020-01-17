export function isChinese(str: string): boolean {
  return /^[\u4e00-\u9fa5]+$/.test(str)
}
