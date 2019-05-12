import { $ } from '../jquery_init.js';
import { elements } from './base.js';
import {fab_init} from './fab.js'

fab_init();


var inital_splash_flag = true;

function displayloader(loader){
    if(loader==false)
    {
        $(elements.fab_spinner).css('display','flex');
        $(elements.fab_menu_container).css('display','none');
        $(elements.fab_option_warpper).addClass('fadeIn');
        $(elements.fab_option_warpper).css('display','flex');
    }
    else
    {
        if(inital_splash_flag)
        {
            setTimeout(()=>{
                $(elements.splash_container).css("transform","translate(0,-100%)");
                $(document).ready(()=>{
                    setTimeout(()=>{
                        $(elements.splash_container).css('display','none');
                        $(elements.main_container).css('display','flex');
                    },580);
                    // console.log('Ending Splash');
                });
            },500);
            inital_splash_flag=false;
        }
        $(elements.fab_option_warpper).removeClass('fadeIn');
        $(elements.fab_option_warpper).addClass('fadeOut');  
        setTimeout(()=>{    
            $(elements.fab_option_warpper).css('display','none');
            $(elements.fab_spinner).css('display','none');
            $(elements.fab_option_warpper).removeClass('fadeOut');
            $(elements.fab_menu_container).css('display','block');

        }, 500);
    }
}


export const RenderLoader = flag => {
    displayloader(flag);
}