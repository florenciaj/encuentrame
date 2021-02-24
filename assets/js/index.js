import { PetFinder } from './PetFinder.js';
import { UI } from './UI.js';


let ui = new UI()
let petFinder = new PetFinder()
console.log(petFinder.getPets())
window.addEventListener("load", function() {
    ui.createCards(petFinder.getPets())
})