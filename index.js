const fetchData = async (searhTerm) => {
    const response = await axios.get('http://www.omdbapi.com/', {
        params: {
            apikey: 'a6e9cace',
            s: searhTerm
        }

        
    });
    
    if(response.data.Error) {
        return [];
    }

    return response.data.Search
};

const root = document.querySelector('.autocomplete')

root.innerHTML = `
    <label><b>Search For a Movie</b></label>
    <input class="input" />
    <div class="dropdown">
        <div class="dropdown-menu">
            <div class="dropdown-content results"></div>
        </div>
    </div>
`;

const input = document.querySelector('input');
const dropdown = document.querySelector('.dropdown');
const resultsWrapper = document.querySelector('.results');

const onInput = async event => {
    const movies = await fetchData(event.target.value);

    resultsWrapper.innerHTML = '';
    dropdown.classList.add('is-active');
    for (let movie of movies) {
        const item = document.createElement('a');

        const imgSrc = movie.Poster === 'N/A' ? 'img/no_image_available.gif' : movie.Poster

        item.classList.add('dropdown-item');
        item.innerHTML = `<img src="${imgSrc}" />${movie.Title}`;

        resultsWrapper.appendChild(item);
    }
};

input.addEventListener('input', debounce(onInput));

document.addEventListener('click', (event) => {
    if (!root.contains(event.target)) {
        dropdown.classList.remove('is-active');
    }
});