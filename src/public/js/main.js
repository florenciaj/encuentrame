import { UI } from './UI.js';
const ui = new UI()

var userId
const validInputs = {
    textarea: false,
    userEmail: false,
    userName: false
}

window.addEventListener("load",  () => {
    /* LOAD ALL PETS */
    fetch(`http://localhost:5500/api/pet`, getOptionsToGet())
        .then(res => {
            return res.json()
        })
        .then(data => {
            ui.getPets(data.pets)
        })
        .then(() => {
            document.querySelectorAll('.showModal').forEach(function (el) {
                el.addEventListener('click', async function (e) {
                    let petId = e.target.id

                    /* LOAD A PET INFO */
                    await fetch(`http://localhost:5500/api/pet/${petId}`, getOptionsToGet())
                        .then(res => {
                            return res.json()
                        })
                        .then(data => {
                            insertIntoModalPetInfo(data.petFound)
                        })
                        .then(() => {
                            $('#petInfoModal').modal('show')
                        })

                    /* LOAD A PET LOSS */
                    await fetch(`http://localhost:5500/api/loss/${petId}`, getOptionsToGet())
                        .then(res => {
                            return res.json()
                        })
                        .then(data => {
                            insertIntoModalLoosInfo(data.lossFound)
                        })
                })
            });
        })
        .then(() => {
            // fetch(`http://localhost:5500/api/loss/${petId}`, options)
        })
        .catch(err => {
            console.error(err)
        })

    document.getElementById('contact-tab').addEventListener('click', () => {
        loadDoc('GET', `http://localhost:5500/api/user/${userId}`, insertIntoModalUserInfo)
    })
})

/* FORM VALIDATION */
const textarea = document.getElementById('textarea')
textarea.addEventListener('keyup', textareaValidation)

const form = document.getElementById('sendMessage')
form.addEventListener('submit', e => {
    e.preventDefault()

    textareaValidation(textarea)
    validateSenderInfo('userEmail')
    validateSenderInfo('userName')

    if(validInputs.textarea && validInputs.userEmail && validInputs.userName)
        sendEmail()
})

function sendEmail() {
    let data = {
        email_user: localStorage.getItem('userEmail'),
        email_owner: document.getElementById('emailModal').name,
        name: localStorage.getItem('userName'),
        message: document.getElementById('textarea').value
    }
    fetch(`http://localhost:5500/api/send-email`, getOptionsToPost(data))
        .then((res) => {
            $('#petInfoModal').modal('hide')
            ui.showSuccessToast('Se ha enviado el comentario al dueño')
        })
        .catch((err) => {
            $('#petInfoModal').modal('hide')
            ui.showToastErrorMessage('No se ha podido enviar el mensaje. Inténtelo más tarde')
        })
}

function validateSenderInfo(data) {
    try {
        localStorage.getItem(data)
    }
    catch (e) {
        document.querySelector('.formErrors.inputError').classList.add('inputError-active')
        validInputs[data] = false
    }

    let dataGiven = localStorage.getItem(data)
    if (dataGiven == 'undefined' || dataGiven == null){
        document.querySelector('.formErrors.inputError').classList.add('inputError-active')
        validInputs[data] = false
    }
    else
        validInputs[data] = true 
}

/* VALIDATION */

function textareaValidation(e) {
    let textarea = e

    if (e.target)
        textarea = e.target

    if (textarea.value) {
        if (textarea.value.length > 0 && textarea.value.length <= 2000)
            return validInput(textarea)
        invalidInput(textarea)
    } else
        invalidInput(textarea)
}

function invalidInput(input) {
    document.getElementById(`${input.name}Group`).classList.add('error')
    document.getElementById(`${input.name}Group`).classList.remove('success')
    document.querySelector(`#${input.name}Group i`).classList.remove('fa-check-circle')
    document.querySelector(`#${input.name}Group i`).classList.add('fa-times-circle')
    document.querySelector(`#${input.name}Group .inputError`).classList.add('inputError-active')
    validInputs[input.name] = false
}

function validInput(input) {
    document.getElementById(`${input.name}Group`).classList.remove('error')
    document.getElementById(`${input.name}Group`).classList.add('success')
    document.querySelector(`#${input.name}Group i`).classList.add('fa-check-circle')
    document.querySelector(`#${input.name}Group i`).classList.remove('fa-times-circle')
    document.querySelector(`#${input.name}Group .inputError`).classList.remove('inputError-active')
    validInputs[input.name] = true
}

/* MODAL INFO */
function insertIntoModalPetInfo(pet) {
    userId = pet.firebase_id
    document.getElementById('nameModal').innerHTML = capitalizeFirstLetter(pet.name)
    document.getElementById('genderModal').innerHTML = capitalizeFirstLetter(pet.gender)
    document.getElementById('breedModal').innerHTML = `${capitalizeFirstLetter(pet.breed)} de`
    document.getElementById('ageModal').innerHTML = validateAge(pet.age)

    document.getElementById('colourModal').innerHTML = pet.colour
    document.getElementById('featuresModal').innerHTML = capitalizeFirstLetter(pet.features)
    document.getElementById('photoModal').src = pet.photo
}

function insertIntoModalLoosInfo(loss) {
    document.getElementById('placeModal').innerHTML = capitalizeFirstLetter(loss.place)
    document.getElementById('dateModal').innerHTML = loss.date.substring(0, 10)
    document.getElementById('hourModal').innerHTML = loss.hour
}

function insertIntoModalUserInfo(user) {
    document.getElementById('userNameModal').innerHTML = capitalizeFirstLetter(user.name)
    document.getElementById('emailModal').innerHTML = user.email
    document.getElementById('emailModal').name = user.email
    document.getElementById('numberModal').innerHTML = (user.cellphone_number) ? user.cellphone_number : 'No tiene'
}

function capitalizeFirstLetter(str) {
    return str.charAt(0).toUpperCase() + str.slice(1)
}

function validateAge(age) {
    if (age > 1 && age < 30)
        age = `${age} años`

    else if (age == 1)
        age = `${age} año`

    else if (age > 0 && age < 1)
        age = `${age} meses`;

    else
        age

    return age
}

