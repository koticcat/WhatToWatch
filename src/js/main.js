import { $ } from './jquery_init.js';
import { elements } from './views/base.js'
console.log('App Has Started');

$(elements.fab_menu_btn).click(()=>{
  $(elements.fab_items).addClass('animated fadeInUp')
  $(elements.fab_items).toggleClass('open');
  $(elements.fab_arrow).toggleClass('flip');
});

