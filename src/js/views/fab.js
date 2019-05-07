import { $ } from '../jquery_init.js';
import { elements } from './base.js'

var fab_init=function fab(){
    console.log('fab module has started');
    $(elements.fab_items).addClass('animated');
    $(elements.fab_menu_btn).addClass('animated fadeInUp');
    var open = 0;
    function click_action(){
        $(elements.fab_items).addClass('fadeIn');
        $(elements.fab_items).addClass('open');
        if(open%2!=0){
            $(elements.fab_items).removeClass('fadeIn');
            $(elements.fab_items).addClass('fadeOut');
            setTimeout(()=>{
            $(elements.fab_items).removeClass('open');
            $(elements.fab_items).removeClass('fadeOut');
            $(elements.fab_items).addClass('fadeIn');
            }, 300);
            
        }
        
        open++;
        $(elements.fab_arrow).toggleClass('flip');
    }
    
    $(elements.fab_menu_btn).click(()=>{
        click_action(); 
        if($(elements.fab_arrow).hasClass('flip')){
            console.log('open');
            setTimeout(()=>{
                if($(elements.fab_arrow).hasClass('flip')){
                    click_action();
                }
            }, 3000);
        }    
    });
}

export {fab_init};