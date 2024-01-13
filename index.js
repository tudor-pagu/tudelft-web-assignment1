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
    let searchText = encodeURIComponent(getSearchText())
    console.log(searchText)
    let apiUrl = `https://www.omdbapi.com/?apikey=${APIKEY}&s=${searchText}`
    console.log(apiUrl)
    fetch(apiUrl).then((response) => {
        return response.json()
    }).then(data => {
        let search = data["Search"]
        if (search === undefined) {
            movieContainer.textContent = ""
            let element = document.createElement('h1')
            element.textContent = "No movies found"
            movieContainer.appendChild(element)
        } else {
            movieContainer.textContent = ""
            search.forEach(result => {
                movieContainer.appendChild(movieElementFactory(result["Poster"], result["Title"]))
            })
        }
    })
})

