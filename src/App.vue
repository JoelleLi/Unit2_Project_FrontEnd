<script setup>
import { RouterLink, RouterView, useRouter } from 'vue-router'
import { ref, onMounted, computed } from "vue"
import { useCookies } from "vue3-cookies"
import { decodeCredential } from "vue3-google-login"
const { cookies } = useCookies()

const router = useRouter()
const isLoggedIn = ref(false)
let userName = ""
const userEmail = ref("")
const listingsBe = ref([])
const inputText = ref("")
// const filteredListings = [""]
const searchTerm = ref('')


const fetchData = async () => {
    try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/listings`);
        const result = await response.json();
        listingsBe.value = result;
    } catch (error) {
        console.error("Error fetching data:", error);
    }
}

// const submitForm = async () => {
//   // console.log("form submitted")
//   // console.log("Search term:", inputText.value)

//   await fetchData()

//   // console.log(listingsBe.value)

//   const filteredListings = listingsBe.value.filter(listing => {
//     return listing.name.toLowerCase().includes(inputText.value.toLowerCase())
//   })

//   console.log("Filtered Listings:", filteredListings)
//   // router.push({ name: "searchresults" , params : { filteredList : filteredListings } })
// }

const filteredListings = computed(() => {
  console.log("running")
  const newList = listingsBe.value.filter(listing => 
  listing.name.toLowerCase().includes(searchTerm.value.toLowerCase()))
  console.log(newList)
  return newList
})

const checkSession = () => {
  if( cookies.isKey("user_session") ) {
    isLoggedIn.value = true
    const userData = decodeCredential(cookies.get("user_session"))
    userName = userData.given_name

    userEmail.value = userData.email

    // const myListingsLink = document.getElementById("mylistings-link")
    // myListingsLink.classList = "nav-link"

    // const logOutLink = document.getElementById("login")
    // logOutLink.innerText = "Log Out"
   }
}

onMounted(() => {
    checkSession()
    if (isLoggedIn.value === true) {
      fetch(`${import.meta.env.VITE_API_URL}/listings/mylistings/${userEmail.value}`)

      .then( response => response.json() )
      .then( result => {
          listingsBe.value = result
      })
      .catch(err => console.error(err))
    } else {
      return
    }
})

onMounted(fetchData)

</script>

<template>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Noto+Serif:ital,wght@0,100;1,100&display=swap" rel="stylesheet">
<header>
  
<div class="container ">
  
  <nav class="rounded navbar navbar-expand-lg mt-1 sticky-top" style="background-color: rgba(230, 233, 255, 0.9);">
    <div class="container-fluid ">
      <a class="navbar-brand" href="#">
        <RouterLink to="/">
          <img src="./assets/images/textLogo01.png" alt="shootfinder icon" id="logo">
        </RouterLink>
      </a>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
        <div class="navbar-nav">
          <a class="nav-link" aria-current="page">
            <RouterLink to="/" class="text-primary-emphasis navLink">Home</RouterLink>
          </a>
          <a class="nav-link">
            <RouterLink to="/categories" class="text-primary-emphasis navLink">Categories</RouterLink>
          </a>
          <a class="nav-link">
            <RouterLink to="/mylistings" class="text-primary-emphasis navLink">My Listings</RouterLink>
          </a>
          <a class="nav-link">
            <RouterLink to="/login" class="text-primary-emphasis navLink" id="login">
              {{ isLoggedIn ? 'Log Out' : 'Login' }}
            </RouterLink>          
          </a>
        </div>
      </div>
    </div>
  </nav>

  <RouterView />
</div>

</header>
</template>





