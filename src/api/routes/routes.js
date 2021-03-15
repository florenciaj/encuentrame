const router = require('express').Router() //el método Router permite tener un objeto que facilita la creación de rutas
const userController = require('../../controller/userController')
const { getPets, getPet, postNewPet, changePetValues, changeStateOfPetToFound, deletePet } = require('../../controller/petController')
const passport = require('passport')

router.get('/api/pet', getPets)

router.get('/api/pet/:_id', getPet)

router.post('/api/pet/create-pet', postNewPet)

router.put('/api/pet/update-pet/:_id', changePetValues)

router.put('/api/pet/update-pet-found/:_id', changeStateOfPetToFound)

router.delete('/api/pet/delete-pet/:_id', deletePet)



router.get('/', (req, res) => {
    res.render('index')
})

router.get('/signin', userController.renderToSignIn)

router.get('/signup', userController.renderToSignUp)

router.post('/signin', passport.authenticate('local', { //local es la forma en la que se va a autenticar el usuario
    successRedirect: '/',
    failureRedirect: '/signin',
    failureFlash: true
}))

router.post('/signup', userController.renderToSignUp)

router.get('/logout', (req, res) => {
    req.logout()
    res.redirect('/')
})






//PETS

router.get('/mascotas/publicar-mascota', (req, res) => {
    res.render('pets/registerPet')
})

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