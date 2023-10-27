<template>
    <div class="add-child">
        <form @submit.prevent="handleSubmit" v-if="!confirmed">
            <label>Name</label>
            <input type="text" v-model="newChildName" required>
            <label>Lastname</label>
            <input type="text" v-model="newChildLastname" required>
            <button>Add Child</button>
        </form>
        <div v-else class="confirmed">
            <h1>New Caregiver Added:</h1>
            <p>{{ newChildName + newChildLastname }}</p>
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
            const newChildName = ref('')
        const newChildLastname = ref('')
        // const router = useRouter()
    
         const handleSubmit = async () => {
            
            const child = {
                name: newChildName.value,
                lastname: newChildLastname.value
            }
          await fetch('http://localhost:3000/children', {
            method: "POST",
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify(child)
          })
    
          confirmed.value = !confirmed.value
    
          
        //   console.log(router);
    
        // refreshPage()
         }
         const refresh = () => {
           window.location.reload();
        }
    
          return { newChildName, newChildLastname, handleSubmit, confirmed, refresh }
    
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
    .add-child {
        background-color: aqua;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 400px;
        text-align: center;
        padding: 40px 30px 70px 30px
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
      z-index: -1;
      padding-right: 40px;
      left: -30px;
      transform: rotateZ(-1.5deg);
    }
    button {
      
      display: block;
      margin-top: 60px;
      background: #008cff;
      color: white;
      border: none;
      padding: 8px 16px;
      font-size: 18px;
    }
    
    </style>