const movies = [
    { title: 'Movie 1', img: 'images/movie-1.png' },
    { title: 'Movie 2', img: 'images/movie-2.png' },
    { title: 'Movie 3', img: 'images/movie-3.png' },
    { title: 'Movie 4', img: 'images/movie-4.png' },
    { title: 'Movie 5', img: 'images/movie-5.png' },
    { title: 'Movie 6', img: 'images/movie-6.png' }
];

document.addEventListener('DOMContentLoaded', () => {
    const watchlist = JSON.parse(localStorage.getItem('watchlist')) || [];
    const watchlistContainer = document.getElementById('watchlist-container');
    const watchlistButtons = document.querySelectorAll('.watchlist-button');
    const searchBox = document.getElementById('search-box');
    const searchResults = document.getElementById('search-results');
    const theme = localStorage.getItem('theme') || 'light';

    const displayWatchlist = () => {
        watchlistContainer.innerHTML = '';
        watchlist.forEach(movieTitle => {
            const movie = movies.find(m => m.title === movieTitle);
            if (movie) {
                const card = document.createElement('div');
                card.classList.add('card');
                card.innerHTML = `
                    <img src="${movie.img}" alt="${movie.title}">
                    <button class="remove-watchlist-button" data-title="${movie.title}">Remove from Watchlist</button>
                `;
                watchlistContainer.appendChild(card);
            }
        });
    };

    watchlistButtons.forEach(button => {
        button.addEventListener('click', () => {
            const movieTitle = button.dataset.title;
            if (!watchlist.includes(movieTitle)) {
                watchlist.push(movieTitle);
                localStorage.setItem('watchlist', JSON.stringify(watchlist));
                displayWatchlist();
            }
        });
    });

    watchlistContainer.addEventListener('click', (event) => {
        if (event.target.classList.contains('remove-watchlist-button')) {
            const movieTitle = event.target.dataset.title;
            const index = watchlist.indexOf(movieTitle);
            if (index !== -1) {
                watchlist.splice(index, 1);
                localStorage.setItem('watchlist', JSON.stringify(watchlist));
                displayWatchlist();
            }
        }
    });

    searchBox.addEventListener('input', () => {
        const query = searchBox.value.toLowerCase();
        searchResults.innerHTML = '';
        if (query) {
            const filteredMovies = movies.filter(movie => movie.title.toLowerCase().includes(query));
            filteredMovies.forEach(movie => {
                const div = document.createElement('div');
                div.textContent = movie.title;
                div.addEventListener('click', () => {
                    window.location.href = `movie.html?title=${encodeURIComponent(movie.title)}`;
                });
                searchResults.appendChild(div);
            });
            searchResults.style.display = 'block';
        } else {
            searchResults.style.display = 'none';
        }
    });

    window.setTheme = (theme) => {
        document.body.className = theme;
        localStorage.setItem('theme', theme);
        if (theme === 'light') {
            document.body.style.color = 'black';
        } else if (theme === 'dark') {
            document.body.style.color = 'white';
        } else {
            document.body.style.color = 'black';
        }
    };

    document.body.className = theme;
    if (theme === 'light') {
        document.body.style.color = 'black';
    } else if (theme === 'dark') {
        document.body.style.color = 'white';
    } else {
        document.body.style.color = 'black';
    }

    displayWatchlist();
});

document.getElementById('netflix-logo').addEventListener('click', () => {
    window.location.href = 'index.html';
});
