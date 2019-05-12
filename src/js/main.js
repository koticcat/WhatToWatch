import { $ } from './jquery_init.js';
import { elements } from './views/base.js'
import GetMovie from './models/Getmovie.js' 
import * as Renderelements from './views/render_elements.js'
import {RenderLoader} from './views/display_loader.js'

// console.log('App Has Started');

/*App initiaslised */
//init_app();
// console.log('App Has been Initalised')
/************/


const state = {
    loading_status:false
};


const getmovie = async ()=>{
    var query = 'query' ;
    state.loading_status=false;
    RenderLoader(state.loading_status);
    if (query){
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
            $(elements.fab_status).html('');
            state.getmovie_obj.trailer_status='No trailers found';
            Renderelements.RenderResults(state.getmovie_obj);
            state.loading_status=true;
            RenderLoader(state.loading_status);

            // getmovie();
        }
        else 
        {
            $(elements.fab_status).html('HURRAH!,Movie Found,Rendering');
            $(elements.fab_status).html('');
            Renderelements.RenderResults(state.getmovie_obj);
            state.loading_status=true;
            RenderLoader(state.loading_status);

        }
        


    }
}
const getmovie2 = ()=>{
    console.log(2);
}
getmovie(); 
export {getmovie,getmovie2};
