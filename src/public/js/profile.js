//TODO: definir user con firebase
let user = '6048c0fe48644c1044231eb4'
const cardContainer = document.getElementById('cardContainer')

window.addEventListener("load", async function(event) {
    await loadDoc('GET', `/api/user/get-pets/${user}`, getPosts)


    setTimeout(() => {
        /* DELETE AND POST BUTTONS */
        let deleteBtns = document.querySelectorAll('.deleteBtn')
        let editBtns = document.querySelectorAll('.editBtn')

        deleteBtns.forEach((deleteBtn) => {
            deleteBtn.addEventListener('click', deletePost)
        })
    }, 3000);
})


function loadDoc(httpMethod, url, cFunction) {
    var xhttp
    xhttp = new XMLHttpRequest()
    xhttp.onreadystatechange = async function() {
        if (this.readyState == 4 && this.status == 200) {
            items = JSON.parse(this.responseText)
            await cFunction(items)
        }
    };
    xhttp.open(httpMethod, url, true)
    xhttp.send()
}

function deletePost(e) {
    console.log('entraste a la función borrar')
    loadDoc('DELETE', `/api/pet/delete-pet/${e.target.value}`, reloadPosts)
}

function reloadPosts() {
    cardContainer.innerHTML = ""
    loadDoc('GET', `/api/user/get-pets/${user}`, getPosts)
}


/* LOAD POSTS */
function getPosts(items) {
    items = items.petFound
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
                                <button type="button" class="btn small-btn editBtn" value="${items[i]._id}">Editar</button>
                                <button type="button" class="btn small-btn deleteBtn" value="${items[i]._id}">Borrar</button>
                            </div>
                        </div>
                    </div>
                </div>
            `
        cardContainer.appendChild(card)
    }
}