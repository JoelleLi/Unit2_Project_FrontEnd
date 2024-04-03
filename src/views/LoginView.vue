<script setup>
import router from "@/router";
import { ref, onMounted } from "vue"
import { useCookies } from "vue3-cookies"
import { decodeCredential, googleLogout } from "vue3-google-login"
import LoginMessage from "@/components/LoginMessage.vue"

const { cookies } = useCookies()

// by default, logged in is false
let isLoggedIn = ref(false)
let userName = ""


// function that will run if google login is successful
const callback =  (response) => {
    isLoggedIn.value = true
    const userData = decodeCredential(response.credential)
    console.log(userData)
    userName = userData.given_name
    // set the cookie, storing google's credential
    cookies.set("user_session", response.credential)
    fetch(`${import.meta.env.VITE_API_URL}/user/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            userEmail: userData.email
        })
    })
    .then(() => {
        console.log("session saved")
        window.location.reload()
        // router.push("/login")

    })
    .catch( err => console.error(err) )
}

const checkSession = () => {
    if( cookies.isKey("user_session") ) {
        isLoggedIn.value = true
        const userData = decodeCredential(cookies.get("user_session"))
        userName = userData.given_name
        const loginText = document.getElementById("login")

        loginText.innerText = "Log Out"
    }
}

// const handleLogout = async () => {
//     await googleLogout()
//     cookies.remove("user_session")
//     isLoggedIn.value = false
// }
const handleLogout = async () => {
    await googleLogout()
    cookies.remove("user_session")
    isLoggedIn.value = false
    const loginHeader = document.getElementById("login")
    // Reload the page to reset the application state
    router.push("/")
    loginHeader.innerText = "Log In"
}

onMounted(checkSession)

</script>

<template>
    <div class="login-page">

    <div v-if="!isLoggedIn">
        <LoginMessage />
    </div>

    <div v-if="isLoggedIn" class="mt-3">
        <h4>Hello, {{ userName }}</h4>
        <hr>
        <button type="button" class="btn logButton" @click="handleLogout">Log Out</button>


    </div>
    <div v-else>
        <GoogleLogin :callback="callback" />
    </div>
    </div>
</template>