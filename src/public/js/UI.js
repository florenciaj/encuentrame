export class UI {
    getPets(items) {
        console.log(items)
        for (let i = 0; i < items.length; i++) {    
            document.getElementById('cardContainer').innerHTML += `
                <div class="col">
                    <div class="card">
                        <div class="card-img">
                            <img src="${items[i].photo}" class="card-img-top" alt="">
                        </div>
                        <div class="card-body">
                            <h5 class="card-title">${items[i].name}</h5>
                            <div class="card-text">
                                <p><i class="far fa-calendar mr"></i>${items[i].age} años</p>
                                <p><i class="fas fa-plus-circle mr"></i>${items[i].features}</p>
                                <div class="card-button">
                                    <button class="btn small-btn showModal" data-bs-toggle="modal" data-bs-target="#petInfoModal" id="${items[i]._id}">Ver más</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            `
        }
    }
    
    getPosts(items) {
        items = items.pets
        for (let i = 0; i < items.length; i++) {
            if (items[i].state === 'Perdido')
                showPetsLost('posts', items, i)   
            else 
                showPetsFound('found', items, i)   
        }
    }

    createProfileInfo(user) {
        const date = `${user.date.substring(0, 10)}`
        const profileInfo = document.getElementById('profileInfo')

        profileInfo.innerHTML = `
        <div class="container pt-5 pb-5">
            <div class="row">
                <div class="col col-4 img-side d-flex justify-content-end align-items-center">
                    <img src="${localStorage.getItem('userPhoto')}"
                        class="img-fluid rounded-circle" alt="User photo">
                </div>
                <div class="col col-8 info-side d-flex justify-content-center flex-column">
                    <h5>${user.name}</h5>
                    <p>${user.email}</p>
                    <p>${date}</p>
                </div>
            </div>
        </div>
        `
    }

    createProfileStatistics(e) {
        const user = e.pets
        let lost = 0, found = 0

        for (let i = 0; i < user.length; i++) {
            if (user[i].state === 'Perdido')
                lost += 1
            else
                found += 1
        }

        const profileStatistics = document.getElementById('profileStatistics')
        profileStatistics.innerHTML = `
        <div class="container py-1">
            <div class="row">
                <div class="col col-4">
                    <div class="info">
                        <p class="number">${user.length}</p>
                        <p>Publicaciones</p>
                    </div>
                </div>
                <div class="col col-4">
                    <div class="info">
                        <p class="number">${lost}</p>
                        <p>Perdidas</p>
                    </div>
                </div>
                <div class="col col-4">
                    <div class="info">
                        <p class="number">${found}</p>
                        <p>Encontradas</p>
                    </div>
                </div>
            </div>
        </div>
        `
    }

    showToast(result) {
        if (result)
            this.showSuccessToast(result)
        else
            this.showToastErrorMessage('inténtalo nuevamente')
    }

    createToast() {
        let toastElList = [].slice.call(document.querySelectorAll('.toast'))
        let toastList = toastElList.map(function (toastEl) {
            return new bootstrap.Toast(toastEl)
        });
        toastList.forEach(toast => toast.show());
    }

    showToastErrorMessage(solution) {
        const toastContainer = document.getElementById('toastContainer')

        toastContainer.innerHTML = ` 
        <div class="position-fixed bottom-0 end-0 p-3 toast-wrapper">
            <div id="liveToast" class="toast hide" role="alert" aria-live="assertive" aria-atomic="true">
                <div class="toast-header">
                    <img src="/img/logo.png" alt="Logo">
                    <strong class="me-auto"> Encuéntrame </strong>
                    <strong class="text-danger"> Error </strong>
                    <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close">
                    </button>
                </div>
                <div class="toast-body">
                    <b> Ha ocurrido un error: </b> ${solution}
                </div>
            </div>
        </div>
            `
        this.createToast()
    }

    showSuccessToast(info) {
        const toastContainer = document.getElementById('toastContainer')

        toastContainer.innerHTML = ` 
        <div class="position-fixed bottom-0 end-0 p-3 toast-wrapper">
            <div id="liveToast" class="toast hide" role="alert" aria-live="assertive" aria-atomic="true">
                <div class="toast-header">
                    <img src="/img/logo.png" alt="Logo">
                    <strong class="me-auto"> Encuéntrame </strong>
                    <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close"> </button>
                </div>
                <div class="toast-body">${info}</div>
            </div>
        </div>
        `
        this.createToast()
    }

    showToastGreeting(userName) {
        const toastContainer = document.getElementById('toastContainer')

        toastContainer.innerHTML = ` 
        <div class="position-fixed bottom-0 end-0 p-3 toast-wrapper">
            <div id="liveToast" class="toast hide" role="alert" aria-live="assertive" aria-atomic="true">
                <div class="toast-header">
                    <img src="/img/logo.png" alt="Logo">
                    <strong class="me-auto"> Encuéntrame </strong>
                    <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
                </div>
                <div class="toast-body"><b> ${userName}</b> ¡Qué bueno verte! </div>
            </div>
        </div>
        `
        this.createToast()
    }
}

function showPetsLost(id, items, i) {
    document.getElementById(id).innerHTML += `
        <div class="col">
            <div class="card">
                <div class="card-img">
                    <img src="${items[i].photo}" class="card-img-top" alt="">
                </div>
                <div class="card-body">
                    <h5 class="card-title">${items[i].name}</h5>
                    <div class="card-text">
                        <p><i class="far fa-calendar mr"></i>${items[i].age} años</p>
                        <p><i class="fas fa-plus-circle mr"></i>${items[i].features}</p>
                        <div class="card-button">
                            <a href="/editar-post/${items[i]._id}" class="btn small-btn editBtn">Editar</a>
                            <button type="button" class="btn small-btn deleteBtn" value="${items[i]._id}" data-bs-toggle="modal" data-bs-target="#modal">Borrar</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
                `
}

function showPetsFound(id, items, i) {
    document.getElementById(id).innerHTML += `
        <div class="col">
            <div class="card">
                <div class="card-img">
                    <img src="${items[i].photo}" class="card-img-top" alt="">
                </div>
                <div class="card-body">
                    <h5 class="card-title">${items[i].name}</h5>
                    <div class="card-text">
                        <p><i class="far fa-calendar mr"></i>${items[i].age} años</p>
                        <p><i class="fas fa-plus-circle mr"></i>${items[i].features}</p>
                    </div>
                    <div class="card-button d-flex justify-content-end">
                    <button type="button" class="btn small-btn foundBtn">Encontrado</button>
                </div>
                </div>
            </div>
        </div>
    `
}