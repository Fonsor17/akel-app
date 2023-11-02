<template>
  <header>
    <nav v-if="user">
      <router-link :to="{ name: 'new-evaluation' }">New Evaluation</router-link>
      <router-link :to="{ name: 'home' }">Children</router-link>
      <router-link :to="{ name: 'caregivers' }">Caregivers</router-link>
      <!--conditionally show the user's e-mail and logout button if the user is logged-->
      <div class="logged-in">
        <p>{{ user.email }}</p>
        <button @click="handleClick" class="logout">
          Logout <i class="fa-solid fa-right-from-bracket"></i>
        </button>
      </div>
    </nav>
    <!--conditionally show login and sign up link if the user is not logged-->
    <div v-if="!user" class="auth">
      <router-link to="/login">Login</router-link>
      <router-link to="/signup">Signup</router-link>
    </div>
  </header>
</template>

<script>
import getUser from "../composables/getUser";
import { useRouter, useRoute } from "vue-router";
import { watchEffect } from "vue";
// firebase imports
import { auth } from "../firebase/config";
import { signOut } from "firebase/auth";

export default {
  setup() {
    const { user } = getUser();
    const router = useRouter();
    const route = useRoute();

    const handleClick = () => {
      console.log("logout");
      signOut(auth);
    };

    console.log(route.path);

    // redirect always to login when user is not logged except when on signup page
    watchEffect(() => {
      if (!user.value && route.path != "/signup") {
        router.push("/login");
      }
    });

    return { handleClick, user };
  },
};
</script>

<style>
header {
  position: relative;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
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
}
header a.router-link-active {
  color: #444;
  font-weight: bold;
}
.logged-in {
  display: flex;
  gap: 10px;
  position: absolute;
  top: 5px;
  right: 3px;
}
.logged-in > button {
  font-size: 13px;
  padding: 5px;
  margin: 0px;
}
.logged-in p {
  font-size: 14px;
  color: #bbb;
}
nav {
  margin-top: 30px;
  display: flex;
  gap: 50px;
}
nav a {
  color: #bbb;
}

.auth {
  display: flex;
  gap: 30px
}
</style>
