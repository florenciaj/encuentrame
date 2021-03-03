import { UI } from './UI.js';
import { PetFinder } from './PetFinder.js';


let ui = new UI()
let petFinder = new PetFinder()

window.addEventListener("load", function() {
    ui.createCards(petFinder.getPetType('Gato'))

    document.querySelectorAll('.showModal').forEach(function(el) {

        el.addEventListener('click', function() {
            let petId = el.id
            console.log(petId)
            petFinder.searchPetById(petId)
            petFinder.searchLossByPetId(petId)
        })
    });
})