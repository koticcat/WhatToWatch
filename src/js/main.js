import { $ } from './jquery_init.js';
import { elements } from './views/base.js'
import {init_app} from './views/init_app.js'
import GetMovie from './models/Getmovie.js' 
import * as Renderelements from './views/render_elements.js'

console.log('App Has Started');

/*App initiaslised */
init_app();
console.log('App Has been Initalised')
/************/


const state = {};
const getmovie = async ()=>{
    var query = 'query' ;
    if (query){
        state.getmovie_obj = new GetMovie(query);
        await state.getmovie_obj.getMovie(); 
        console.log(state.getmovie_obj);
        if(state.getmovie_obj.data===undefined)
        {
            getmovie();
        }
        else if(state.getmovie_obj.data.adult===true)
        {
            console.log('adult!');
            getmovie();

        }
        else if(state.getmovie_obj.data.imdb_id===null||state.getmovie_obj.data.imdb_id==="")
        {
            console.log('no Imdb found');
            getmovie();

        }
        else if(state.getmovie_obj.imdb_info.imdbRating==="N/A")
        {
            console.log('No rating found');
            getmovie();

        }
        else if(state.getmovie_obj.utube_link.results.length===0)
        {
            // console.log('no trailer found');
            state.getmovie_obj.trailer_status='No trailers found';
            Renderelements.RenderResults(state.getmovie_obj);
            // getmovie();
        }
        else 
        {
            console.log('render');
            Renderelements.RenderResults(state.getmovie_obj);
            
        }
        


    }
}
const getmovie2 = ()=>{
    console.log(2);
}
getmovie(); 
export {getmovie,getmovie2};
