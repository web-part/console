# @webpart/console

在原生 console 的基础上增加输出日志到指定文件里。


`npm install @webpart/console`

``` javascript

let console = require('@webpart/console');

console.file = './output/console.log';

console.log('a', 'b', 'c');
console.log({ a: 1, b: 2, });
console.log(new Date());
console.log(new Error('test-error'));
console.log([1, 2, 3]);
console.log(NaN);
console.log(undefined);
console.log(null);
console.error('error--ABC');




```

