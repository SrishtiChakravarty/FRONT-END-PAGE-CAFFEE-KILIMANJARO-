const API_URL="http://www.omdbapi.com/?i=tt3896198&apikey=226085ec&s=";
const API_URL_SEARCH="http://www.omdbapi.com/?apikey=226085ec&i=";

var search_input = document.getElementById("search_input");
var card = document.getElementsByClassName("movie_cards")[0];

document.getElementsByClassName("search")[0].addEventListener("click",function(){
    const query = search_input.value;
    if(query){
        getMovies(API_URL+query);
    }
});

async function getMovies(url){
    const resp = await fetch(url);
    const respData = await resp.json();
    showMovies(respData.Search);
}

function showMovies(movies){
    card.innerHTML="";
    movies.forEach(async function(movie){
        const movieData = await fetch(API_URL_SEARCH+movie.imdbID);
        const movieDataobj = await movieData.json();
        movie_display(movieDataobj);
    })
}

function movie_display(imovie){
    const movieEle = document.createElement("div");
    movieEle.classList.add("movie_card");
    movieEle.innerHTML=`
        <div class ="card">
            <img src = "${imovie.Poster}" alt = "Poster" width="300px" height ="300px"/>
            <br>
            <div class="movie_description">
                <span class="movie_title"><p class="bold">Title</p><span class="value">${imovie.Title}</span></span>
                <span class="movie_title"><b>Rating</b><span class="value">${imovie.imdbRating}</span></span>
                <span class="movie_title"><b>Director</b><span class="value">${imovie.Director}</span></span>
                <span class="movie_title"><b>Released Date</b><span class="value">${imovie.Released}</span></span>
                <span class="movie_title"><b>Genre</b><span class="value">${imovie.Genre}</span></span>
            </div>
        </div>
    `;
    card.appendChild(movieEle);
}