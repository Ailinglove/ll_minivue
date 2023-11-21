
class ReactiveEffect{
  private _fn: any;

  constructor(fn, public scheduler?){
    this._fn = fn;
  }
  run(){
    // 运行传过来的fn函数
    activeEffect = this;
    return this._fn();
  }
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
  deps.add(activeEffect);
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

let activeEffect; // 全局的依赖

export function effect(fn, options:any={}){

  const reactiveEffect = new ReactiveEffect(fn, options.scheduler);
  reactiveEffect.run();

  return reactiveEffect.run.bind(reactiveEffect)
}