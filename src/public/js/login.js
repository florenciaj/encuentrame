 import { UI } from './UI.js';

 const ui = new UI()

 document.addEventListener("DOMContentLoaded", function(event) {

     const signInBtn = document.getElementById('signInBtn')
     const signOutBtn = document.getElementById('signOutBtn')
     const start = document.getElementById('start')

     const loginCheck = (user) => {
         if (user) {
             /* display logout button if user is loggedIn */
             signInBtn.style.display = 'none'
             signOutBtn.style.display = 'block'
             if (start)
                 start.style.display = 'block'
         } else {
             /* not display buttons if user is not logged in and show logout */
             signInBtn.style.display = 'block'
             signOutBtn.style.display = 'none'
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
             auth.signInWithEmailAndPassword(email, password).then((userCredential) => {}).then(() => {
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
         googleButton.addEventListener('click', function(e) {
             e.preventDefault()

             const provider = new firebase.auth.GoogleAuthProvider();
             auth.signInWithPopup(provider).then((result) => {
                     signInForm.reset()
                     ui.showToast(true)
                 })
                 .catch(err => {
                     ui.showToast(err)
                     console.log(err)
                 })
         });
     }


     // sign in with Facebook
     const facebookAuthBtn = document.getElementById('facebookAuth')

     if (facebookAuthBtn) {
         facebookAuthBtn.addEventListener('click', function(e) {
             e.preventDefault()

             const provider = new firebase.auth.FacebookAuthProvider();
             auth.signInWithPopup(provider).then((result) => {
                     signInForm.reset()
                     ui.showToast(true)
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
                     signUpForm.reset()
                     ui.showToast(true)
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
             console.log('sign out')
         }).catch((err) => {
             console.log(err)
             ui.showToast('Chau! Espero volver a verte pronto')
         })
     })

     // events
     // list for auth state changes
     auth.onAuthStateChanged((user) => {
         if (user) {
             console.log('signin');
             // db.collection('users')
             //     .get()
             //     .then((snapshot) => {


             //     });
             loginCheck(user)
         } else {
             loginCheck(user)
             console.log("signout");
         }
     });


 });