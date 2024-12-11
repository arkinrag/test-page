const apiKey = 'f6f18c676cae5a2f43248f81247dde67';

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

        console.log(data.results)
    }catch (error) {
        console.error("Error fetching dat:", error);
    }
}

function createMovieCard(media) {
    const { title, name, poster_path, id} = media;

    const movieCard = document.createElement("div");
    movieCard.classList.add("movie_item")

    movieCard.innerHTML = `
        <a href="movie.html">
            <img src="https://image.tmdb.org/t/p/w500/${poster_path}" class="movie_img">
        </a>
        <div class = "title">${title || name}</div>
    `;
    return movieCard;
}