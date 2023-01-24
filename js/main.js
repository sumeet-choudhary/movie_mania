$(document).ready(() => {
  $('#searchForm').on('submit', (e) => {
    let searchText = $('#searchText').val();
    getMovies(searchText);
    e.preventDefault();
  });
});

function getMovies(searchText){
  axios.get("http://www.omdbapi.com/?s=" +searchText+ "&apikey=thewdb")
    .then((response) => {
      console.log(response);
      let movies = response.data.Search;
      let output = '';
      $.each(movies, (index, movie) => {
        output += `     
          <div class="col-md-3">
            <div class="well text-center">
              <div class="container" style="background: #222; border: 1px solid #2A9FD6; padding: 10px; border-radius: 5px;"> 
	              <img src="${movie.Poster}">
	              <h5 style="font-size: 1.3rem; padding-top: 7px;">${movie.Title}</h5>
	              <a onclick="movieSelected('${movie.imdbID}')" class="btn btn-primary" href="#">More Info <i class="fas fa-chevron-right"></i></a> 
              </div>
            </div>
          </div>
        `;
      });

      $('#movies').html(output);
      $(document).ready(function() {
      $(".down").click(function() {
           $('html, body').animate({
               scrollTop: $(".up").offset().top
           }, 1500);
       });
      });
    })

    // $(document).ready(checkContainer);

    // function checkContainer () {
    //   if($('.loaded').is(':visible')){ //if the container is visible on the page
    //   	$(".down").click(function() {
    //   	           $('html, body').animate({
    //   	               scrollTop: $(".up").offset().top
    //   	           }, 1500);
    //   	       });
    //   } else {
    //     setTimeout(checkContainer, 50); //wait 50 ms, then try again
    //   }
    // };


    .catch((err) => {
      console.log(err);
    });
}
function movieSelected(id){
  sessionStorage.setItem('movieId', id);
  window.location = 'movie.html';
  return false;
}

function getMovie(){
  let movieId = sessionStorage.getItem('movieId');

  axios.get("http://www.omdbapi.com/?i=" + movieId + "&apikey=thewdb&plot=full")
    .then((response) => {
      console.log(response);
      let movie = response.data;

      let output =`
        <div class="row">
          <div class="col-md-4">
            <img src="${movie.Poster}" class="thumbnail" style="border: 2px solid #2A9FD6; border-radius: 5px;">
          </div>
          <div class="col-md-8">
            <h2>${movie.Title}</h2>
            <ul class="list-group">
              <li class="list-group-item"><strong>Genre : </strong> ${movie.Genre}</li>
              <li class="list-group-item"><strong>Released : </strong> ${movie.Released}</li>
              <li class="list-group-item"><strong>Rated : </strong> ${movie.Rated}</li>
              <li class="list-group-item"><strong>Type : </strong> ${movie.Type}</li>
              <li class="list-group-item"><strong>IMDB Rating : </strong> ${movie.imdbRating} <i class="fas fa-star"></i></li>
              <li class="list-group-item"><strong>Director : </strong> ${movie.Director}</li>
              <li class="list-group-item"><strong>Writer : </strong> ${movie.Writer}</li>
              <li class="list-group-item"><strong>Actors : </strong> ${movie.Actors}</li>
            </ul>
          </div>
        </div>
        <div class="row">
          <div class="well" style= "margin-top: 15px; margin-bottom: 30px;">
            <h4>Plot</h4>
            ${movie.Plot}
            <hr>
            <a href="http://imdb.com/title/${movie.imdbID}" target="_blank" class="btn btn-primary">View on IMDB</a>
            <a href="index.html" class="btn btn-success">Search Again <i class="fas fa-search"></i></a>
          </div>
        </div>
      `;

      $('#movie').html(output);
    })
    .catch((err) => {
      console.log(err);
    });
}