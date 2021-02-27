import { UI } from './UI.js';
import { PetFinder } from './PetFinder.js';


let ui = new UI()
let petFinder = new PetFinder()
console.log(petFinder.getPets())
window.addEventListener("load", function() {
    ui.createCards(petFinder.getPets())
    let thePet = petFinder.searchPetById(11)
    petFinder.searchLossByPetId(2)
    console.log('---------------------')
    console.log(thePet)
    console.log(Object.keys(petFinder.getPets()))
})