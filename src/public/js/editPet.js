
window.addEventListener('DOMContentLoaded', () => {

    let form = document.getElementById('submitEditPet')
    let petId = document.getElementById('petId').value
    let checkedInputs = 0
    const validInputs = {
        name: false,
        breed: false,
        age: false,
        gender: false,
        features: false
    }

    function putPetValues(e) {
        const pet = e.petFound

        document.getElementById('nameInput').value = pet.name
        document.getElementById('breedInput').value = pet.breed
        document.getElementById('ageInput').value = pet.age
        document.getElementById('featuresInput').innerText = pet.features

        document.getElementById('preview').innerHTML = `<img class="w-100" src="${pet.photo}">`
        document.getElementById('nameOutput').innerHTML = pet.name
        document.getElementById('breedOutput').innerHTML = pet.breed
        document.getElementById('ageOutput').innerHTML = pet.age
        document.getElementById('genderOutput').innerHTML = pet.gender
        document.getElementById('petTypeOutput').innerHTML = pet.pet_type
        document.getElementById('colourOutput').innerHTML = pet.colour
        document.getElementById('featuresOutput').innerHTML = pet.feautes
    }

    loadDoc('GET', `http://localhost:5500/api/pet/${petId}`, putPetValues)

    /* SUBMIT FUNCTION */
    form.addEventListener('submit', (e) => {
        e.preventDefault()

        if (validInputs.name && validInputs.breed && validInputs.age && validInputs.gender && validInputs.features) {

            let data, options
            data = {
                name: document.getElementById('nameInput').value,
                breed: document.getElementById('breedInput').value,
                age: document.getElementById('ageInput').value,
                features: document.getElementById('featuresInput').value,
                colour: checkedColours
            };
    
            console.log(data);
            options = {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data)
            };
    
            console.log(options);
    
            fetch(`http://localhost:5500/api/pet/update-pet/${petId}`, options)
                .then((res) => {
                    console.log(res);
                })
                .catch((err) => {
                    console.err(err);
                });

        } else {
            const formMessage = document.getElementById('formMessage')

            formMessage.classList.add('formMessage-active')
            setTimeout(() => {
                formMessage.classList.remove('formMessage-active')
            }, 5000)
        }
    })

    /* PREVIEW CARD */
    const inputs = document.querySelectorAll('#submitEditPet input')
    const selects = document.querySelectorAll('#submitEditPet select')
    const textareas = document.querySelectorAll('#submitEditPet textarea')
    const checkboxs = document.querySelectorAll('#submitEditPet input[type="checkbox"]')

    /* INPUTS VALIDATION */
    function formValidation(e) {
        const regexText = /^[a-zA-ZÀ-ÿ\s]{1,40}$/
        const regexNumber = /^\d+$/
        const regexAddress = /^[a-zA-ZÀ-ÿ\s\d]+$/

        switch (e.target.name) {
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

    function hasAValue(e) {
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


    function checkBoxValidation(e) {
        if (e.target.checked)
            return checkedInputs += 1
    }

    function validateAge(input) {
        (input.value < 0 || input.value > 30) ? invalidInput(input) : validInput(input)
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

    /* PREVIEW CARD CONTENT */
    let arrayColous = []
    let checkedColours = []

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
                nameInput.addEventListener('keyup', function () {
                    if (nameOutput.id == 'ageOutput')
                        formatAge(nameInput, nameOutput)
                    else
                        nameOutput.innerHTML = nameInput.value
                });

                if (nameInput.id == 'genderInput' || nameInput.id == 'petTypeInput') {
                    nameInput.addEventListener('change', function () {
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

    function getSelectedColour() {
        document.querySelectorAll('.form-check-input').forEach(function (el) {

            let colour = document.getElementById(el.id)
            arrayColous.push(colour)

            for (let i = 0; i < arrayColous.length; i++) {
                colour.addEventListener('change', function () {
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

    getSelectedColour()
    iteratePetValuesToWrite()
})

