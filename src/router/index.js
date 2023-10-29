import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import NewEvaluation from '../views/NewEvaluation.vue'
import SingleEvaluation from '../views/SingleEvaluation.vue'
import CaregiversPage from '../views/CaregiversPage.vue'
import CaregiverPage from '../views/CaregiverPage.vue'
import ChildPage from '../views/ChildPage.vue'
import SignupUser from '../views/SignupUser.vue'
import LoginUser from '../views/LoginUser.vue'

// firebase import
import { auth } from '../firebase/config'

const requireAuth = (to, from, next) => {
  let user = auth.currentUser
  if (!user) {
    // redirect them 
    next({ name: 'Login' })
  } else {
    next()
  }
}


const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
    beforeEnter: requireAuth
  },
  {
    path: '/login',
    name: 'Login',
    component: LoginUser
  },
  {
    path: '/signup',
    name: 'Signup',
    component: SignupUser
  },
  {
    path:'/children/:name',
    name: 'child',
    component: ChildPage,
    beforeEnter: requireAuth
  },

  {
    path: '/new-evaluation',
    name: 'new-evaluation',
    component: NewEvaluation,
    beforeEnter: requireAuth
  },
  {
    path:'/evaluations/:id',
    name: 'single-evaluation',
    component: SingleEvaluation,
    beforeEnter: requireAuth,
    props: true
  },
  {
    path:'/caregivers',
    name: 'caregivers',
    component: CaregiversPage,
    beforeEnter: requireAuth
  },
  {
    path:'/caregivers/:name',
    name: 'caregiver',
    component: CaregiverPage,
    beforeEnter: requireAuth
  },

]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
