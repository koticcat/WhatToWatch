import { $ } from './jquery_init.js';
import { elements } from './views/base.js'
import {fab_init} from './views/fab'

console.log('App Has Started');

/* Initalise fab */
fab_init();


$(window).on('load',()=>{
  console.log('win');
});
$(document).ready(()=>{
  console.log('doc');
});