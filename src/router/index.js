import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import NewEvaluation from '../views/NewEvaluation.vue'
import SingleEvaluation from '../views/SingleEvaluation.vue'
import CaregiversPage from '../views/CaregiversPage.vue'
import CaregiverPage from '../views/CaregiverPage.vue'
import ChildPage from '../views/ChildPage.vue'


const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path:'/children/:id',
    name: 'child',
    component: ChildPage
  },

  {
    path: '/new-evaluation',
    name: 'new-evaluation',
    component: NewEvaluation
  },
  {
    path:'/evaluations/:id',
    name: 'single-evaluation',
    component: SingleEvaluation,
    props: true
  },
  {
    path:'/caregivers',
    name: 'caregivers',
    component: CaregiversPage
  },
  {
    path:'/caregivers/:id',
    name: 'caregiver',
    component: CaregiverPage
  },

]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
