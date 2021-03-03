import { Pet } from './Pet.js';
import { User } from './User.js';
import { Loss } from './Loss.js';
import { UI } from './UI.js'

export class PetFinder {
    constructor() {
        this.users = [
            new User(1, 'Harry', 'Potter', '11111', 'harrypotter@gmail.com', 123),
            new User(2, 'Ron', 'Weasley', '22222', 'ronweasley@outlook.com', 123),
            new User(3, 'Hermione', 'Granger', '33333', 'hermionegranger@hotmail.com', 123),
            new User(4, 'Draco', 'Malfoy', '11111', 'dracomalfoy@gmail.com', 123),
            new User(5, 'Lord', 'Voldemort', '11111', 'lorvoldemort@hotmail.com', 666)
        ]

        this.pets = [
            new Pet(1, 'Toby', 'Perro', 'Rottweiler', 1, 'Negro y marrón', 'Macho', 'rottweiler.jpg', 'Perdido', 'Tiene un collar rojo'),
            new Pet(2, 'Blanca', 'Gato', 'No aplica', 2, 'Blanco', 'Hembra', 'gato_blanco.jpg', 'Perdido', 'Un ojo es verde y otro azul'),
            new Pet(3, 'Coco', 'Gato', 'Siamés', 4, 'Gris y negro', 'Macho', 'siames.jpg', 'Perdido', 'Tiene una mancha blanca en la oreja izquierda'),
            new Pet(4, 'Oreo', 'Conejo', 'Holandés', 0.5, 'Negro y blanco', 'Hembra', 'conejo_holandes.jpg', 'Perdido', 'Sus orejas son caidas'),
            new Pet(5, 'Milo', 'Perro', 'Caniche', 8, 'Marrón', 'Macho', 'caniche.jpg', 'Perdido', 'Tiene un tapado verde')
        ]

        this.losses = [
            new Loss(1, 'San Justo', '11:30', '22/02/2021', 1),
            new Loss(2, 'CABA', '21:50', '06/02/2021', 2),
            new Loss(3, 'Ramos Mejía', '01:15', '08/01/2021', 3),
            new Loss(4, 'Haedo', '18:20', '29/01/2021', 4),
            new Loss(5, 'San Justo', '15:10', '26/01/2021', 5)
        ]
    }

    getRegisterValues() {
        this.nombre = document.getElementById("nombre").value;
        this.apellido = document.getElementById("apellido").value;
        this.numeroCelular = document.getElementById("numeroCelular").value;
        this.email = document.getElementById("email").value;
        this.contrasenia = document.getElementById("contrasenia").value;
    }

    validateIfUserExists(newUser) {
        for (let i = 0; i < this.users.length; i++) {
            if (this.users[i].email == newUser.email)
                return true
        }
        return false
    }

    add(newUser) {
        this.users.push(newUser)
    }

    getNewUserId() {
        return this.users.length + 1;
    }

    saveInLocalStorage(newUser) {
        let user = newUser
        let name = newUser.name

        localStorage.setItem('newUser', JSON.stringify(this.users))
    }

    getImageFromApi(item) {
        return item.message
    }

    connectApiToGetImage(cFunction) {
        var xhttp;
        xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                var itemsResult = this.responseText
                var item = JSON.parse(itemsResult)

                cFunction(item)
            }
        };
        xhttp.open("GET", 'https://dog.ceo/api/breeds/image/random', true)
        xhttp.send()
    }


    /* pet methods */
    generateNewPetId() {
        return this.getLosses().length + 1;
    }

    getPets() {
        if (localStorage.getItem('petsLocalStorage') !== null)
            return JSON.parse(localStorage.getItem('petsLocalStorage'))

        localStorage.setItem('petsLocalStorage', JSON.stringify(this.pets))
        return this.pets
    }

    getPetType(petType) {
        let pets = this.getPets()
        let dogArray = []

        for (let i = 0; i < pets.length; i++) {
            if (pets[i].petType == petType)
                dogArray.push(pets[i])
        }
        return dogArray
    }

    saveNewPetInLocalStorage(newPet) {
        let storageOPets = this.getPets()
        storageOPets.push(newPet)
        localStorage.setItem('petsLocalStorage', JSON.stringify(storageOPets))
    }

    searchPetById(id) {
        let allPets = this.getPets()
        let ui = new UI()

        for (let i = 0; i < allPets.length; i++) {
            if (allPets[i].id == id) {
                ui.insertIntoModalPetInfo(allPets[i])
                return allPets[i]
            }
        }
        return ui.showToastErrorMessage('no se encuentró la mascota seleccionada')
    }

    validateAge(age) {
        if (age > 1 && age < 30)
            age = `${age} años`

        else if (age == 1)
            age = `${age} año`

        else if (age > 0 && age < 1)
            age = `${age} meses`;

        else
            age

        return age
    }

    /* loss methods */
    generateNewLossId() {
        return this.getLosses().length + 1;
    }

    getLosses() {
        if (localStorage.getItem('lossesLocalStorage') !== null)
            return JSON.parse(localStorage.getItem('lossesLocalStorage'))

        localStorage.setItem('lossesLocalStorage', JSON.stringify(this.losses))
        return this.losses
    }

    saveNewLossInLocalStorage(newLoss) {
        let storageLosses = this.getLosses()
        storageLosses.push(newLoss)
        localStorage.setItem('lossesLocalStorage', JSON.stringify(storageLosses))
    }

    searchLossByPetId(id) {
        let allLosses = this.getLosses()
        let ui = new UI()

        for (let i = 0; i < allLosses.length; i++) {
            if (allLosses[i].idPet == id)
                return ui.insertIntoModalLoosInfo(allLosses[i])
        }
        return ui.showToastErrorMessage('no se encuentraron datos sobre la pérdida')
    }

    /* user methods */
    searchUserByPetId(id) {
        let user = firebase.auth().currentUser;
        let userName = user.displayName
        let userEmail = user.email

        console.log(userEmail)
    }

}