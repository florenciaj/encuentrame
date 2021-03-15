const PetModel = require('../models/Pet')

module.exports = {

    async getPets(req, res) {
        const pets = await PetModel.find()
        res.send(pets)
    },

    async getPet(req, res) {
        const { params: { _id } } = req
        let petFound

        try {
            petFound = await PetModel.findOne({ _id })
        } catch (e) {
            res.status(404).json({ error: "Not found" })
        }
        return res.status(200).json({ petFound })
    },

    async postNewPet(req, res) {
        const { colour, name, breed, age, gender, petType, features } = req.body
        const photo = req.file.filename

        if (colour && name && breed && age && gender && petType && features && photo) {
            const userId = req.user._id
            const newPet = new PetModel({ name, petType, breed, age, colour, gender, photo, features, userId })
            await newPet.save()
            res.render('index   ')
                // return res.status(201).json({ pet: req.body })
        } else {
            res.status(400).json({ error: "Not enough properties" })
        }
    },

    async changePetValues(req, res) {
        const { params: { _id } } = req
        const { colour, state, name, breed, age, gender, petType, features } = req.body
        const update = {}

        if (colour) update.colour = colour
        if (state) update.state = state
        if (name) update.name = name
        if (breed) update.breed = breed
        if (age) update.age = age
        if (gender) update.gender = gender
        if (petType) update.petType = petType
        if (features) update.features = features

        const updatePet = await PetModel.updateOne({ _id }, update)

        if (updatePet.n) { //n == numero de documentos modificados
            return res.status(200).json({ ok: true });
        } else {
            return res.status(404).json({ error: "Pet not found" });
        }
    },

    async changeStateOfPetToFound(req, res) {
        const { params: { _id } } = req

        const update = {}
        update.state = "Encontrado"

        const updatePet = await PetModel.updateOne({ _id }, update)

        if (updatePet.n) {
            return res.status(200).json({ text: "How goof that you found your pet" });
        } else {
            return res.status(404).json({ error: "Pet not found" });
        }
    },

    deletePet(req, res) {
        const { params: { _id } } = req

        PetModel.deleteOne({ _id }, (err) => {
            if (err) {
                return res.status(404).json({ error: "Pet not found" });
            } else {
                return res.status(200).json({ ok: "Post deleted" });
            }
        })
    }

}