import { PetFinder } from './PetFinder.js'

export class UI {

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
                                <a class="btn" id="${pets[i].id}">Ver más</a>
                            </div>
                        </div>
                    </div>
                </div>
            `
            cardContainer.appendChild(card)
        }
    }

    insertIntoModalPetInfo(pet) {
        const petFinder = new PetFinder()
        $('#petInfoModal').modal('show')

        document.getElementById('nameModal').innerHTML = this.capitalizarPrimeraLetra(pet.name)
        document.getElementById('genderModal').innerHTML = this.capitalizarPrimeraLetra(pet.gender)
        document.getElementById('breedModal').innerHTML = `${this.capitalizarPrimeraLetra(pet.breed)} de`
        document.getElementById('ageModal').innerHTML = petFinder.validateAge(pet.age)

        document.getElementById('colourModal').innerHTML = pet.colour
        document.getElementById('featuresModal').innerHTML = this.capitalizarPrimeraLetra(pet.features)

        console.log(typeof(pet.colour))

    }

    capitalizarPrimeraLetra(str) {
        return str.charAt(0).toUpperCase() + str.slice(1);
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
        this.createToast()
    }

    showSuccessToastMessage(message) {
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
                    <b>${message}
                </div>
            </div>
        </div>
        `
        this.createToast()
    }

    showToastErrorMessage(solution) {
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
                    <b>Ha ocurrido un error,</b> ${solution}
                </div>
            </div>
        </div>
        `
        this.createToast()
    }

    createToast() {
        let toastElList = [].slice.call(document.querySelectorAll('.toast'))
        let toastList = toastElList.map(function(toastEl) {
            return new bootstrap.Toast(toastEl)
        });
        toastList.forEach(toast => toast.show());
    }
}