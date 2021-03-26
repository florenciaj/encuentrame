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
            let colour = []

            nameInput.addEventListener('keyup', function() {
                if (nameOutput.id == 'ageOutput')
                    formatAge(nameInput, nameOutput)
                else
                    nameOutput.innerHTML = capitalizarFirstLetter(nameInput.value)
            })

            if (nameInput.id == 'genderInput' || nameInput.id == 'petTypeInput') {
                nameInput.addEventListener('change', function() {
                    nameOutput.innerHTML = capitalizarFirstLetter(nameInput.value)
                })
            }
        }

        function formatAge(nameInput, nameOutput) {
            let inputValue = nameInput.value;
            if (inputValue > 1 && inputValue < 30) {
                nameOutput.innerHTML = `${inputValue} años`

            } else if (inputValue == 1) {
                nameOutput.innerHTML = `${inputValue} año`

            } else if (inputValue > 0 && inputValue < 1) {
                nameOutput.innerHTML = `${inputValue} meses`

            } else {
                nameOutput.innerHTML = '<span class="text-secondary">edad</span>'
            }
        }
    }
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
                nameOutput.innerHTML = capitalizarFirstLetter(nameInput.value)
            })

            if (nameInput.id == 'hourInput' || nameInput.id == 'dateInput') {
                nameInput.addEventListener('change', function() {
                    nameOutput.innerHTML = capitalizarFirstLetter(nameInput.value)
                })
            }
        }
    }
}

function capitalizarFirstLetter(txt) {
    return txt.charAt(0).toUpperCase() + txt.slice(1)
}

iteratePetValuesToWrite()
iterateLossValuesToWrite()