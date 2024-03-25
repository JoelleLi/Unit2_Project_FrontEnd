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
    console.log(userData)

    console.log(userData.email)

    userEmail.value = userData.email

    // const myListingsLink = document.getElementById("mylistings-link")
    // myListingsLink.classList = "nav-link"

    // const logOutLink = document.getElementById("login")
    // logOutLink.innerText = "Log Out"
   }
}

onMounted(checkSession, fetchData)

</script>

<template>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Noto+Serif:ital,wght@0,100;1,100&display=swap" rel="stylesheet">
<header>
  
<div class="container">
  <div class="row">
    <div class="col-md-2">
      <div class="nav-wrapper2">
        <div id="icon-wrapper" class="col-2">
          <RouterLink to="/">
            <img src="./assets/images/textLogo01.png" alt="shootfinder icon"
            width="100px">
        </RouterLink>
        </div>

        <ul class="nav flex-column">
          <li class="nav-item">
            <a class="nav-link active" aria-current="page">
              <RouterLink to="/" class="text-primary-emphasis">Home</RouterLink>
            </a>
          </li>
          <li class="nav-item">
            <a class="nav-link">
              <RouterLink to="/categories" class="text-primary-emphasis">Categories</RouterLink>
            </a>
          </li>
          <li class="nav-item">
            <a class="nav-link">
              <RouterLink to="/mylistings" class="text-primary-emphasis">My Listings</RouterLink>
            </a>
          </li>
          <li class="nav-item">
            <a class="nav-link">
              <RouterLink to="/newlisting" class="text-primary-emphasis">Add Listing</RouterLink>
            </a>
          </li>
        </ul>

        <div class="login-wrapper">
          <RouterLink to="/login" class="links" id="login">Login</RouterLink>
        </div>
      </div>
    </div>
    <div class="col-md-10 d-flex flex-column" id="main-content-wrapper">
      <div class=row id="header-bar">
        <div class="header-sq col">studios</div>
        <div class="header-sq col">public</div>
        <div class="header-sq col">private</div>
        <div class="header-sq col">nature</div>
        <div class="header-sq col">urban</div>
      </div>
        <RouterView />
    </div>
  </div>
</div>
</header>
</template>





