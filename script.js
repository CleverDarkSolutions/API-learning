let randomCat = document.getElementById("btn1");
let queryCat = document.getElementById("btn2");
let key = "?api_key=16337aa8-2f18-48c4-8633-4a10f3d61ce1";

let headers = new Headers();

headers.append('x-api-key', key);

randomCat.addEventListener("click", fetchPics);
queryCat.addEventListener("click",fetchBreeds);

function fetchPics() {
    document.getElementById("catsImgDiv").innerHTML = "";
    fetch("https://api.thecatapi.com/v1/images/search",{
        method: 'GET',
        headers: headers
    })
        .then(response => response.json())
        .then((data) => {
            
            let catsImgUrl = data[0].url;
            let catsImgEl = document.createElement("img");
            catsImgEl.setAttribute('src', `${catsImgUrl}`)

            let catsImgDiv = document.querySelector(".catsImgDiv");
            catsImgDiv.appendChild(catsImgEl);
            
            console.log(data);
        })
        .catch(err => console.log(err))
}

function fetchBreeds(){
    document.getElementById("catsImgDiv").innerHTML = "";
    let breedValue = document.getElementById("breed").value;
    let def = "https://api.thecatapi.com/v1/breeds/search?q=";
    let query = def + breedValue;
    console.log(query);
    fetch(query,{
        method: 'GET',
        headers: headers
    })
        .then(response => response.json())
        .then((data) => {
           
            for(var i=0;i<100;i++){
            let propName = document.createElement("div");
            propName.innerHTML = "<b>Name: "+data[i].name+"</b>";
            catsImgDiv.appendChild(propName);

            let prop2Div = document.createElement("div");
            prop2Div.innerHTML = "Origin: "+data[i].origin;
            catsImgDiv.appendChild(prop2Div);

            let prop3Div = document.createElement("div");
            prop3Div.innerHTML = "Lifespan: "+data[i].life_span;
            catsImgDiv.appendChild(prop3Div);

            let prop1Div = document.createElement("div");
            prop1Div.innerHTML = "Temperament: "+data[i].temperament;
            catsImgDiv.appendChild(prop1Div);

            let prop4Div = document.createElement("div");
            prop4Div.innerHTML = "Description: "+data[i].description;
            catsImgDiv.appendChild(prop4Div);

            
            console.log(data);
            }
            
        })
        .catch(err => console.log(err))
}

function fetchCategories(){
    document.getElementById("catsImgDiv").innerHTML = "";
    let categoryValue = document.getElementById("category").value;
    let def = "https://api.thecatapi.com/v1/images/search?category_ids=";
    let query = def + categoryValue;
    console.log(query);

    fetch(query,{
        method: 'GET',
        headers: headers
    })
        .then(response => response.json())
        .then((data) => {
           

            
            console.log(data);
            
        })
        .catch(err => console.log(err))
}