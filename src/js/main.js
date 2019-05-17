import { $ } from './jquery_init.js';
import { elements } from './views/base.js'
import GetMovie from './models/Getmovie.js' 
import * as Renderelements from './views/render_elements.js'
import {RenderLoader} from './views/display_loader.js'
import FilterResults from './views/filter-view.js'
// console.log('App Has Started');

/*App initiaslised */
//init_app();
// console.log('App Has been Initalised')
/************/


const state = {
    loading_status:false
};


const getmovie = async (query)=>{
    state.loading_status=false;
    RenderLoader(state.loading_status);
    if (!query){
        state.getmovie_obj = new GetMovie(query);
        await state.getmovie_obj.getMovie();
        if(state.getmovie_obj.data===undefined)
        {
            $(elements.fab_status).html('No movie Found,Retrying!');
            getmovie();
        }
        else if(state.getmovie_obj.data.original_language!=="en")
        {
            $(elements.fab_status).html('Not English,Retrying!');
            getmovie();

        }
        else if(state.getmovie_obj.data.adult===true)
        {
            $(elements.fab_status).html('OOPS Adult Film!,Retrying');
            getmovie();

        }
        else if(state.getmovie_obj.data.imdb_id===null||state.getmovie_obj.data.imdb_id==="")
        {
            $(elements.fab_status).html('No Imdb Found,Retrying');
            getmovie();

        }
        else if(state.getmovie_obj.imdb_info.imdbRating==="N/A")
        {
            $(elements.fab_status).html('No Rating Found,Retrying');
            getmovie();

        }
        else if(state.getmovie_obj.utube_link.results.length===0)
        {
            // console.log('no trailer found');
            $(elements.fab_status).html('HURRAH!,Movie Found,Rendering');
            state.getmovie_obj.trailer_status='No trailers found';
            Renderelements.RenderResults(state.getmovie_obj);
            state.loading_status=true;
            RenderLoader(state.loading_status);
            setTimeout(()=>{
                $(elements.fab_status).html('');
            },1000)
        }
        else 
        {
            $(elements.fab_status).html('HURRAH!,Movie Found,Rendering');
            Renderelements.RenderResults(state.getmovie_obj);
            state.loading_status=true;
            RenderLoader(state.loading_status);
            setTimeout(()=>{
                $(elements.fab_status).html('');
            },1000)
        }
    }
    else
    {
        state.loading_status=false;
        RenderLoader(state.loading_status);
        state.getmovie_obj_filtered = new GetMovie(query);
        await state.getmovie_obj_filtered.getMovie_filtered();
        if(state.getmovie_obj_filtered.data===undefined)
        {
            $(elements.fab_status).html('No movie Found,Retrying!');
            getmovie(state.filter_request.filter_parameters)
        }
        else if(state.getmovie_obj_filtered.quit_status===true)
        {
            $(elements.fab_status).html('Could Not Find a Movie');            
            state.loading_status=true;
            setTimeout(()=>{
                RenderLoader(state.loading_status);
            },2000)
            setTimeout(()=>{
                $(elements.fab_status).html('');
            },2500)
        }
        else if(state.getmovie_obj_filtered.utube_link===undefined)
        {
            state.getmovie_obj_filtered.trailer_status='No trailers found';
            state.loading_status=true;  
            RenderLoader(state.loading_status);
            Renderelements.RenderResults(state.getmovie_obj_filtered);
            setTimeout(()=>{
                $(elements.fab_status).html('');
            },1000)
        }
        else if(state.getmovie_obj_filtered.utube_link.results.length===0||state.getmovie_obj_filtered.utube_link===undefined)
        {
            state.getmovie_obj_filtered.trailer_status='No trailers found';
            state.loading_status=true;  
            RenderLoader(state.loading_status);
            Renderelements.RenderResults(state.getmovie_obj_filtered);
            setTimeout(()=>{
                $(elements.fab_status).html('');
            },1000)
        }
        
        else
        {
            state.loading_status=true;
            RenderLoader(state.loading_status);
            Renderelements.RenderResults(state.getmovie_obj_filtered);
            setTimeout(()=>{
                $(elements.fab_status).html('');
            },1000)
        }
    }
}

const getmovie_filtered = ()=>{
    state.filter_request = new FilterResults()
    state.filter_request.init_filter();
    $(elements.filter_btn).click(()=>{
        getmovie(state.filter_request.filter_parameters);
    })

}

getmovie_filtered();
getmovie(); 
export {getmovie};
