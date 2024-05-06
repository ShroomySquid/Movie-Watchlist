import {getMovieToWatchlist, fetchRenderMovieInfo} from "./index.js"

// defining DOM variables
const watchlistBody = document.getElementById("watchlist-body")
let watchlistSaved = JSON.parse(localStorage.getItem("watchlistSaved")) || []
const isWatchlistPage = true

// function that render the watchList html
async function renderWatchlistHtml() {
    if (watchlistSaved.length > 0) {
        watchlistBody.innerHTML = ""
        for (let movies in watchlistSaved) {
            watchlistBody.innerHTML += await fetchRenderMovieInfo(watchlistSaved[movies])
            console.log("hello2")

            const buttons = document.querySelectorAll("#time-type-watchlist > button")
            buttons && buttons.forEach(button => button.addEventListener("click", () => 
            getMovieToWatchlist(button.getAttribute("id"))))
            buttons && buttons.forEach(button => button.addEventListener("click", () => 
            getRidHtmlWatchlist()))

        }
    }
}

function getRidHtmlWatchlist() {
    if (watchlistSaved.length > 1) {
        watchlistSaved = JSON.parse(localStorage.getItem("watchlistSaved")) || []
        console.log("hello")
        renderWatchlistHtml()
    }
    else {
        watchlistBody.innerHTML = `
        <i class="fa-solid fa-film"></i>
        <p id="explore">There is no movie in the watchlist!</p>
        `
    }
}

renderWatchlistHtml()
