import { createRouter, createWebHistory } from 'vue-router'
import HomeView from "../views/HomeView.vue"
import ListingListView from "../views/ListingListView.vue"
import SingleListingView from "../views/SingleListingView.vue"
import ListingEditView from "../views/ListingEditView.vue"
import LoginView from "@/views/LoginView.vue"


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/listings',
      name: 'listings',
      component: ListingListView
    },
    {
      path: '/listings/:id',
      name: 'singlelisting',
      component: SingleListingView
    },
    {
      path: "/listings/update/:id",
      name: "editlisting",
      component: ListingEditView
    },
    {
      path: "/login",
      name: "login",
      component: LoginView
    }
  ]
})

export default router
