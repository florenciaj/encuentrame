import { UI } from './UI.js';

const ui = new UI()
const stepOneContainer = document.getElementById('stepOneContainer')
const stepTwoContainer = document.getElementById('stepTwoContainer')
const btnSubmit = document.getElementById('btnSubmit')
let checkedInputs = 0
let checkedColours = []
let photoBase

const validInputs = {
    name: false,
    age: false,
    gender: false,
    petType: false,
    features: false,
    colour: false,
    photo: false,
    place: false,
    hour: false,
    date: false
}

/* NEXT AND PREVIOUS BUTTONS */
document.getElementById('btnNext').addEventListener('click', function() {
    const formMessage1 = document.getElementById('formMessage1')

    if (validInputs.name && validInputs.age && validInputs.gender && validInputs.petType && validInputs.features && validInputs.photo) {
        if (checkedInputs) {
            stepOneContainer.classList.add('hide')
            stepTwoContainer.classList.remove('hide')
            btnSubmit.classList.remove('hide')
        } else
            ui.showToastErrorMessage(formMessage1)
    } else
        formMessage1.classList.add('formMessage-active')
})

document.getElementById('btnPrevious').addEventListener('click', function() {
    stepOneContainer.classList.remove('hide')
    stepTwoContainer.classList.add('hide')
    btnSubmit.classList.add('hide')
})

window.addEventListener('load', () => {

    const form = document.getElementById('submitFormNewPet')
    const inputs = document.querySelectorAll('#submitFormNewPet input')
    const selects = document.querySelectorAll('#submitFormNewPet select')
    const textareas = document.querySelectorAll('#submitFormNewPet textarea')
    const checkboxs = document.querySelectorAll('#submitFormNewPet input[type="checkbox"]')

    /* INPUTS VALIDATION */
    function formValidation(e) {
        const regexText = /^[a-zA-ZÀ-ÿ\s]{1,40}$/
        const regexNumber = /^\d+$/
        const regexAge = /^\d+(.\d+)?$/
        const regexAddress = /^[a-zA-ZÀ-ÿ\s\d]+$/

        let input = e.target
        switch (input.name) {
            case 'name':
                validateInput(regexText, input)
                break;
            case 'breed':
                validateInput(regexText, input)
                break;
            case 'age':
                validateInput(regexAge, input)
                break;
            case 'place':
                validateInput(regexAddress, input)
                break;
        }
    }

    function hasAValue(e) {
        let input = e.target
        if (input.value)
            validInput(input)
        else
            invalidInput(input)
    }

    function textareaValidation(e) {
        let textarea = e.target

        if (textarea.value) {
            if (textarea.value.length > 0 && textarea.value.length <= 1000)
                return validInput(textarea)
            invalidInput(textarea)
        } else
            invalidInput(textarea)
    }

    function validateInput(expression, input) {
        if (expression.test(input.value)) {
            if (input.name === 'age')
                return validateAge(input)
            validInput(input)
        } else
            invalidInput(input)
    }

    function checkBoxValidation(e) {
        if (e.target.checked)
            return checkedInputs += 1
    }

    /* field listeners */
    inputs.forEach((input) => {
        input.addEventListener('keyup', formValidation)
        input.addEventListener('blur', formValidation)
        input.addEventListener('change', hasAValue)
    })

    selects.forEach((select) => {
        select.addEventListener('change', hasAValue)
    })

    textareas.forEach((textarea) => {
        textarea.addEventListener('keyup', textareaValidation)
        textarea.addEventListener('blur', textareaValidation)
    })

    checkboxs.forEach((checkbox) => {
        checkbox.addEventListener('change', checkBoxValidation)
    })

    /* SUBMIT FORM VALIDATION */
    form.addEventListener('submit', (e) => {
        e.preventDefault()
        const formMessage2 = document.getElementById('formMessage2')

        if (validInputs.name && validInputs.age && validInputs.gender && validInputs.petType && validInputs.features && validInputs.photo && validInputs.place && validInputs.date && validInputs.hour) {

            let data, options
            toBase64()
                .then((res) => {
                    data = {
                        name: document.getElementById('nameInput').value,
                        breed: document.getElementById('breedInput').value || 'No aplica',
                        age: document.getElementById('ageInput').value,
                        gender: document.getElementById('genderInput').value,
                        pet_type: document.getElementById('petTypeInput').value,
                        photo: photoBase,
                        features: document.getElementById('featuresInput').value,
                        colour: checkedColours,
                        place: document.getElementById('placeInput').value,
                        hour: document.getElementById('hourInput').value,
                        date: document.getElementById('dateInput').value,
                        firebase_id: firebase.auth().currentUser.uid
                    }
                    console.log(data)
                    console.log(JSON.stringify(data))
                    options = {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify(data)
                    }
                }).then(() => {
                    fetch('http://localhost:5500/api/pet/create-pet', options)
                        .then((res) => {
                            console.log(res)
                        })
                })
                .then(() => {
                    ui.showSuccessToast('Se creó tu post')
                })
                .catch((err) => {
                    ui.showToastErrorMessage(err)
                    console.error(err)
                })

        } else
            formMessage2.classList.add('formMessage-active')
    })


    /* PREVIEW IMAGE */
    document.getElementById("photo").onchange = function(e) {
        let reader = new FileReader()
        reader.readAsDataURL(e.target.files[0])

        reader.onload = function() {
            let preview = document.getElementById('preview')
            let photo = document.createElement('img')
            photo.classList.add('w-100')

            photo.src = reader.result
            preview.innerHTML = ''
            preview.append(photo)
        }
    }
})

function validateAge(input) {
    (input.value < 0 || input.value > 30 || input.value.length > 3) ? invalidInput(input): validInput(input)
}

document.querySelectorAll('.form-check-input').forEach(function(el) {

    let colour = document.getElementById(el.id)
    arrayColous.push(colour)

    for (let i = 0; i < arrayColous.length; i++) {
        colour.addEventListener('change', function() {

            if (arrayColous[i].checked) {
                if (!checkedColours.includes(arrayColous[i].value))
                    checkedColours.push(arrayColous[i].value)

                let colourOutput = document.getElementById('colourOutput')
                colourOutput.innerHTML = checkedColours

            } else {
                let position = checkedColours.indexOf(arrayColous[i].value)

                checkedColours.splice(position, 1)
                colourOutput.innerHTML = checkedColours

                if (checkedColours.length == 0)
                    colourOutput.innerHTML = '<span class="text-secondary">color</span>'
            }
        })
    }
})

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

const base64 = file => new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => resolve(reader.result)
    reader.onerror = error => reject(error)
})

async function toBase64() {
    let filePhoto = document.querySelector('#photo').files[0]
    photoBase = await base64(filePhoto)
}