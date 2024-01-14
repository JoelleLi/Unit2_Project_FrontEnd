<script setup>
import { ref, onMounted } from "vue"
import { useCookies } from "vue3-cookies"
import { decodeCredential, googleLogout } from "vue3-google-login"

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
    })
    .catch( err => console.error(err) )
}

const checkSession = () => {
    if( cookies.isKey("user_session") ) {
        isLoggedIn.value = true
        const userData = decodeCredential(cookies.get("user_session"))
        userName = userData.given_name
    }
}

const handleLogout = () => {
    googleLogout()
    cookies.remove("user_session")
    isLoggedIn.value = false
}

onMounted(checkSession)

</script>

<template>
    <h1>Login</h1>
    <div v-if="isLoggedIn">
        <h2>Hello {{ userName }}</h2>
        <button @click="handleLogout">Log Out</button>
    </div>
    <div v-else>
        <GoogleLogin :callback="callback" />
    </div>
</template>