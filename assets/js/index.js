import { UI } from './UI.js';
import { PetFinder } from './PetFinder.js';


let ui = new UI()
let petFinder = new PetFinder()
console.log(petFinder.getPets())
window.addEventListener("load", function() {
    ui.createCards(petFinder.getPets())
    petFinder.searchPetById(11)

})