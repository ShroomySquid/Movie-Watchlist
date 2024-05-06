// Defining DOM variables
const searchBar = document.getElementById("search-bar")
const mainBody = document.getElementById("index-body")
const filmInput = document.getElementById("input-search")
// const listreset = []
// localStorage.setItem("watchlistSaved", JSON.stringify(listreset))

const isWatchlistPage = false

// Function that fetch movies that contain the words in the input bar
searchBar && searchBar.addEventListener("submit", async function(e) {
    e.preventDefault();
    let bodyHtml = ""
    const response = await fetch(`https://www.omdbapi.com/?apikey=571a56cd&s=${filmInput.value}&type=Movie`)
    const data0 = await response.json()
    if (!data0.Response) {
        bodyHtml = `
        <p> We didn't find any movie with this search... try again! </p>
        `
    }
    for (let aMovie in data0.Search) {
        let MovieId = data0.Search[aMovie].imdbID
        bodyHtml += await fetchRenderMovieInfo(MovieId)
    }
    mainBody.innerHTML = bodyHtml
    const buttons = document.querySelectorAll("#time-type-watchlist > button")
    buttons && buttons.forEach(button => button.addEventListener("click", () => 
    getMovieToWatchlist(button.getAttribute("id"))))
})

// function that add/remove movie to watchlist. If it's used on the watchlist page,
// it will also remove the movie from the HTML
function getMovieToWatchlist(movieId) {
    let watchlistSaved = JSON.parse(localStorage.getItem("watchlistSaved")) || []
    const iconBtn = document.getElementById(`icon-${movieId}`)
    if (watchlistSaved.includes(movieId)) {
        iconBtn && (iconBtn.innerHTML = `
        <i class="fa-solid fa-circle-plus fa-lg" style="color:black"></i>
        `)
        watchlistSaved.splice(watchlistSaved.indexOf(movieId), 1)
        localStorage.setItem("watchlistSaved", JSON.stringify(watchlistSaved))
    }
    else {
        watchlistSaved.push(movieId)
        localStorage.setItem("watchlistSaved", JSON.stringify(watchlistSaved));
        setHtmlMinus(iconBtn)
    }
}

// function that render the html of a movie
async function fetchRenderMovieInfo(movieId) {
    const res = await fetch(`https://www.omdbapi.com/?apikey=571a56cd&i=${movieId}`)
    const data = await res.json()
    let plusMinus = '<i class="fa-solid fa-circle-plus fa-lg"'
    let watchlistSaved = JSON.parse(localStorage.getItem("watchlistSaved")) || []
    if (watchlistSaved.includes(movieId)) {
        plusMinus = '<i class="fa-solid fa-circle-minus fa-lg"'
    }
        return `
        <div class="info-img">
        ${data.Poster != "N/A" ? `<img id="movie-img" src="${data.Poster}">` 
        : `<img id="movie-img" src="">`}
                <div class="film-info">
                <div id="title-score">
                    <h2 id="movie-title">${data.Title}</h2>
                    <p><span id="star">&#9733 </span>${data.imdbRating}</p>
                </div>
                <div id="time-type-watchlist">
                    <p>${data.Runtime}</p>
                    <p>${data.Genre}</p>
                    <button class="watchlist-btn" id="${data.imdbID}"><span id="icon-${data.imdbID}">
                    ${plusMinus} style="color:black"></i></span> Watchlist</button>
                </div>
                <p id="plot">${data.Plot}</p>
            </div>
        </div>
        <hr>
        `
}

function setHtmlMinus(icon) {
    icon && (icon.innerHTML = `
    <i class="fa-solid fa-circle-minus fa-lg" style="color:black"></i>
    `)
}

export {getMovieToWatchlist, fetchRenderMovieInfo}

// liens utiles:
// https://www.omdbapi.com/
// https://www.figma.com/file/jhFRdFIdHpRxsDznNXtpXw/Movie-Watchlist?node-id=2%3A17