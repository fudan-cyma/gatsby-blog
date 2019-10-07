---
layout: posts
title: 'ES6 笔记'
date: '2019-09-05'
description: '<ECMAScript6>阅读笔记'
tags: [notes, es6]
---

### ES6 简介

#### Babel 转码

安装： `npm install --save-dev @babel/core`

配置文件：`.babelrc`

安装配置文件: `npm install --save-dev @babel/preset-react`

导入配置文件:`"presents": ["@babel/env", "@babel/preset-react"], "plugin": [] }`

命令行转码: `@babel/cli`

`npm install --save-dev @babel/cli`

`npx babel example.js -o comlied.js` `npx babel src -d lib`

`@babel/register` 调用后， 每当用 require 加载.js, .jsx, .es, .es6 会先用 Babel 进行转码

### let and const

- 如果区块中存在`let`和`const`命令，这个区块对这些命令声明的变量，从一开始就形成了封闭作用域。凡是在声明之前就使用这些变量，就会报错。(即使该变量是全局变量) ---- temporal dead zone
- `let`不允许在相同作用域内重复声明一个变量

#### 块级作用域

- 在块级作用域内声明函数应使用函数表达式
- 必须有大括号

#### const

- 声明时必须初始化
- 真正冻结对象: `Object.freeze`

#### 顶层对象的属性

`let`, `const`, `class` 声明的全局变量不属于顶层对象的属性 -> 顶层变量属性与全局变量挂钩的缺陷

#### globalThis 对象

### 3. 变量的解构赋值

#### 数组的解构赋值

`let [a,b,c] = [1,2,3]`

不一定要完全解构： `let [x,y] = [1,2,3]`

只要数据结构具有 Iterator 接口

#### 对象的解构赋值

`let {foo, bar} = {foo: 'aaa', bar: 'bbb'};`

变量必须与属性同名

可以用于嵌套解构 `let {p: [x, {y}]} = obj;` 此时 p 是模式不是变量，不会被赋值

### 4. string

字符串遍历器,可以用`for...of`循环遍历，可以识别大于`0xFFFF`的字符串

模板字符串: 所有空格和换行都会被保留. 消除: `trim()`

### 5. string method

- `String.fromCodePoint()` 可以识别大于`0xFFFF`的字符串; 对应: `codePointAt()`
- `String.raw()` 返回一个斜杠都被转义的字符串
- `includes()`, `startsWith()`, `endsWith()`
- `'x'.repeat(n)` 重复 n 次
- `'x'.padStart(5, 'ab') = 'ababx'`, `padEnd()` 补全长度
- `.trimStart()`, `.trimEnd()`

### 6. regex

### 7. number

- `Number.isFinite() Number.isNaN()` 只对 Number 有效
- `Number.parseInt() Number.parseFloat()` 目的:减少全局性方法
- `Number.isInteger()`
- `Number.EPSILON` JavaScript 所能表示的最小精度

### 8. function

- 函数参数的默认值

  - 与解构赋值默认值使用: 参数应为对象;若参数为空,则调用默认参数

    ```js
    function foo({x=2, y=5}={})
    ```

  - 默认值应该是函数的尾参数

  - `.length`将返回没有指定默认值的参数个数

  - 应用:指定参数不可省略

    ```js
    function throwIfMissing() {
    	throw new Error('missing parameters');
    }

    function foo(mustBeProvided = throwIfMissing()) {
    	return;
    }
    ```

- rest 参数: 取代`arguments`对象

  - `function add(...values)` values 将作为一个数组
  - 只能是最后一个参数

- 严格模式

- name 属性:将匿名函数赋值给一个变量,将会返回实际的函数名;将具名函数赋值给一个变量,则返回这个具名函数原本的名字

- 箭头函数

  - 与变量解构结合使用

  - ```js
    const full = ({ first, last }) => first + ' ' + last;
    ```

  - 函数体的`this`对象即定义时所在的对象而不是使用时的对象(固定)
    原理: 箭头函数没有自己的`this`,而是引用外层的`this`
    同理,箭头函数也没有自己的 arguments, super, new.target

  - 不适用场合

    - 定义对象的方法
    - 需要动态`this`

- 尾调用

  - 函数的最后一步是调用另一个函数(return)

  - 尾调用优化: 只保留内层函数的调用帧,如果所有函数都是尾调用,那么可以做到每次执行时,调用帧只有一项

  - 尾递归: 不会发生栈溢出

    -

    ```js
    function factorial(n) {
    	if (n === 1) return 1;
    	return n * factorial(n - 1);
    }

    function factorial(n, total) {
    	if (n === 1) return total;
    	return factorial(n - 1, n * total);
    } //尾递归
    ```

    - 改写: currying: 将多参数的函数转换成单参数的形式。这里也可以使用柯里化/函数默认值

    - 只在'use strict'开启

- Function.prototype.toString() 返回完整函数的初始代码

- `try...catch` catch 可以省略参数

### 9.arrays

#### 扩展运算符

`...[1,2,3] = 1 2 3` 将一个数组转为用逗号分隔的参数序列. 主要用于函数调用

应用:

1. 复制数组 `a2 = [...a1]` (clone)

2. 合并数组 `a4 = [...a1, ...a2]` (shallow copy)

3. 字符串: `[...'hello'] = ['h', 'e','l','l','o'];`

