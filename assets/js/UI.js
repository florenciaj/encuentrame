export class UI {
    addUser(newUser) {
        const userInfoContainer = document.getElementById('userInfoContainer')
        const userInfo = document.createElement('div')
        userInfo.innerHTML = `
        <p>${newUser.idUser}</p>
        <h1>${newUser.name}</h1>
        <p>${newUser.surname}</p>
        <p>${newUser.number}</p>
        <p>${newUser.email}</p>
        <p>${newUser.password}</p>
        `

        userInfoContainer.appendChild(userInfo)
    }

    addMessageUserAlredyExists(newUser) {
        const message = document.getElementById('errorMessage')
        message.innerHTML = `
        * Ya existe un usuario con el correo <b>${newUser.email}</b>
        `
    }

    createCards(pets) {
        const cardContainer = document.getElementById('cardContainer')
        for (let i = 0; i < pets.length; i++) {
            const card = document.createElement('div')
            card.classList.add('col')
            card.innerHTML += `
                <div class="card">
                    <div class="card-img">
                        <img src="assets/img/${pets[i].photo}" class="card-img-top" alt="...">
                    </div>
                    <div class="card-body">
                        <h5 class="card-title">${pets[i].name}</h5>
                        <div class="card-text">
                            <p><i class="far fa-calendar mr"></i>${pets[i].age} años</p>
                            <p><i class="fas fa-plus-circle mr"></i>${pets[i].features}</p>
                            <div class="card-button">
                                <a class="btn" href="">Ver más</a>
                            </div>
                        </div>
                    </div>
                </div>
            `
            cardContainer.appendChild(card)
        }
    }

    showToastMessage(userName) {
        const toastContainer = document.getElementById('toastContainer')

        toastContainer.innerHTML = `
        <div class="position-fixed bottom-0 end-0 p-3 toast-wrapper">
            <div id="liveToast" class="toast hide" role="alert" aria-live="assertive" aria-atomic="true">
                <div class="toast-header">
                    <img src="assets/img/logo.png" alt="Encuéntrame logo">
                    <strong class="me-auto">Encuéntrame</strong>
                    <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
                </div>
                <div class="toast-body">
                    <b>${userName}</b> ¡Qué bueno verte!
                </div>
            </div>
        </div>
        `
    }

    showToastErrorMessage() {
        const toastContainer = document.getElementById('toastContainer')

        toastContainer.innerHTML = `
        <div class="position-fixed bottom-0 end-0 p-3 toast-wrapper">
            <div id="liveToast" class="toast hide" role="alert" aria-live="assertive" aria-atomic="true">
                <div class="toast-header">
                    <img src="assets/img/logo.png" alt="Encuéntrame logo">
                    <strong class="me-auto">Encuéntrame</strong>
                    <strong class="text-danger">Error</strong>
                    <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
                </div>
                <div class="toast-body">
                    <b>Ha ocurrido un error,</b> inténtalo nuevamente
                </div>
            </div>
        </div>
        `
    }

}