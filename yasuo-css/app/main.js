console.log('main');
console.log('main');
console.log('main');
import './main.less'
import './main.css'
import './test.css'
// import {a} from 'test.js'

var a = require('./test.js').a
console.log(a);
import {firstName,lastName} from './test2'
console.log(firstName,lastName);
// import $ from 'jquery'
// console.log($('#test'));