const stepOneContainer = document.getElementById('stepOneContainer')
const stepTwoContainer = document.getElementById('stepTwoContainer')
const btnSubmit = document.getElementById('btnSubmit')
let checkedInputs = 0

const validInputs = {
    name: false,
    breed: false,
    age: false,
    gender: false,
    petType: false,
    features: false,
    colour: false
}

/* NEXT AND PREVIOUS BUTTONS */
const btnNext = document.getElementById('btnNext')
const btnPrevious = document.getElementById('btnPrevious')

btnNext.addEventListener('click', function() {
    const checkboxs = document.querySelectorAll('#submitFormNewPet input[type="checkbox"]')
    const formMessage = document.getElementById('formMessage')

    if (validInputs.name && validInputs.breed && validInputs.age && validInputs.gender && validInputs.petType && validInputs.features) {
        checkboxs.forEach((checkbox) => {
            checkbox.addEventListener('change', checkBoxValidation)
        })
        if (checkedInputs) {
            stepOneContainer.classList.add('hide')
            stepTwoContainer.classList.remove('hide')
            btnSubmit.classList.remove('hide')
        } else {
            showErrorMessage(formMessage)
        }
    } else {
        showErrorMessage(formMessage)
    }
})

function showErrorMessage(formMessage) {
    formMessage.classList.add('formMessage-active')
    setTimeout(() => {
        formMessage.classList.remove('formMessage-active')
    }, 5000)
}

function checkBoxValidation(e) {
    if (e.target.checked)
        checkedInputs += 1
}

btnPrevious.addEventListener('click', function() {
    stepOneContainer.classList.remove('hide')
    stepTwoContainer.classList.add('hide')
    btnSubmit.classList.add('hide')
})

window.addEventListener('load', () => {

    const form = document.getElementById('submitFormNewPet')
    const inputs = document.querySelectorAll('#submitFormNewPet input')
    const selects = document.querySelectorAll('#submitFormNewPet select')
    const textareas = document.querySelectorAll('#submitFormNewPet textarea')

    /* INPUTS VALIDATION */
    function formValidation(e) {
        const regexText = /^[a-zA-ZÀ-ÿ\s]{1,40}$/
        const regexNumber = /^\d+$/

        switch (e.target.name) { //obtiene que se está clickeando
            case 'name':
                validateInput(regexText, e.target)
                break;
            case 'breed':
                validateInput(regexText, e.target)
                break;
            case 'age':
                validateInput(regexNumber, e.target)
                break;
        }
    }

    function selectValidation(e) {
        if (e.target.value)
            validInput(e.target)
        else
            invalidInput(e.target)
    }

    function textareaValidation(e) {
        if (e.target.value) {
            if (e.target.value.length > 0 && e.target.value.length <= 1000)
                return validInput(e.target)
            invalidInput(e.target)
        } else
            invalidInput(e.target)
    }

    function validateInput(expression, input) {
        if (expression.test(input.value)) {
            if (input.name === 'age')
                return validateAge(input)
            validInput(input)
        } else {
            invalidInput(input)
        }
    }

    inputs.forEach((input) => {
        input.addEventListener('keyup', formValidation)
        input.addEventListener('blur', formValidation)
    })

    selects.forEach((select) => {
        select.addEventListener('change', selectValidation)
    })

    textareas.forEach((textarea) => {
        textarea.addEventListener('keyup', textareaValidation)
        textarea.addEventListener('blur', textareaValidation)
    })


    /* SUBMIT FORM VALIDATION */
    form.addEventListener('submit', (e) => {
        e.preventDefault()
    })


    function iteratePetValuesToWrite() {
        const petValues = ['name', 'breed', 'gender', 'age', 'petType', 'features']
        for (let i = 0; i < petValues.length; i++) {
            writeInfoGiven(petValues[i])
        }

        function writeInfoGiven(inputName) {
            if (document.getElementById(`${inputName}Input`)) {
                let nameInput = document.getElementById(`${inputName}Input`)
                let nameOutput = document.getElementById(`${inputName}Output`)
                let colour = [];
                nameInput.addEventListener('keyup', function() {
                    if (nameOutput.id == 'ageOutput')
                        formatAge(nameInput, nameOutput)
                    else
                        nameOutput.innerHTML = nameInput.value
                });

                if (nameInput.id == 'genderInput' || nameInput.id == 'petTypeInput') {
                    nameInput.addEventListener('change', function() {
                        nameOutput.innerHTML = nameInput.value
                    });
                }
            }

            function formatAge(nameInput, nameOutput) {
                let inputValue = nameInput.value;
                if (inputValue > 1 && inputValue < 30) {
                    nameOutput.innerHTML = `${inputValue} años`;

                } else if (inputValue == 1) {
                    nameOutput.innerHTML = `${inputValue} año`;

                } else if (inputValue > 0 && inputValue < 1) {
                    nameOutput.innerHTML = `${inputValue} meses`;

                } else {
                    nameOutput.innerHTML = '';
                }
            }
            //
        };
    }
    let arrayColous = []
    let checkedColours = []

    function getSelectedColour() {
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
                        console.log(arrayColous[i])

                        checkedColours.splice(checkedColours.indexOf(arrayColous[i].value), 1)
                        colourOutput.innerHTML = checkedColours

                    }

                })
            }
        });
    }

    function iterateLossValuesToWrite() {
        const lossValues = ['place', 'hour', 'date']

        for (let i = 0; i < lossValues.length; i++) {
            writeInfoGiven(lossValues[i])
        }

        function writeInfoGiven(inputName) {
            if (document.getElementById(`${inputName}Input`)) {
                let nameInput = document.getElementById(`${inputName}Input`)
                let nameOutput = document.getElementById(`${inputName}Output`)

                nameInput.addEventListener('keyup', function() {
                    nameOutput.innerHTML = nameInput.value
                });

                if (nameInput.id == 'hourInput' || nameInput.id == 'dateInput') {
                    nameInput.addEventListener('change', function() {
                        nameOutput.innerHTML = nameInput.value
                    });
                }
            }
        };
    }

    getSelectedColour()
    iteratePetValuesToWrite()
    iterateLossValuesToWrite()
})



function validateAge(input) {
    (input.value < 0 || input.value > 30) ? invalidInput(input): validInput(input)
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