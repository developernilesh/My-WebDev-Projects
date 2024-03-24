const URL = "https://newsapi.org/v2/everything?q=";
const API_KEY = "48dc65708fb844fa962374ae9991338e";

const newsInput = document.querySelector("#search-text")
const cardsContainer = document.querySelector("#cards-container");
const newsCardTemplate = document.querySelector("#template-news-card");
const searchBtn = document.querySelector("#search-button");
const loaderContainer = document.querySelector(".loader-container");
const icon = document.querySelector("#set-theme");
const hamburgerIcon = document.querySelector(".hamburger-icon")
const hamCrossIcon = document.querySelector(".ham-cross-icon")



// Pick yesterday's date
let yesterday = new Date();
yesterday.setDate(yesterday.getDate() - 1);

// get date in yyyy-mm-dd format
function getFormattedDate(dt){
    let dd = dt.getDate();
    let mm = dt.getMonth() + 1;
    let yyyy = dt.getFullYear();
    if (dd < 10) {
        dd = '0' + dd;
    }
    if (mm < 10) {
        mm = '0' + mm;
    }
    return (yyyy + '-' + mm + '-' + dd);
}

// Get yesterday's date
let yesterDate = getFormattedDate(yesterday);
console.log(yesterDate);



window.addEventListener('load', ()=> fetchNews("India"))

function reloadNews(){
    window.location.reload()
}

async function fetchNews(query){
    cardsContainer.innerHTML = "";
    loaderContainer.classList.remove("hide");
    let url = `${URL}${query}&from=${yesterDate}&to=${yesterDate}&sortBy=popularity&apiKey=${API_KEY}`
    console.log(url)
    const response = await fetch(url)
    const data = await response.json();
    if(data){
        loaderContainer.classList.add("hide")
    }

    getData(data.articles)
}

function getData(articles){
    articles.forEach(article => {
        if(!article.urlToImage || !article.description || (!article.urlToImage && !article.description)){
            return;
        }
        else {
            try {
                let content = newsCardTemplate.content.cloneNode(true);

                let image = content.querySelector('#news-img');
                image.src = `${article.urlToImage}`

                let newsTitle = content.querySelector("#news-title")
                newsTitle.innerText = `${article.title}`

                let date = new Date(article.publishedAt).toLocaleString("en-US",{
                    timeZone: "Asia/Jakarta",
                })
                let newsSrc = content.querySelector("#news-source")
                newsSrc.innerHTML = `${article.source.name} - ${date}`

                let newsDesc = content.querySelector("#news-desc")
                let descNews = article.description
                
                if(descNews.length < 120){
                    newsDesc.innerText = `${descNews}`
                }
                else{
                    newsDesc.innerText = `${descNews.substring(0,120)}...`
                }

                content.firstElementChild.addEventListener("click", () => {
                    window.open(article.url, "_blank")
                })

                cardsContainer.appendChild(content);
            } 
            catch (error) {
                throw error;
            }
        }
    });
}

let currentSelectedNav = null
function onNavItemClick(topic){
    fetchNews(topic)
    const navItem = document.getElementById(topic)
    if(currentSelectedNav !== null){
        currentSelectedNav.classList.remove("active")
    }
    currentSelectedNav = navItem;
    currentSelectedNav.classList.add("active")
}


searchBtn.addEventListener("click", () => {
    searchNews();
})

newsInput.addEventListener("keydown", (event)=>{
    if (event.key === "Enter") {
        searchNews();
    }
})

function searchNews(){
    let searchFor = newsInput.value;
    if(!searchFor) return;
    fetchNews(`${searchFor}`)
    if(currentSelectedNav !== null){
        currentSelectedNav.classList.remove("active")
    }
    currentSelectedNav = null;
}

icon.addEventListener("click", () => {
    icon.style.transform = "scale(0.8)";
    // After a short delay, revert the scale to 1
    setTimeout(() => {
        icon.style.transform = "scale(1)";
    }, 100);
    
    document.body.classList.toggle("dark-theme");
    if(document.body.classList.contains("dark-theme")){
        icon.src = "./sun.png";
    }
    else{
        icon.src = "./moon.png";
    }
})

hamburgerIcon.addEventListener("click",() => {
    document.querySelector(".hamburger").style.right = "0px"
    document.querySelector(".hamburger").style.display = "block"
})
hamCrossIcon.addEventListener("click",() => {
    document.querySelector(".hamburger").style.right = "-160px"
    // document.querySelector(".hamburger").style.display = "block"
})