let APIKEY = "baef875c";
let searchForm = document.getElementsByClassName("search-box-wrapper")[0]
let searchInput = document.getElementById("search-input")
let movieContainer = document.getElementsByClassName("movie-container")[0]

function getSearchText() {
    return searchInput.value;
}

function movieElementFactory(picture, title) {
    let movieWrapper = document.createElement("div")
    movieWrapper.classList.add("movie-wrapper")

    let moviePicture = document.createElement("img")
    moviePicture.classList.add("movie-picture")
    moviePicture.src = picture

    let movieName = document.createElement("div")
    movieName.classList.add("movie-name")
    movieName.textContent = title

    let movieButton = document.createElement("button")
    movieButton.classList.add("movie-button")
    movieButton.textContent = "Add to list"
    
    movieWrapper.appendChild(moviePicture)
    movieWrapper.appendChild(movieName)
    movieWrapper.appendChild(movieButton)
    return movieWrapper;
}
searchForm.addEventListener("submit", (e) => {
    e.preventDefault()
    let searchText = getSearchText()
    console.log(searchText)
    let apiUrl = encodeURI(`http://www.omdbapi.com/?apikey=${APIKEY}&s=${searchText}`)
    fetch(apiUrl).then((response) => {
        return response.json()
    }).then(data => {
        let search = data["Search"]
        movieContainer.textContent = ""
        search.forEach(result => {
            movieContainer.appendChild(movieElementFactory(result["Poster"], result["Title"]))
        })
    })
})
console.log(searchButton)

