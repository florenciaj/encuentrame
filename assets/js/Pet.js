export class Pet {
    constructor(id, name, petType, breed, age, colour, gender, photo, state, Loss, features) {
        this.id = id;
        this.name = name;
        this.petType = petType;
        this.breed = breed;
        this.age = age;
        this.colour = colour;
        this.gender = gender;
        this.photo = photo;
        this.state = state; /*perdido o encontrado*/
        this.Loss = Loss;
        this.features = features;
    }

    saveNewMissedPet(id, name, breed, age, gender, petType) {
        const colour = "red";
        const photo = "red";
        const state = "red";
        const Loss = null;
        const features = "red";

        const pet = new Pet(id, name, petType, breed, age, colour, gender, photo, state, Loss, features)
        return pet;
    }

    setLoss(Loss) {
        this.Loss = Loss
    }
}