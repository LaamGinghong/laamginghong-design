function getType(val: any): string {
  return Object.prototype.toString.call(val).slice(8, -1)
}

function isPromise(val: any): val is Promise<any> {
  return getType(val) === 'Promise'
}

export { isPromise }
