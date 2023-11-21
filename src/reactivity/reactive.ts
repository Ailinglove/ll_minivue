import { mutableHandler, readonlyHandlers } from "./baseHandler"
export enum ReactiveFlags{
  IS_REACTIVE= "__v_reactive",
  IS_READONLY="__v_readonly"
}
export function reactive(original){
  return createReactiveObj(original, mutableHandler)
}

export function readonly(original){
  return createReactiveObj(original, readonlyHandlers)
}

function createReactiveObj(original, handlers){
  return new Proxy(original, handlers)
}

export function isReactive(value) {
  return !!value[ReactiveFlags.IS_REACTIVE]
}
export function isReadonly(value) {
  return !!value[ReactiveFlags.IS_READONLY]
}
