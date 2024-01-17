import { createRouter, createWebHistory } from 'vue-router'
import HomeView from "../views/HomeView.vue"
import ListingListView from "../views/ListingListView.vue"
import SingleListingView from "../views/SingleListingView.vue"
import ListingEditView from "../views/ListingEditView.vue"
import LoginView from "@/views/LoginView.vue"
import MyListingListView from "@/views/MyListingListView.vue"
import CategoriesView from "@/views/CategoriesView.vue"
import CategoriesCityView from "@/views/CategoriesCityView.vue"
import AddPhotosView from "@/views/AddPhotosView.vue"

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
      path: '/mylistings',
      name: 'mylistings',
      component: MyListingListView
    },
    {
      path: "/listings/:id/photos/",
      name: "addphotos",
      component: AddPhotosView
    },
    {
      path: '/categories',
      name: 'categories',
      component: CategoriesView
    },
    {
      path: '/categories/city/:city',
      name: 'categoriescity',
      component: CategoriesCityView
    },
    {
      path: "/login",
      name: "login",
      component: LoginView
    }
  ]
})

export default router
