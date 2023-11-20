export function reactive(original){
  return new Proxy(original, {
    get(target, prop){
      return target[prop]
    }
  })
}