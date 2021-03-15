const router = require('express').Router()
const PetModel = require('../../models/Pet')

router.get('/mascotas/publicar-mascota', (req, res) => {
    res.render('/pets/registerPet')
})

router.get('/api/mascotas', PetModel.getPets)

router.post('/mascotas/publicar-mascota', async(req, res) => {
    const { name, breed, age, gender, petType, features, colour, place, hour, date } = req.body
    const errors = []

    const regexCharacters = new RegExp("^[a-zA-Z ]+$")
    const regexNumbers = new RegExp("^[0-9]+$")

    if (!name || !breed || !age || !gender || !petType || !features || !colour || !place || !hour || !date)
        errors.push({ text: 'Deben completarse todos los campos' })

    if (!regexCharacters.test(name))
        errors.push({ text: 'Ingresar solo letras en el nombre' })

    if (!regexCharacters.test(breed))
        errors.push({ text: 'Ingresar solo letras en la raza' })


    if (!regexNumbers.test(age))
        errors.push({ text: 'Ingresar solo números en la edad' })

    if (features.length < 10)
        errors.push({ text: 'La descripción debe tener al menos 10 caracteres' })

    if (errors.length > 0)
        res.render('pets/registerPet', { errors, name, breed, age, features, place })

    else {
        const userId = req.user._id
        const newPet = new PetModel({ name, breed, age, gender, petType, features, colour, userId })
        await newPet.save()
        req.flash('success_msg', 'Se ha creado tu usuario. ¡Ya puedes iniciar sesión!')
        res.redirect('/')
    }
})

module.exports = router