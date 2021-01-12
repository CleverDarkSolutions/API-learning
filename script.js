let randomCat = document.getElementById("btn1");
let queryCat = document.getElementById("btn2");
let categoryCat = document.getElementById("btn3");
let key = "?api_key=16337aa8-2f18-48c4-8633-4a10f3d61ce1";

let headers = new Headers();

headers.append('x-api-key', key);

queryCat.addEventListener("click", fetchBreeds);
randomCat.addEventListener("click", fetchPics);
categoryCat.addEventListener("click",fetchCategories);
//--------------------------------------------------------------------------------------------------------
let textWrapper = document.querySelector('.movingLetters .letters');
textWrapper.innerHTML = textWrapper.textContent.replace(/\S/g, "<span class='letter'>$&</span>");

anime.timeline({ loop: true })
    .add({
        targets: '.movingLetters .letter',
        translateY: ["1.1em", 0],
        translateZ: 0,
        duration: 750,
        delay: (el, i) => 50 * i
    }).add({
        targets: '.movingLetters',
        opacity: 0,
        duration: 1000,
        easing: "easeOutExpo",
        delay: 1000
    });
//----------------------------------------------------------------------------------------------------------

function fetchPics() {
    document.getElementById("catsImgDiv").innerHTML = "";
    document.getElementById("tableForCats").innerHTML = "";
    fetch("https://api.thecatapi.com/v1/images/search", {
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

function fetchBreeds() {
    document.getElementById("catsImgDiv").innerHTML = "";
    document.getElementById("tableForCats").innerHTML = "";
    let breedValue = document.getElementById("breed").value;
    let def = "https://api.thecatapi.com/v1/breeds/search?q=";
    let query = def + breedValue;
    console.log(query);
    fetch(query, {
        method: 'GET',
        headers: headers
    })
        .then(response => response.json())
        .then((data) => {
            let i = 0;

            let table = document.createElement("table");
            table.setAttribute('class', 'table');
            table.setAttribute('class', 'table-hover');
            table.setAttribute('id', 'table1');
            let thead = document.createElement("thead");
            table.append(thead);
            let tr = document.createElement("tr");
            thead.append(tr)

            for (let i = 1; i < 7; i++) {
                let th = document.createElement("th");
                th.setAttribute('class', 'col' + i);
                th.setAttribute('scope', 'col');
                tr.append(th);
            }

            document.querySelector(".tableForCats").append(table);

            let col1 = document.querySelector(".col1");
            let col2 = document.querySelector(".col2");
            let col3 = document.querySelector(".col3");
            let col4 = document.querySelector(".col4");
            let col5 = document.querySelector(".col5");
            let col6 = document.querySelector(".col6");

            col1.innerHTML = "#";
            col2.innerHTML = "Name";
            col3.innerHTML = "Origin";
            col4.innerHTML = "Lifespan";
            col5.innerHTML = "Temperament";
            col6.innerHTML = "Description";

            let tbody = document.createElement("tbody");
            table.append(tbody);

            while (true) {
                let tr = document.createElement("tr");
                tbody.append(tr);
                let th = document.createElement("th");
                th.innerHTML = i + 1;
                th.setAttribute('scope', 'row');
                tr.append(th);

                for (let j = 1; j < 6; j++) {
                    let td = document.createElement('td');
                    td.setAttribute('class', 'col' + j);
                    tr.append(td);

                    if (j == 1)
                        td.innerHTML = data[i].name;
                    if (j == 2)
                        td.innerHTML = data[i].origin;
                    if (j == 3)
                        td.innerHTML = data[i].life_span;
                    if (j == 4)
                        td.innerHTML = data[i].temperament;
                    if (j == 5)
                        td.innerHTML = data[i].description;

                }

                console.log(data);
                console.log(data.length);
                i++;
                if (i >= data.length)
                    break;
            }

        })
        .catch(err => console.log(err))
}

function fetchCategories() {
    document.getElementById("catsImgDiv").innerHTML = "";
    document.getElementById("tableForCats").innerHTML = "";
    let categoryValue = document.getElementById("category").value;
    let def = "https://api.thecatapi.com/v1/images/search?category_ids=";
    let query = def + categoryValue;
    console.log(query);

    fetch(query, {
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