能够正确识别四个字节的 Unicode 字符。 => 正确返回字符串数组的长度

4. 可作用于任何实现了 Iterator 接口的对象

#### Array.from()

转换 类似数组的对象(array-like object, e.g. NodeList, arguments) 和 iterable objects(Set, Map)

#### Array.of()

用于替代 Array(), new Array(), 将一组值转换为数组

```js
Array.of(3, 11, 8); // [3,11,8]
Array.of(3); // [3]
Array.of(3).length; // 1
```

#### find(), findIndex()

参数是一个 callback, 所有数组成员依次执行 callback. 返回第一个返回值为 true 的成员

`[1,4,-5,10].find(n >= 0)`

#### 遍历数组

`entries()`, `keys()`, `values()`

#### includes()

`[NaN].includes[NaN] = true`

#### flat(), flatMap()

将嵌套的数组拉平

### 10. object

- 简洁表示法
  - `return {x,y}` = ES5 中 `return {x:x, y:y}`

### 11. object methods

- `Object.is()` (same value equality)

- `Object.assign(target, source1, source2)`

  - 复制所有可枚举对象

  - 如果重名,后面的属性会覆盖前面的属性

  - 非对象参数出现在 source 位置时,会转成对象

  - 不拷贝继承属性

  - 浅拷贝

  - 可以用来处理数组,但是会把数组视为对象

  - 如果要复制的值是一个取值函数,则将求值后再进行复制

  - 应用:

    - 为对象添加属性,方法

    - 克隆对象

    - 合并多个对象

      `const merge = (target, ...sources) => Object.assign(target, ...source)`

    - 为属性指定默认值

- `Object.getOwnPropertyDescriptors()` 返回指定对象所有自身属性的描述对象

  - 作用: `Object.assign`不会拷贝属性背后的赋值方法或取值方法/ 用于实现正确拷贝

    ```js
    const shallowMerge = (target, source) =>
    	Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
    ```

- `Object.setPrototypeOf(), Object.getPrototypeOf()`

  - 不应使用`.__proto__`属性
  - 设置: `Object.setPrototypeOf(object, prototype)`第一个参数如果不是对象会自动转换
  - `Object.getPrototypeOf()`

- `Object.keys()`, `Object.entries()`, `Object.values()`

  - 返回一个数组: 参数对象自身的所有可遍历属性的键名
  - 遍历: `for (let key of keys(obj)){}`
    - 类似: `for (let value of values(obj)){}`
      `for (let [key, value] of entries(obj)){}`
  - 会过滤属性名为 Symbol 值的属性

  ### 12. Symbol

- 独一无二的值 `let mySymbol = Symbol(string)` 参数 string 用于描述

  - 可以转换为 String, Boolean
  - 作属性名时只能使用[]
  - 应用: 替代"魔术字符串"

- 作为属性名不会出现在遍历(for...in, for...of, Object.keys())中
  使用`Object.getOwnPropertySymbols` 而不是 `Object.getOwnPropertyNames`

- `Symbol.for()`会先对参数进行全局搜索,如果没有则新建一个 Symbol 值

  ### 13. Set and Map

- Set()

  - 接受数组或具有 Iterable 接口的其他数据结构
  - `const set = new Set([1,2,3,4])`
  - `[...new Set([1,2,3])]` 在判断内部两个值是否相同时使用的是`===` 如 两个{} {} 被视作不相等
  - methods:
    - `Set.prototype.delete(value)`
    - `Set.prototype.has(value)`
    - `Set.prototype.clear()`
    - `Array.from(set)`
  - 遍历操作: 遍历顺序就是插入顺序
    - `keys()`, `values()`, `entries()`
    - `forEach()`: 应用: `set.forEach((value, key)=>console.log(key, value)`

- WeakSet

  - 成员只能是对象/对象都是弱引用=>不适合引用 WeakSet 的成员
  - 参照 Set(): `new WeakSet(), WeakSet.add(), WeakSet.delete(), WeakSet.has()`

- Map

  - 类似对象的键值对的集合,但是 key 的范围不局限于字符串

  - 只有对同一对象的引用, Map 才将其视为同一个键

  - properties and methods

    - `Map.prototype.size()`
    - `Map.prototype.set(key, value)`
    - `Map.prototype.get(key)` 找不到则返回`undefined`
    - `Map.prototype.has(key)`

  - 遍历方法(和`Object`的区别: `Object.keys(obj)`

    - `Map.prototype.keys()`, `values()`, `entries()`, `forEach()`
    - 转数组: `[...map.keys()]`

  - Map 转为对象:

    ```js
    function strMapToObj(strMap) {
    	let obj = Object.create(null);
    	for (let [k, v] of strMap) {
    		obj[k] = v;
    	}
    	return obj;
    }
    ```

  - 对象转为 Map

    ```js
    function objToStrMap(obj) {
    	let strMap = new Map();
    	for (let k of Object.keys(obj)) {
    		strMap.set(k, obj[k]);
    	}
    	return strMap;
    }
    ```

- WeakMap

  - 只接受对象作为键名
  - WeakMap 的键名指向的对象,不计入垃圾回收机制

### 14. Proxy

### 15.Reflect

### 16.Promise

- Promise 不受外界影响.
- 一旦状态改变就不会再变
  构造: `const promise = new Promise(function(resolve, reject))`
