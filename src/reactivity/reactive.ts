import { mutableHandler, readonlyHandlers } from "./baseHandler"

export function reactive(original){
  return createReactiveObj(original, mutableHandler)
}

export function readonly(original){
  return createReactiveObj(original, readonlyHandlers)
}

function createReactiveObj(original, handlers){
  return new Proxy(original, handlers)

}