import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import CartView from '../views/CartView.vue'
import FavoritesView from '../views/FavoritesView.vue'
import GeekView from '../views/GeekView.vue'
import HouseView from '../views/HouseView.vue'
import LithophaneView from '../views/LithophaneView.vue'
import UserProfileView from '../views/UserProfileView.vue'
import AdminProfileView from '../views/AdminProfileView.vue'
import StripeCheckoutView from '@/views/StripeCheckoutView.vue'
import StripeReturnView from '@/views/StripeReturnView.vue'
import DashboardView from '../views/DashboardView.vue'
import { useAuthStore } from '@/stores/AuthStore'
import ResultsPageView from '../views/ResultsPageView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'inicio',
      component: HomeView
    },
    {
      path: '/cart',
      name: 'cart',
      component: CartView,
      meta: {requiresAuth: true}
    },
    
    {
      path:'/Detail/:id_product',
      name: "detail",
      component: () => import('../views/ProductDetailView.vue'),
      props: true
      
    },
    {
      path: '/favorites',
      name: 'favoritos',
      component: FavoritesView,
      meta: {requiresAuth: true}
    },
    {
      path: '/geek',
      name: 'geek',
      component: GeekView
    },
    {
      path: '/house',
      name: 'hogar',
      component: HouseView
    },
    {
      path: '/lithophane',
      name: 'litofanías',
      component: LithophaneView
    },
    {
      path: "/user/profile",
      name: "user-Profile",
      component: UserProfileView,
      props: true,
      meta: {requiresAuth: true}
      
    },
    {
      path: "/admin/profile",
      name: "admin-Profile",
      component: AdminProfileView,
      meta: {requiresAuth: true}
    },
    {
      path: "/stripe-checkout",
      name: "stripe-checkout",
      component: StripeCheckoutView,
    },
    {
      path: "/return",
      name: "return",
      component: StripeReturnView,
    },
	  {
      path: "/dashboard",
      name: "dashboard",
      component: DashboardView,
      meta: {requiresAuth: true}
	  },
    {
      path: '/results',
      name: 'results',
      component: ResultsPageView,
      props: (route) => ({
        name: route.query.name
      })
    }
  ]
});

router.afterEach(() => {
  document.documentElement.scrollTop = 0;
  document.body.scrollTop = 0;
});

router.beforeEach((to) =>{
  const store = useAuthStore()

  if (to.meta.requiresAuth && !store.isAuthenticated){
    alert("debe iniciar sesion")
    return {name: 'inicio'}
  }
})

export default router;
