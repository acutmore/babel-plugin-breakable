'use strict';

let input = "function foo(){}\n" +
"function invoke(f){\n" +
"  f();\n" + 
"}\n" +
"invoke(foo);";

let babel = require('babel-core');
let plugins = [require('../src/index')];

let out = babel.transform(input, { plugins });

console.log("\nINPUT:");
console.log(input);
console.log("\nOUTPUT:");
console.log(out.code);
