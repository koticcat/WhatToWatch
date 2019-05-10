import { ok } from "assert";

export default class GetMovie{
    constructor(parameters)
    {
        this.parameters = parameters;
    }
    get_random_id(){
        var max = 600000;
        var min = 2;
        return Math.round(Math.random() * (max - min) + min);
    }
    async getMovie(parameters)
    {
        var api_key = '6d2cc019c4eaf4d8ba5c24fa599b15c5';
        var random_id = this.get_random_id();
        var omdb_api_key = 'cf3ed16a';


        const res = await fetch(`https://api.themoviedb.org/3/movie/${random_id}?api_key=${api_key}`);
        if(res.ok){
            console.log('Got it!');
            const json_main = await res.json();
            this.data = json_main;
            if(this.data.original_language!=="en")
            {
                console.log('Not English');
                this.getMovie();
            }
            var imdb_id =this.data.imdb_id; 
            const trailer_link = await fetch(`http://api.themoviedb.org/3/movie/${random_id}/videos?api_key=${api_key}`)
            if(trailer_link.ok)
            {
                const trailer_link_json = await trailer_link.json();
                this.utube_link = trailer_link_json;
            }
            const imdb_rating_request = await fetch(`http://www.omdbapi.com/?i=${imdb_id}&plot=short&r=json&apikey=${omdb_api_key}`);
            if(imdb_rating_request.ok)
            {
                const imdb_info= await imdb_rating_request.json();
                this.imdb_info = imdb_info; 
            }
        }
    }
}

