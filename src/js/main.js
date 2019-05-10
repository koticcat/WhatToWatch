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
const getmovie = async ()=>{
    var query = 'query' ;
    if (query){
        state.getmovie_obj = new GetMovie(query);
        await state.getmovie_obj.getMovie(); 
        console.log(state.getmovie_obj.data)
        if(state.getmovie_obj.data===undefined)
        {
            console.log('Retrying');
            getmovie();
        }
        console.log(state.getmovie_obj.imdb_info)
        if(state.getmovie_obj.utube_link.results.length!==0)
        {
            console.log(state.getmovie_obj.utube_link.results[0].key)
        }
        if(state.getmovie_obj.utube_link.results.length===0)
        {
            console.log('no trailer found');
            // getmovie();

        }

    }
}

getmovie();
console.log(state);
