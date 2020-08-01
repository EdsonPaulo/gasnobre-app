// Firebase App (the core Firebase SDK) is always required and must be listed first
import * as firebase from "firebase/app"


import "firebase/auth"
import "firebase/firestore"

const firebaseConfig = {
    apiKey: "AIzaSyBPWuICePw26MQgTHBosbzXn7pfMSLfHS4",
    authDomain: "gasnobre-c0671.firebaseapp.com",
    databaseURL: "https://gasnobre-c0671.firebaseio.com",
    projectId: "gasnobre-c0671",
    storageBucket: "gasnobre-c0671.appspot.com",
    messagingSenderId: "477628288432",
    appId: "1:477628288432:web:a3960e2f80139b5f685a75",
    measurementId: "G-9F8ZXG21XY"
}

// Initialize Firebase
firebase.initializeApp(firebaseConfig)
firebase.analytics()


var phoneNumber = "942682194"
//var appVerifier = window.recaptchaVerifier
firebase.auth().signInWithPhoneNumber(phoneNumber
    //, appVerifier
)
    .then(function (confirmationResult) {
        // SMS sent. Prompt user to type the code from the message, then sign the
        // user in with confirmationResult.confirm(code).
        //      window.confirmationResult = confirmationResult
    }).catch(function (error) {
        // Error SMS not sent
        // ...
    })


var code = "123456" //digitado pelo user
confirmationResult.confirm(code).then(function (result) {
    // User signed in successfully.
    var user = result.user
    // ...
}).catch(function (error) {
    // User couldn't sign in (bad verification code?)
    // ...
})

firebase.auth().signOut().then(function () {
    // Sign-out successful.
}).catch(function (error) {
    // An error happened.
})