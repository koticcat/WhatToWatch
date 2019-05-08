import { $ } from '../jquery_init.js';
import { elements } from './base.js'
import {fab_init} from './fab.js'
import {init_splash} from './splash.js'

/* Initalise app */

function init_app(){
    console.log('App is being initalised');
    fab_init();
    setTimeout(()=>{
        $(elements.splash_container).css("transform","translate(0,-100%)");
        $(document).ready(()=>{
            setTimeout(()=>{
                $(elements.splash_container).css('display','none');
                $(elements.main_container).css('display','flex');
            },580);
            console.log('Ending Splash');
        });
    },100);
    init_splash();
    
}
export {init_app};