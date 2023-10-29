<template>
  <button @click="isShown = !isShown">Add Caregiver</button>
  <div class="add-caregiver" v-if="isShown">
    <form @submit.prevent="handleSubmit" v-if="!confirmed">
      <label>Name</label>
      <input type="text" v-model="caregiverName" required />
      <label>Lastname</label>
      <input type="text" v-model="caregiverLastname" required />
      <button>Add Caregiver</button>
    </form>
    <div v-else class="confirmed">
      <h1>New Caregiver Added:</h1>
      <p>{{ caregiverName + caregiverLastname }}</p>
      <button @click="isShown = !isShown">Close</button>
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
    const caregiverName = ref("");
    const caregiverLastname = ref("");

    // function to add the caregiver under the user Uid
    const handleSubmit = async () => {
      const colRef = collection(db, "caregivers");

      await addDoc(colRef, {
        fullName: caregiverName.value + " " + caregiverLastname.value,
        userUid: user.value.uid,
      });

      confirmed.value = !confirmed.value;
    };

    return {
      caregiverName,
      caregiverLastname,
      handleSubmit,
      confirmed,
      isShown,
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
h1 {
  display: inline-block;
  margin-top: 30px;
  position: relative;
  font-size: 20px;
  color: white;
  margin-bottom: 10px;
}
h1::before {
  content: "";
  display: block;
  width: 100%;
  height: 100%;
  background: #008cff;
  position: absolute;
  z-index: -1;
  padding-right: 40px;
  left: -30px;
  transform: rotateZ(-1.5deg);
}
.add-caregiver {
  background-color: #008cff;
  border-radius: 12px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 350px;
  text-align: center;
  padding: 30px 30px 40px 30px;
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
  display: inline-block;
  margin-top: 30px;
  position: relative;
  font-size: 20px;
  color: #008cff;
  margin-bottom: 10px;
}
label::before {
  content: "";
  display: block;
  width: 100%;
  height: 100%;
  background: white;
  position: absolute;
  z-index: -1;
  padding-right: 40px;
  left: -30px;
  transform: rotateZ(-1.5deg);
}
.add-caregiver button {
  display: block;
  margin-top: 60px;
  background: white;
  color: #008cff;
  border: none;
  padding: 8px 16px;
  font-size: 18px;
}
</style>
