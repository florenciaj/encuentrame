import { UI } from './UI.js';


// see password function
let checkboxLogin = document.getElementById('checkboxPasswordLogin')
let checkboxSignup = document.getElementById('checkboxPasswordSignup')

checkboxSignup.addEventListener('click', function() {
    let signupPassword = document.getElementById('signupPassword')
    changePasswordVisibility(signupPassword)
})

checkboxLogin.addEventListener('click', function() {
    let loginPassword = document.getElementById('loginPassword')
    changePasswordVisibility(loginPassword)
})

function changePasswordVisibility(passwordInput) {
    if (passwordInput.type === 'password') {
        passwordInput.type = 'text'
    } else {
        passwordInput.type = 'password'
    }
}


const loggedOutLinks = document.querySelectorAll('.loggedOut')
const loggedInLinks = document.querySelectorAll('.loggedIn')
const logBtn = document.getElementById('log')
const outBtn = document.getElementById('logout')
const loginCheck = (user) => {
    if (user) {
        /* display logout button if user is loggedIn */
        logBtn.style.display = 'none'
        outBtn.style.display = 'block'
    } else {
        /* not display buttons if user is not logged in and show logout */
        logBtn.style.display = 'block'
        outBtn.style.display = 'none'
    }
};


// log in
const logInForm = document.getElementById('logInForm')

logInForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const email = logInForm['loginEmail'].value
    const password = logInForm['loginPassword'].value

    /* authenticate user */
    auth.signInWithEmailAndPassword(email, password).then((userCredential) => {
        logInForm.reset()
        $('#modalForm').modal('hide')
        showToast(true)
    });
});

// log in with Google
const googleButton = document.querySelectorAll(".googleAuth")

googleButton.forEach(function(element) {
    let facebookAuthBtn = document.getElementById(element.id)
    facebookAuthBtn.addEventListener('click', function(e) {
        e.preventDefault()
        logInForm.reset()

        const provider = new firebase.auth.GoogleAuthProvider();
        auth.signInWithPopup(provider).then((result) => {
                $('#modalForm').modal('hide')
                showToast(true)
            })
            .catch(err => {
                $('#modalForm').modal('hide')
                showToast(false)
                console.log(err)
            })
    });
});


// log in with Facebook
const facebookButton = document.querySelectorAll('.facebookAuth')

facebookButton.forEach(function(element) {
    let facebookAuthBtn = document.getElementById(element.id)

    facebookAuthBtn.addEventListener('click', function(e) {
        e.preventDefault()
        logInForm.reset()

        const provider = new firebase.auth.FacebookAuthProvider();
        auth.signInWithPopup(provider).then((result) => {
                $('#modalForm').modal('hide')

                showToast(true)
            })
            .catch(err => {
                $('#modalForm').modal('hide')
                console.log(err)
                showToast(false)
            })
    });
});


// sign up
const signUpForm = document.querySelector('#signupForm')

signUpForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const email = signUpForm['signupEmail'].value
    const password = signUpForm['signupPassword'].value

    auth
        .createUserWithEmailAndPassword(email, password)
        .then((userCredential) => {
            /* references a new document with a new specific unique id (user id) */
            return db.collection('users').doc(userCredential.user.uid).set({
                name: signUpForm['loginName'].value,
                number: signUpForm['loginNumber'].value
            })
        }).then(() => {
            signUpForm.reset()
            $('#signupModal').modal('hide')
        });
});

// log out
const logout = document.querySelector("#logout")

logout.addEventListener("click", (e) => {
    e.preventDefault();
    auth.signOut().then(() => {
        console.log("signup out");
    });
});

// events
// list for auth state changes
auth.onAuthStateChanged((user) => {
    if (user) {
        console.log("signin");
        db.collection("posts")
            .get()
            .then((snapshot) => {
                loginCheck(user);
            });
    } else {
        console.log("signout");
        loginCheck(user);
    }
});

function showToast(result) {
    let user = firebase.auth().currentUser;
    let userName = user.displayName;
    let ui = new UI();
    if (result)
        ui.showToastMessage(userName)
    else
        ui.showToastErrorMessage('inténtalo nuevamente')
};