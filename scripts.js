// Watch my Movie Database API Project Tutorial video here: https://youtu.be/hOeR3LB9NJY - The Movie Database API Project Tutorial using HTML, CSS, and JavaScript


// Use your own MovieDB API Key below
// Watch my Movie Database API Project Tutorial video here: https://youtu.be/hOeR3LB9NJY to get your own API key for free!

const apiKey = 'f6f18c676cae5a2f43248f81247dde67';
// uncomment above line once you put your own api key above

// EXAMPLE of what API key looks like below: 
// 'c3cf1225c677e4a8152e8957bc30d8edd';
/* const apiUrl = `https://api.themoviedb.org/3/trending/all/day?api_key=${apiKey}`; */
/* const moviesContainer = document.getElementById("movies"); */


export async function fetchMovies(input,containerId) {
    console.log(input, containerId)
    const apiUrl = `https://api.themoviedb.org/3/trending/all/${input}?api_key=${apiKey}`;
    
    try {
        const response = await fetch(apiUrl);
        const data = await response.json();

        // dynamic set up
        const targetContainer = document.getElementById(containerId);
        
        if(!targetContainer){
            console.error(`Container with id "${containerId}" not found.`);
        }

        //clear existing container contents
        targetContainer.innerHTML = '';

        data.results.slice(0,4).forEach(media => {
            const movieCard = createMovieCard(media);
            targetContainer.appendChild(movieCard);
        });
    }catch (error) {
        console.error("Error fetching dat:", error);
    }
}

function createMovieCard(media) {
    const { title, name, poster_path } = media;

    const movieCard = document.createElement("div");
    movieCard.classList.add("movie_item")

    movieCard.innerHTML = `
        <img src="https://image.tmdb.org/t/p/w500/${poster_path}" class="movie_img">
        <div class = "title">${title || name}</div>
    `;
    return movieCard;
}