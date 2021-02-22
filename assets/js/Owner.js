class Owner extends User {
    constructor(idUser, name, number, email, password, Pet) {
        super(idUser, name, number, email, password);
        this.Pet = Pet;
    }
}