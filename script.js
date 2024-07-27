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
                window.open(`movie.html?title=${encodeURIComponent(movie.title)}`, '_blank');
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
