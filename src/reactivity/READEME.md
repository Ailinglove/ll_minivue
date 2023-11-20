# reactivity
1. 初始化环境 npm init -y
2. 规定目录 src/reactivity，目录下有对应的test文件夹和index.ts
3. typescript环境
- 安装typescript npm install typescript
- npx tsc --init，此时新增一个文件tsconfig.json
4. 准备jest环境
- npm install jest @types/jest --dev
- tsconfig中配置 "types": ["jest"]
- jest是运行在浏览器环境中，只支持commonjs规范，不支持esmodule，所以通过安装babel对esmodule转换`npm install --save-dev babel-jest @babel/core @babel/preset-env`
- package.json script 中增加 "test": "jest"，然后运行npm run test则开始遍历目录，运行test文件了
![Alt text](image.png)

