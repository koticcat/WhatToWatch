import { $ } from './jquery_init.js';
import { elements } from './views/base.js'
import {init_app} from './views/init_app.js'
import GetMovie from './models/Getmovie.js' 

console.log('App Has Started');

/*App initiaslised */
init_app();
console.log('App Has been Initalised')
/************/


const state = {};
const getmovie = new GetMovie();
getmovie.getMovie(); 
// console.log(getmovie.data)

