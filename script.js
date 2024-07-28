const movies = [
    { title: 'Movie 1', img: 'images/movie-1.png' },
    { title: 'Movie 2', img: 'images/movie-2.png' },
    { title: 'Movie 3', img: 'images/movie-3.png' },
    { title: 'Movie 4', img: 'images/movie-4.png' },
    { title: 'Movie 5', img: 'images/movie-5.png' },
    { title: 'Movie 6', img: 'images/movie-6.png' },
];

document.getElementById('search-box').addEventListener('input', function() {
    const query = this.value.toLowerCase();
    const results = movies.filter(movie => movie.title.toLowerCase().includes(query));
    
    const searchResultsContainer = document.getElementById('search-results');
    searchResultsContainer.innerHTML = '';

    if (results.length > 0) {
        results.forEach(movie => {
            const div = document.createElement('div');
            div.textContent = movie.title;
            div.addEventListener('click', () => {
                window.location.href = `movie.html?title=${encodeURIComponent(movie.title)}`;
            });
            searchResultsContainer.appendChild(div);
        });
        searchResultsContainer.style.display = 'block';
    } else {
        searchResultsContainer.style.display = 'none';
    }
});

document.addEventListener('click', function(event) {
    const searchBox = document.getElementById('search-box');
    const searchResults = document.getElementById('search-results');
    
    if (!searchBox.contains(event.target) && !searchResults.contains(event.target)) {
        searchResults.style.display = 'none';
    }
});

// Watchlist Functionality
document.querySelectorAll('.watchlist-button').forEach(button => {
    button.addEventListener('click', function() {
        const movieTitle = this.parentElement.getAttribute('data-title');
        addToWatchlist(movieTitle);
    });
});

function addToWatchlist(movieTitle) {
    const watchlist = document.getElementById('watchlist');
    const movie = movies.find(m => m.title === movieTitle);
    
    if (movie && !isInWatchlist(movieTitle)) {
        const card = document.createElement('div');
        card.classList.add('card');
        
        const img = document.createElement('img');
        img.src = movie.img;
        img.alt = movie.title;

        const title = document.createElement('h3');
        title.textContent = movie.title;

        const button = document.createElement('button');
        button.textContent = 'Remove from Watchlist';
        button.classList.add('watchlist-button');
        button.addEventListener('click', () => removeFromWatchlist(movieTitle));

        card.appendChild(img);
        card.appendChild(title);
        card.appendChild(button);

        watchlist.appendChild(card);
    }
}

function removeFromWatchlist(movieTitle) {
    const watchlist = document.getElementById('watchlist');
    const cards = watchlist.querySelectorAll('.card');
    cards.forEach(card => {
        if (card.querySelector('h3').textContent === movieTitle) {
            card.remove();
        }
    });
}

function isInWatchlist(movieTitle) {
    const watchlist = document.getElementById('watchlist');
    const cards = watchlist.querySelectorAll('.card');
    for (const card of cards) {
        if (card.querySelector('h3').textContent === movieTitle) {
            return true;
        }
    }
    return false;
}

// Add click event to navigate to movie details page
document.querySelectorAll('.card').forEach(card => {
    card.addEventListener('click', function(event) {
        if (event.target.tagName !== 'BUTTON') {
            const movieTitle = this.getAttribute('data-title');
            window.location.href = `movie.html?title=${encodeURIComponent(movieTitle)}`;
        }
    });
});
