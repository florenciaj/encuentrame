window.addEventListener("load", function(event) {
    loadDoc("http://localhost:5500/api/pet", getPets);
})

function loadDoc(url, cFunction) {
    var xhttp;
    xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            items = JSON.parse(this.responseText);

            cFunction(items);
        }
    };
    xhttp.open("GET", url, true);
    xhttp.send();
}


function getPets(items) {
    const cardContainer = document.getElementById('cardContainer')
    for (let i = 0; i < items.length; i++) {
        const card = document.createElement('div')
        card.classList.add('col')
        card.innerHTML += `
            <div class="card">
                <div class="card-img">
                    <img src="/img/upload/${items[i].photo}" class="card-img-top" alt="">
                </div>
                <div class="card-body">
                    <h5 class="card-title">${items[i].name}</h5>
                    <div class="card-text">
                        <p><i class="far fa-calendar mr"></i>${items[i].age} años</p>
                        <p><i class="fas fa-plus-circle mr"></i>${items[i].features}</p>
                        <div class="card-button">
                            <button class="btn small-btn showModal" data-bs-toggle="modal" data-bs-target="#petInfoModal" id="${items[i].id}">Ver más</button>
                        </div>
                    </div>
                </div>
            </div>
        `
        cardContainer.appendChild(card)
    }
}