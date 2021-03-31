import { UI } from "./UI.js";
const ui = new UI()

fetch(`http://localhost:5500/api/pet/rabbit`, getOptionsToGet())
.then(res => {
    return res.json()
})
.then(data => {
    ui.getPets(data.rabbits)
})