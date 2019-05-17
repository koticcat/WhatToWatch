import { $ } from '../jquery_init.js';
import { elements } from './base.js';

export const RenderResults = (movie_obj)=>{
    if(movie_obj.data.poster_path!==null){
        const poster_path = "https://image.tmdb.org/t/p/w200"+movie_obj.data.poster_path;
        $(elements.poster_container).attr('src',poster_path);
    }
    else
    {
        console.log('no poster found');
        $(elements.poster_container).attr('src','img/noposter.png');        

    }
    $(elements.title).html(movie_obj.data.original_title);
    $(elements.desc).html(movie_obj.data.overview);
    $(elements.director).html(movie_obj.imdb_info.Director);
    $(elements.rel_date).html(movie_obj.imdb_info.Released);
    $(elements.imdb_rating).html(movie_obj.imdb_info.imdbRating);
    $(elements.imdb_link).css('display','block')
    var imdb_path = "https://www.imdb.com/title/"+movie_obj.data.imdb_id
    $(elements.imdb_link).attr("href",imdb_path);
    if(movie_obj.trailer_status==='No trailers found')
    {
        $(elements.trailer_link).html('No Trailer Found!');
    }
    else
    {
        $(elements.trailer_link).html('Click Here');
        var trailer_path = "https://www.youtube.com/watch?v="+movie_obj.utube_link.results[0].key;
        $(elements.trailer_link).attr("href",trailer_path);
    }

}