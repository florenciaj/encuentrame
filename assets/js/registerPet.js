import { PetFinder } from './PetFinder.js';
import { Pet } from './Pet.js';
import { Loss } from './Loss.js';

const btnNext = document.getElementById('btnNext')
const btnPrevious = document.getElementById('btnPrevious')

const stepOneContainer = document.getElementById('stepOneContainer')
const stepTwoContainer = document.getElementById('stepTwoContainer')
const btnSubmit = document.getElementById('btnSubmit')

btnNext.addEventListener('click', function() {
    stepOneContainer.classList.add('hide')
    stepTwoContainer.classList.remove('hide')
    btnSubmit.classList.remove('hide')
})

btnPrevious.addEventListener('click', function() {
    stepOneContainer.classList.remove('hide')
    stepTwoContainer.classList.add('hide')
    btnSubmit.classList.add('hide')
})


let petFinder = new PetFinder()

window.addEventListener('load', function() {
    function addNewMissedPet() {
        if (document.getElementById('submitFormNewPet')) {
            document.getElementById('submitFormNewPet').addEventListener('submit', function(e) {
                e.preventDefault()

                let savedPet = saveNewPet()

                setTimeout(function() {
                    saveLossInfo(savedPet)
                    showModalWithMessage('Se ha creado todo correctamente')
                    localStorage.setItem('petsLocalStorage', JSON.stringify(petFinder.pets))
                }, 1000)
            })
        }


    }

    function saveNewPet() {
        let name = document.getElementById('nameInput').value
        let breed = document.getElementById('breedInput').value
        let age = document.getElementById('ageInput').value
        let gender = document.getElementById('genderInput').value
        let type = document.getElementById('typeInput').value
        let colour = []
        colour = getPetColour(colour);
        let features = document.getElementById('featuresInput').value

        let petValues = [name, breed, age, gender, type, colour, features]
        if (checkIfPetHasAllValues(petValues)) {
            const photo = null;
            const state = "Perdido";
            const Loss = null;
            return saveAndAddNewPet(name, type, breed, age, colour, gender, photo, state, Loss, features);
        }
        return false;
    }

    function checkIfPetHasAllValues(petValues) {
        let allDataIsComplete = true

        for (let i = 0; i < petValues.length; i++) {
            if (petValues[i] == null || petValues[i] == "")
                allDataIsComplete = false
        }
        return allDataIsComplete
    }

    function saveAndAddNewPet(name, type, breed, age, colour, gender, photo, state, Loss, features) {
        let newPet = new Pet(petFinder.generateNewPetId(), name, type, breed, age, colour, gender, photo, state, Loss, features);
        petFinder.pets.push(newPet);
        console.log(petFinder.pets);
        return newPet
    }

    function getPetColour(colour) {
        let blackColour = document.getElementById("blackColour");
        let whiteColour = document.getElementById("whiteColour");
        let brownColour = document.getElementById("brownColour");
        let greyColour = document.getElementById("greyColour");
        let creamColour = document.getElementById("creamColour");

        let petColours = [blackColour, whiteColour, brownColour, greyColour, creamColour];
        for (let i = 0; i < petColours.length; i++) {
            if (petColours[i].checked)
                colour.push(petColours[i].value);
        }
        console.log("color:")
        console.log(colour)
        if (colour.length === 0)
            return colour = "No se reconoce el color"

        else
            return colour
    }

    function iteratePetValuesToWrite() {
        const petValues = ['name', 'type', 'breed', 'age', 'colour', 'gender', 'features', 'place', 'hour', 'date']

        for (let i = 0; i < petValues.length; i++) {
            writeInfoGiven(petValues[i])
        }

        function writeInfoGiven(inputName) {
            if (document.getElementById(`${inputName}Input`)) {
                let nameInput = document.getElementById(`${inputName}Input`)
                let nameOutput = document.getElementById(`${inputName}Output`)
                let textWarning = document.getElementById('textWarning')
                let colour = [];
                nameInput.addEventListener('keyup', function() {
                    if (nameOutput.id == 'ageOutput')
                        validateAge(nameInput, nameOutput)
                    else
                        nameOutput.innerHTML = nameInput.value
                });

                if (nameInput.id == 'genderInput' || nameInput.id == 'typeInput') {
                    nameInput.addEventListener('change', function() {
                        nameOutput.innerHTML = nameInput.value
                    });
                }
            }

            function validateAge(nameInput, nameOutput) {
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

            function validateAndShowColours(nameOutput) {
                let colour = []
                let petColours = getPetColour(colour)
                for (let i = 0; i < petColours.length; i++) {
                    const element = petColours[i];
                    nameOutput.innerHTML = "petColours";
                }
            }
        };
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

    /* Loss methods */
    function saveLossInfo(savedPet) {

        let place = document.getElementById('placeInput').value
        let hour = document.getElementById('hourInput').value
        let data = document.getElementById('dateInput').value

        return new Loss(place, hour, data, savedPet)
    }

    function showModalWithMessage(message) {
        alert(message)
    }

    addNewMissedPet()
    iteratePetValuesToWrite()
    iterateLossValuesToWrite()
})