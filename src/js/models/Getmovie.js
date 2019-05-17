import { $ } from '../jquery_init.js';
import { elements } from '../views/base.js';
import {RenderLoader} from '../views/display_loader.js'


export default class GetMovie{
    constructor(parameters)
    {
        this.parameters = parameters;
        this.retry_attempts = 0;
    }
    get_random_id(){
        var max = 600000;
        var min = 2;
        return Math.round(Math.random() * (max - min) + min);
    }

    get_random_id_in_range(max)
    {
        var max_id = max-1
        var min = 2;
        return Math.round(Math.random() * (max_id - min) + min);
    }
    async getMovie()
    {
        var api_key = '6d2cc019c4eaf4d8ba5c24fa599b15c5';
        var random_id = this.get_random_id();
        var omdb_api_key = 'cf3ed16a';


        const res = await fetch(`https://api.themoviedb.org/3/movie/${random_id}?api_key=${api_key}`);
        if(res.ok){
            const json_main = await res.json();
            this.data = json_main;
            var imdb_id =this.data.imdb_id; 
            const trailer_link = await fetch(`https://api.themoviedb.org/3/movie/${random_id}/videos?api_key=${api_key}`)
            if(trailer_link.ok)
            {
                const trailer_link_json = await trailer_link.json();
                this.utube_link = trailer_link_json;
            }
            const imdb_rating_request = await fetch(`https://www.omdbapi.com/?i=${imdb_id}&plot=short&r=json&apikey=${omdb_api_key}`);
            if(imdb_rating_request.ok)
            {
                const imdb_info = await imdb_rating_request.json();
                this.imdb_info = imdb_info; 
            }
        }
    }
    async getMovie_filtered()
    {
        var api_key = '6d2cc019c4eaf4d8ba5c24fa599b15c5';
        var omdb_api_key = 'cf3ed16a';
        var allow_adult = false;
        var allow_non_eng = false;
        if(this.parameters.filter_adult_inp!=="!adult")
        {
            allow_adult=true;
        }
        else
        {
            allow_adult = false;
        }
        if(this.parameters.filter_non_eng_inp==="!non-en")
        {
            allow_non_eng = true;
        }
        else
        {
            allow_non_eng = false;
        }

        var filter_rating = this.parameters.filter_rating_inp;
        var filter_year = this.parameters.filter_release_year_inp;
        var random_page = this.retry_attempts+this.get_random_id_in_range(10);
        var query = '';
        if(allow_non_eng == false)
        {
            query=`https://api.themoviedb.org/3/discover/movie?api_key=${api_key}&include_adult=${allow_adult}&page=${random_page}&sort_by=vote_average.desc&primary_release_year=${filter_year}`;
           
        }
        else
        {
            query=`https://api.themoviedb.org/3/discover/movie?api_key=${api_key}&language=en-US&include_adult=${allow_adult}&page=${random_page}&sort_by=vote_average.desc&primary_release_year=${filter_year}`
        }
        const res = await fetch(query);
        if(res.ok){
            const json_main = await res.json();
            this.data_main = json_main;
            if(this.data_main.results.length!==0)
            {
                let i=0;
                for(i=0;i<this.data_main.results.length;i++){
                    var get_imdb_id = await fetch(`https://api.themoviedb.org/3/movie/${this.data_main.results[i].id}?api_key=${api_key}`);
                    if(get_imdb_id.ok){
                        const json_item = await get_imdb_id.json();
                        this.data = json_item;
                        var imdb_id =this.data.imdb_id;
                        const imdb_rating_request = await fetch(`https://www.omdbapi.com/?i=${imdb_id}&plot=short&r=json&apikey=${omdb_api_key}`);
                        if(imdb_rating_request.ok)
                        {
                            const imdb_info = await imdb_rating_request.json();
                            this.imdb_info = imdb_info;
                            if(this.imdb_info.imdbRating>=filter_rating &&  this.imdb_info.imdbRating!=="N/A")
                            {
                                var item_id = this.data.id;
                                const trailer_link = await fetch(`https://api.themoviedb.org/3/movie/${item_id}/videos?api_key=${api_key}`)
                                if(trailer_link.ok)
                                {
                                    const trailer_link_json = await trailer_link.json();
                                    this.utube_link = trailer_link_json;
                                }
                                break;
                            }
                            else
                            {
                                $(elements.fab_status).html(this.imdb_info.imdbRating);
                                if(i===this.data_main.results.length-1)
                                {
                                   
                                    if(this.retry_attempts>=5)
                                    {
                                        console.log('quiting')
                                       this.quit_status=true;
                                       RenderLoader(true);
                                        break;
                                    }
                                    this.retry_attempts++;
                                    console.log('end of result array');
                                    this.getMovie_filtered();
                                }
                            }
                        }
                        else
                        {
                            console.log('quiting');
                            this.quit_status=true;
                        }
                    }
                }
            }
            else
            {
                console.log('retrying')
                this.getMovie_filtered();

            }
            
        }


        
    }
}

