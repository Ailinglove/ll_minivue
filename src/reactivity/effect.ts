let activeEffect; // 全局的依赖

class ReactiveEffect{
  private _fn;

  constructor(fn:any){
    this._fn = fn;
  }
  run(){
    // 运行传过来的fn函数
    this._fn();
    activeEffect = this;
    console.log('yunxingrun', activeEffect)

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
  deps.add(activeEffect)
}

export function trigger(target, key){
  // 触发依赖，拿到以后依次遍历
  const depsMap = targetMap.get(target);
  const deps = depsMap.get(key);
  for (const effect of deps) {
    effect?.run()
  }
}

export function effect(fn){
  // 调用即运行
  const reactiveEffect = new ReactiveEffect(fn);
  reactiveEffect.run();
}