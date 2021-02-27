import { PetFinder } from './PetFinder.js';
import { Pet } from './Pet.js';
import { Loss } from './Loss.js';
import { UI } from './UI.js';

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
let ui = new UI()

window.addEventListener('load', function() {

    function addNewMissedPet() {
        document.getElementById('submitFormNewPet').addEventListener('submit', function(e) {
            e.preventDefault()

            let savedPet
            const CreatePostPromise = new Promise((resolve, reject) => {
                savedPet = saveNewPet()
                if (savedPet)
                    resolve('Se ha creado el post con la mascota')
                else
                    reject('No se ha podido crear un post con la mascota')
            })

            /* saves new Loss */
            CreatePostPromise.then(result => {
                return new Promise((resolve, reject) => {
                    if (saveLossInfo(savedPet)) {
                        resolve('No se creó un extravío')
                    } else
                        reject('No se guardaron los datos sobre el extravío, inténtelo nuevamente')
                })

                /* saves new Loss into missed pet*/
            }).then(() => {
                showSuccessMessage('Ya se ha creado el post');
            }).catch(error => {
                console.log(error)

            })
        })

        function showSuccessMessage(message) {
            ui.showSuccessToastMessage(message);
            let toastElList = [].slice.call(document.querySelectorAll('.toast'));
            let toastList = toastElList.map(function(toastEl) {
                return new bootstrap.Toast(toastEl);
            });
            toastList.forEach(toast => toast.show());
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
        let photo
        console.log(features)
        let petValues = [name, breed, age, gender, type, colour, features]
        if (checkIfPetHasAllValues(petValues)) {
            photo = setPetPhoto(type)
            const state = "Perdido"
            return saveAndAddNewPet(name, type, breed, age, colour, gender, photo, state, features)
        }
        return false;

        function setPetPhoto() {
            if (type == 'gato')
                photo = 'defaultImageCat.png'

            else if (type == 'perro')
                photo = 'defaultImageDog.png'

            else
                photo = 'defaultImageRabbit.png'

            return photo;
        }
    }

    function checkIfPetHasAllValues(petValues) {
        let allDataIsComplete = true

        for (let i = 0; i < petValues.length; i++) {
            console.log(petValues[i])

            if (petValues[i] == null || petValues[i] == "")
                allDataIsComplete = false
        }
        return allDataIsComplete
    }

    function saveAndAddNewPet(name, type, breed, age, colour, gender, photo, state, features) {
        console.log('features en save and add new pet' + features)
        let newPet = new Pet(petFinder.generateNewPetId(), name, type, breed, age, colour, gender, photo, state, features)
        petFinder.saveNewPetInLocalStorage(newPet)
        return newPet
    }

    function getPetColour(colour) {
        let blackColour = document.getElementById('blackColour')
        let whiteColour = document.getElementById('whiteColour')
        let brownColour = document.getElementById('brownColour')
        let greyColour = document.getElementById('greyColour')
        let creamColour = document.getElementById('creamColour')

        let petColours = [blackColour, whiteColour, brownColour, greyColour, creamColour]
        for (let i = 0; i < petColours.length; i++) {
            if (petColours[i].checked)
                colour.push(petColours[i].value)
        }
        if (colour.length === 0)
            return colour = 'No se reconoce el color'

        else
            return colour
    }

    function iteratePetValuesToWrite() {
        const petValues = Object.keys(petFinder.getPets())

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

                if (nameInput.id == 'genderInput' || nameInput.id == 'typeInput' || nameInput.id == 'colourInput') {
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

        let newLoss = new Loss(petFinder.generateNewLossId(), place, hour, data, savedPet.id)
        petFinder.saveNewLossInLocalStorage(newLoss)

        return newLoss
    }


    addNewMissedPet()
    iteratePetValuesToWrite()
    iterateLossValuesToWrite()
})