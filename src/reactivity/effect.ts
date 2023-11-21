import { extend } from "../shared";

let activeEffect; // 全局的依赖

class ReactiveEffect{
  private _fn: any;
  deps=[];
  active=true;
  public scheduler: Function | undefined;
  onStop?: () => void;
  constructor(fn, scheduler?: Function){
    this._fn = fn;
    this.scheduler = scheduler
  }
  run(){
    // 运行传过来的fn函数
    activeEffect = this;
    return this._fn();
  }
  stop(){
    // 清除effect
    if(this.active){
      cleanupEffect(this);
      if(this.onStop){
        this.onStop();
      }
      this.active = false;
    }
  }
}

function cleanupEffect(effect:any) {
  effect.deps.forEach((dep:any) => {
    dep.delete(effect)
  });
}

const targetMap = new Map()

export function track(target, key){
  // 依赖收集
  let depsMap = targetMap.get(target);
  if(!depsMap){
    depsMap = new Map();
    targetMap.set(target, depsMap)
  }

  let deps = depsMap.get(key)
  if(!deps){
    deps = new Set();
    depsMap.set(key, deps)
  }

  if(!activeEffect) return;

  deps.add(activeEffect);
  activeEffect?.deps.push(deps)
}

export function trigger(target, key){
  // 触发依赖，拿到以后依次遍历
  const depsMap = targetMap.get(target);
  const deps = depsMap.get(key);
  for (const effect of deps) {
    if(effect.scheduler){
      effect.scheduler();
    }else{
      effect?.run()
    }
  }
}


export function effect(fn, options:any={}){
  const reactiveEffect = new ReactiveEffect(fn, options.scheduler);
  // options
  // Object.assign(reactiveEffect, options); // 更优雅
  extend(reactiveEffect, options)
  // reactiveEffect.onStop = options.onStop;
  reactiveEffect.run();
  const runner:any = reactiveEffect.run.bind(reactiveEffect);
  runner.effect = reactiveEffect
  return runner;
}

export function stop(runner) {
  runner.effect.stop();
}