import { Pet } from './Pet.js';
import { User } from './User.js';

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
            new Pet(1, 'Toby', 'Perro', 'Rottweiler', 1, 'Negro y marrón', 'M', 'rottweiler.jpg', 'Perdido', null, 'Tiene un collar rojo'),
            new Pet(2, 'Blanca', 'Gato', 'No aplica', 2, 'Blanco', 'H', 'gato_blanco.jpg', 'Perdido', null, 'Un ojo es verde y otro azul'),
            new Pet(3, 'Coco', 'Gato', 'Siamés', 4, 'Gris y negro', 'M', 'siames.jpg', 'Perdido', null, 'Tiene una mancha blanca en la oreja izquierda'),
            new Pet(4, 'Oreo', 'Conejo', 'Holandés', 0.5, 'Negro y blanco', 'H', 'conejo_holandes.jpg', 'Perdido', null, 'Sus orejas son caidas'),
            new Pet(5, 'Milo', 'Perro', 'Caniche', 8, 'Marrón', 'M', 'caniche.jpg', 'Perdido', null, 'Tiene un tapado verde')
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
        return this.pets.length + 1;
    }

    getAllPets() {
        if (JSON.parse(localStorage.getItem('petsLocalStorage') === null))
            return this.pets

        return JSON.parse(localStorage.getItem('petsLocalStorage'))
    }
}