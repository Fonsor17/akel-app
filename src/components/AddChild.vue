<template>
  <button @click="isShown = !isShown">
    Add Child<i class="fa-solid fa-person-circle-plus"></i>
  </button>
  <div class="add-child" v-if="isShown">
    <form @submit.prevent="handleSubmit" v-if="!confirmed">
      <label>Name</label>
      <input type="text" v-model="childName" required />
      <label>Lastname</label>
      <input type="text" v-model="childLastname" required />
      <button>Add Child</button>
    </form>
    <div v-else class="confirmed">
      <h1>New Child Added:</h1>
      <p>{{ childName + " " + childLastname }}</p>
      <button @click="close">Close</button>
    </div>

    <div class="close" @click="close">
      <i class="fa-solid fa-xmark"></i>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import getUser from "../composables/getUser";
// firebase imports
import { db } from "../firebase/config";
import { collection, addDoc } from "firebase/firestore";

export default {
  setup() {
    const isShown = ref(false);
    const confirmed = ref(false);

    const { user } = getUser();
    const childName = ref("");
    const childLastname = ref("");

    // function to add the caregiver under the user Uid
    const handleSubmit = async () => {
      const colRef = collection(db, "children");

      await addDoc(colRef, {
        fullName: childName.value + " " + childLastname.value,
        userUid: user.value.uid,
      });

      confirmed.value = !confirmed.value;
      childName.value = "";
      childLastname.value  = ""
    };

    const close = () => {
      isShown.value = !isShown.value;
      confirmed.value = false;
    };

    return {
      childName,
      childLastname,
      handleSubmit,
      confirmed,
      isShown,
      close,
    };
  },
};
</script>

<style scoped>
.confirmed {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  color: white;
}
p {
  color: #008cff;
}

h1 {
  display: inline-block;
  margin-top: 30px;
  position: relative;
  font-size: 20px;
  color: #008cff;
  margin-bottom: 10px;
}
.add-child {
  background-color: white;
  border-radius: 12px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 350px;
  text-align: center;
  padding: 30px 30px 40px 30px;
  border: 1px solid #008cff;
}
form {
  max-width: 480px;
  margin: 0 auto;
  text-align: left;
}
input,
textarea {
  display: block;
  margin: 10px 0;
  width: 100%;
  box-sizing: border-box;
  padding: 10px;
  border: 1px solid #eee;
}
label {
  width: 150px;
  display: inline-block;
  margin-top: 30px;
  position: relative;
  font-size: 20px;
  color: white;
  margin-bottom: 10px;
}
label::before {
  content: "";
  display: block;
  width: 100%;
  height: 100%;
  background: #008cff;
  position: absolute;
  border-radius: 0px 6px 6px 0px;
  z-index: -1;
  padding-right: 40px;
  left: -30px;
}
.add-child button {
  display: block;
  margin-top: 40px;
  border: none;
  padding: 8px 16px;
  font-size: 18px;
}

.fa-solid {
  margin-left: 10px;
  font-size: 24px;
}
.close {
  cursor: pointer;
  font-size: 36px;
  color: #008cff;
  position: absolute;
  top: 0px;
  right: 10px;
}
.close .fa-solid {
  font-size: 36px;
}
</style>
