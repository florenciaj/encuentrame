import { UI } from './UI.js';

const ui = new UI()

let id
document.addEventListener("DOMContentLoaded", function (event) {

    const signInBtn = document.getElementById('signInBtn')
    const signOutBtn = document.getElementById('signOutBtn')
    const start = document.getElementById('start')
    const profilBtn = document.getElementById('profilBtn')
    const postPetBtn = document.getElementById('postPetBtn')

    const loginCheck = (user) => {
        if (user) {
            /* display logout button if user is loggedIn */
            signInBtn.style.display = 'none'
            signOutBtn.style.display = 'block'
            profilBtn.style.display = 'block'
            postPetBtn.style.display = 'block'
            if (start)
                start.style.display = 'block'
        } else {
            /* not display buttons if user is not logged in and show logout */
            signInBtn.style.display = 'block'
            signOutBtn.style.display = 'none'
            profilBtn.style.display = 'none'
            postPetBtn.style.display = 'none'
            if (start)
                start.style.display = 'none'

        }
    };

    // sign in
    const signInForm = document.getElementById('signInForm')

    if (signInForm) {
        signInForm.addEventListener('submit', (e) => {
            e.preventDefault()
            const email = signInForm['email'].value
            const password = signInForm['password'].value

            /* authenticate user */
            auth.signInWithEmailAndPassword(email, password).
                then((userCredential) => { }).then(() => {
                    signInForm.reset()
                    ui.showToast(true)
                }).catch((e) => {
                    ui.showToast(e.message)
                    console.error(e.message);
                })
        });
    }

    // sign in with Google
    const googleButton = document.getElementById("googleAuth")

    if (googleButton) {
        googleButton.addEventListener('click', function (e) {
            e.preventDefault()
            const provider = new firebase.auth.GoogleAuthProvider()
            
            auth.signInWithPopup(provider).then((result) => {
                //codigo si todo sale bien
                signInForm.reset()
                saveUserInDatabase()
                ui.showToastGreeting(firebase.auth().currentUser.displayName)
            
            })
                .catch(err => {
                    //codigo si todo sale mal
                    ui.showToast(err)
                    console.log(err)
                })
        });
    }


    // sign in with Facebook
    const facebookAuthBtn = document.getElementById('facebookAuth')

    if (facebookAuthBtn) {
        facebookAuthBtn.addEventListener('click', function (e) {
            e.preventDefault()

            const provider = new firebase.auth.FacebookAuthProvider();
            auth.signInWithPopup(provider).then((result) => {
                signInForm.reset()
                ui.showToast(true)
                saveUserInDatabase();
            })
                .catch(err => {
                    console.log(err)
                    ui.showToast(err)
                })
        });
    }


    // sign up
    const signUpForm = document.getElementById('signUpForm')

    if (signUpForm) {
        signUpForm.addEventListener('submit', (e) => {
            e.preventDefault()
            const email = signUpForm['email'].value
            const password = signUpForm['password'].value

            auth
                .createUserWithEmailAndPassword(email, password)
                .then((userCredential) => {
                    console.log(userCredential)
                    console.log(userCredential.uid)
                    /* references a new document with a new specific unique id (user id) */
                    return db.collection('users').doc(userCredential.user.uid).set({
                        name: signUpForm['name'].value,
                        number: signUpForm['number'].value
                    })
                }).then(() => {
                    saveUserInDatabase()
                    ui.showToast(true)
                    signUpForm.reset()
                }).catch((err) => {
                    console.log(err)
                    ui.showToast(err)
                })
        });
    }

    // log out
    signOutBtn.addEventListener('click', (e) => {
        e.preventDefault();
        auth.signOut().then(() => {
            ui.showToast('Chau! Espero volver a verte pronto')
            console.log('sign out')
            localStorage.setItem('userId', undefined)
            localStorage.setItem('userEmail', undefined)
            localStorage.setItem('userName', undefined)
            localStorage.setItem('userPhoto', undefined)
        }).catch((err) => {
            ui.showToast(err)
            console.log(err)
        })
    })


    // events
    // list for auth state changes
    auth.onAuthStateChanged((user) => {
        if (user) {
            loginCheck(user)
            console.log('signin')

            let userId = localStorage.getItem('userId')
            let userEmail = localStorage.getItem('userEmail')
            let userName = localStorage.getItem('userName')
            let userPhoto = localStorage.getItem('userPhoto')

            if (userId === 'undefined' || userId == null)
                localStorage.setItem('userId', firebase.auth().currentUser.uid)

            if (userEmail === 'undefined' || userEmail == null ) {
                if (firebase.auth().currentUser.email)
                    localStorage.setItem('userEmail', firebase.auth().currentUser.email)

                else
                    localStorage.setItem('userEmail',  document.getElementById('email').value)
            }

            if (userPhoto === 'undefined' || userPhoto == null ) {
                if (firebase.auth().currentUser.photoURL)
                    localStorage.setItem('userPhoto', firebase.auth().currentUser.photoURL)

                else
                    localStorage.setItem('userPhoto', 'img/user_photo.png')
            }

            if (userName === 'undefined' ||userName == null) {
                if (firebase.auth().currentUser.displayName)
                    localStorage.setItem('userName', firebase.auth().currentUser.displayName)

                else
                    localStorage.setItem('userName', document.getElementById('name').value)
            }

            // db.collection('users')
            //     .get()
            //     .then((snapshot) => {


            //     });
        } else {
            loginCheck(user)
            console.log("signout");
        }
    });


});


function saveUserInDatabase() {
    let data, options;
  
        
    data = {
        name: getUserName(),
        email: getUserEmail(),
        cellphone_number: getUserNumber(),
        firebase_id: firebase.auth().currentUser.uid
    };

    console.log(data);
    options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
    };

    console.log(options);

    fetch('http://localhost:5500/api/user/create-user', options)
        .then((res) => {
            console.log(res);
        })
        .catch((err) => {
            console.err(err);
        });

        function getUserNumber(){
            try{
                document.getElementById('number').value
            }catch(e){
                return ''
            }
            return document.getElementById('number').value
        }

        function getUserName(){
            try{
                document.getElementById('name').value
            }catch(e){
                return firebase.auth().currentUser.displayName
            }
            return document.getElementById('name').value
        }

        function getUserEmail(){
            try{
                firebase.auth().currentUser.email
            }catch(e){
                return document.getElementById('email').value
            }
            return firebase.auth().currentUser.email
        }
    }

