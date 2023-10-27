<template>
<div class="add-caregiver">
    <form @submit.prevent="handleSubmit" v-if="!confirmed">
        <label>Name</label>
        <input type="text" v-model="newCaregiverName" required>
        <label>Lastname</label>
        <input type="text" v-model="newCaregiverLastname" required>
        <button>Add Caregiver</button>
    </form>
    <div v-else class="confirmed">
        <h1>New Caregiver Added:</h1>
        <p>{{ newCaregiverName + newCaregiverLastname }}</p>
        <button @click="refresh">Close</button>
    

    </div>
   
</div>
</template>

<script>
import { ref } from "vue";
// import { useRouter } from "vue-router"

export default {
    setup() {
        const confirmed = ref(false)
        const newCaregiverName = ref('')
    const newCaregiverLastname = ref('')
    // const router = useRouter()

     const handleSubmit = async () => {
        
        const caregiver = {
            name: newCaregiverName.value,
            lastname: newCaregiverLastname.value
        }
      await fetch('http://localhost:3000/caregivers', {
        method: "POST",
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify(caregiver)
      })

      confirmed.value = !confirmed.value

      
    //   console.log(router);

    // refreshPage()
     }
     const refresh = () => {
       window.location.reload();
    }

      return { newCaregiverName, newCaregiverLastname, handleSubmit, confirmed, refresh }

     }
   



}
</script>

<style scoped>

.confirmed {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
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
    padding: 30px 30px 40px 30px
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
button {
  
  display: block;
  margin-top: 60px;
  background: white;
  color: #008cff;
  border: none;
  padding: 8px 16px;
  font-size: 18px;
}

</style>