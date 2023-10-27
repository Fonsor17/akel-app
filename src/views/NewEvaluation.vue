<template>
  <div class="new-evaluation">
    <form @submit.prevent="handleSubmit">
      <label>Caregiver</label>
      <select v-model="caregiver">
        <option disabled value="">Please select one</option>
        <option v-for="caregiver in caregivers" :key="caregiver.id">
          {{ caregiver.name + " " + caregiver.lastname }}
        </option>
      </select>
      <br />
      <label>Child</label>
      <select v-model="child">
        <option disabled value="">Please select one</option>
        <option v-for="child in children" :key="child.id">
          {{ child.name + " " + child.lastname }}
        </option>
      </select>
      <label> "Was the child happy after the session?</label>
      <input
        type="radio"
        name="happiness"
        id="happiness"
        value="yes"
        v-model="happiness"
      />
      <label for="happiness">YES</label>
      <input
        type="radio"
        name="happiness"
        id="happiness"
        value="no"
        v-model="happiness"
      />
      <label for="happiness">NO</label>
      <br />
      <label> "Did the child try to communicate?</label>
      <input
        type="radio"
        name="communication"
        id="communication"
        value="yes"
        v-model="communication"
      />
      <label for="comunication">YES</label>
      <input
        type="radio"
        name="communication"
        id="communication"
        value="no"
        v-model="communication"
      />
      <label for="communication">NO</label>
      <br />
      <label> "Was the session a success?</label>
      <input
        type="radio"
        name="success"
        id="success"
        value="yes"
        v-model="success"
      />
      <label for="success">YES</label>
      <input
        type="radio"
        name="success"
        id="success"
        value="no"
        v-model="success"
      />
      <label for="success">NO</label>
      <br>
      <label for="data">Date:</label>
      <input type="date" id="data" name="data" v-model="date" required>


      <button class="submit">Submit New Evaluation</button>
    </form>
  </div>
</template>

<script>
// import getChildren from "../composables/getChildren";
// import getCollection from "../composables/getCollection";
// import { ref } from "vue";

// import { useRouter } from "vue-router"

export default {
//   setup() {
//     const { children, errorChildren, loadChildren } = getChildren();

//     loadChildren();

//     const { caregivers, errorCaregivers, loadCaregivers } = getCaregivers();

//     loadCaregivers();
    
    
//     const caregiver = ref(null);
//     const child = ref(null);
//     const happiness = ref(null);
//     const communication = ref(null);
//     const success = ref(null);
//     const date = ref(new Date().toISOString().substr(0, 10));
//     const id = ref(null)
//     let redirectURL = ref(null)
//     const router = useRouter()

//     const handleSubmit = async () => {
//       let evaluation = {
//         caregiver: caregiver.value,
//         child: child.value,
//         date: date.value,
//         // converting in boolean yes or no
//         happiness: happiness.value === "yes",
//         communication: communication.value === "yes",
//         success: success.value === "yes",
//       };

//       await fetch("http://localhost:3000/evaluations", {
//   method: "POST",
//   headers: { "Content-Type": "application/json" },
//   body: JSON.stringify(evaluation),
// })
//   .then((response) => {
//     if (!response.ok) {
//       throw new Error('Errore nella richiesta POST');
//     }
//     return response.json();
//   })
//   .then((data) => {
//   id.value = data.id
//   redirectURL.value = '/evaluations/' + data.id
//   router.push({ path: redirectURL.value, query: { evaluation: 'new' } });
//   })
//   .catch((error) => {
//     console.error('Errore durante la richiesta POST:', error);
//   });
//  console.log(redirectURL.value);
 
//     console.log(router);
//     // router.push(redirectURL.value, params: { new: 'tree'})

//       console.log(evaluation);
//       // const router = useRouter()
//       // router.push({ name: })
//       console.log(typeof evaluation.happiness);
//     };

//     return {
//       children,
//       errorChildren,
//       caregivers,
//       errorCaregivers,
//       caregiver,
//       child,
//       happiness,
//       communication,
//       success,
//       date,
//       handleSubmit,
//       redirectURL
//     };
//   },
};
</script>

<style>
form {
  max-width: 480px;
  margin: 0 auto;
  text-align: left;
}
select {
  margin-left: 20px;
}
/* input, textarea {
    display: block;
    margin: 10px 0;
    width: 100%;
    box-sizing: border-box;
    padding: 10px;
    border: 1px solid #eee;
  } */
/* textarea {
    height: 160px;
  } */
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

/* .pill {
    display: inline-block;
    margin: 10px 10px 0 0;
    color: #444;
    background: #ddd;
    padding: 8px;
    border-radius: 20px;
    font-size: 14px;
  } */
</style>
