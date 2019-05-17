import { $ } from '../jquery_init.js';
import { elements } from './base.js';


export default class FilterResults{
    update_parameters()
    {
        var filter_parameters={
            filter_rating_inp: $(elements.rating_inp).val(),
            filter_release_year_inp: $(elements.release_year_inp).val(),
            filter_non_eng_inp: $(elements.non_eng_inp).val(),
            filter_adult_inp: $(elements.adult_inp).val(),
            
        }
        this.filter_parameters=filter_parameters;
    }
    init_filter()
    {
        var english_toggle=0,adult_toggle=0;
        $(elements.adult_inp).on('input',()=>{
            if(adult_toggle%2==0)
            {
                console.log('adult')
                $(elements.adult_inp).val('adult');
                adult_toggle++;
            }
            else
            {
                console.log('not-adult');
                $(elements.adult_inp).val('!adult');
                adult_toggle++;

            }
        });
        $(elements.non_eng_inp).on('input',()=>{
            if(english_toggle%2==0)
            {
                console.log('non-en');
                $(elements.non_eng_inp).val('non-en');
                english_toggle++;
            }
            else
            {
                console.log('en');
                $(elements.non_eng_inp).val('!non-en');
                english_toggle++;
            }
        });
        $(elements.rating_slider_value).html('&nbsp'+elements.rating_inp.val());
        $(elements.rating_inp).on('input',()=>{
            $(elements.rating_slider_value).html('&nbsp'+elements.rating_inp.val());
        });
        $(elements.filter_btn).click(()=>{
            this.update_parameters();
            $(elements.filter_icon).toggleClass('flip2');
        })
    }
}