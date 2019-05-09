import { ok } from "assert";

export default class GetMovie{
    constructor(parameters)
    {
        this.parameters = parameters;
    }
    get_random_id(){
        var max = 951;
        var min = 62;
        return Math.random() * (max - min) + min;
    }
    async getMovie()
    {
        var api_key = '6d2cc019c4eaf4d8ba5c24fa599b15c5';
        var random_id = this.get_random_id();
        fetch(`https://api.themoviedb.org/3/movie/${random_id}?api_key=${api_key}`)
        .then((response=>{
            if (response.ok) 
            {
                return response.json();
            } 
            else 
            {
                throw new Error('Something went wrong');
            }
        }))
        .then(async (responseJson) => {
            var data = responseJson;
            this.data = data;
            console.log(data);
            const trailer_link = await fetch(`http://api.themoviedb.org/3/movie/${random_id}/videos?api_key=${api_key}`);
            var utube_id = await trailer_link.json();
            this.utube_id = utube_id;

            // var imbd_id = data.imbd_id
            const imdb_rating_request = await fetch(`http://www.omdbapi.com/?i=${data.imdb_id}&plot=short&r=json&apikey=cf3ed16a
            `);
            var imdb_info= await imdb_rating_request.json();
            console.log(imdb_info);
            this
            // console.log(utube_id.results[0].key);

            })
        .catch((error)=>{
            console.log(error);
            this.getMovie();
        })
    }
}