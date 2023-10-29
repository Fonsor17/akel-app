<template>
  <header>
    <nav v-if="user">
      <router-link :to="{ name: 'new-evaluation' }">New Evaluation</router-link>
      <router-link :to="{ name: 'home' }">Children</router-link>
      <router-link :to="{ name: 'caregivers' }">Caregivers</router-link>
      <div>
        <button @click="handleClick">Logout</button>
        <div>logged as {{ user.email }}</div>
      </div>
      
    </nav>
    <div v-if="!user">
      <router-link to="/login">Login</router-link>
      <router-link to="/signup">Signup</router-link>
    </div>
  </header>
</template>

<script>
import getUser from '../composables/getUser'
import { useRouter, useRoute } from 'vue-router'
import { watchEffect } from 'vue'
// firebase imports
import { auth } from '../firebase/config'
import { signOut } from 'firebase/auth'

export default {
setup() {
  const { user } = getUser()
  const router = useRouter()
  const route = useRoute()

  const handleClick = () => {
      console.log('logout');
      signOut(auth)
    }

    console.log(route.path);

  // redirect always to login when user is not logged except when on signup page
    watchEffect(() => {
      if(!user.value && route.path != '/signup') {
        router.push('/login')
      }
    })

  return { handleClick, user }
 }

};
</script>

<style>
header {
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  /* max-width: 1200px; */
  margin: 0 auto;
  padding: 10px;
}
header h1 {
  color: #dfdfdf;
  font-size: 48px;
}
header a {
  color: #bbb;
  text-decoration: none;
  margin-left: 20px;
}
header a.router-link-active {
  color: #444;
  font-weight: bold;
}
</style>
