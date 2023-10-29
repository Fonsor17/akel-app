<template>
  <div class="new-evaluation">
    <form @submit.prevent="handleSubmit">
      <label>Caregiver</label>
      <select v-model="caregiver" required>
        <option disabled value="">Please select one</option>
        <option v-for="caregiver in caregivers" :key="caregiver.id">
          {{ caregiver.fullName }}
        </option>
      </select>
      <br />
      <label>Child</label>
      <select v-model="child" required>
        <option disabled value="">Please select one</option>
        <option v-for="child in children" :key="child.id">
          {{ child.fullName }}
        </option>
      </select>
      <label> "Was the child happy after the session?</label>
      <input
        type="radio"
        name="happiness"
        id="happiness"
        value="yes"
        v-model="isHappy"
      />
      <label for="happiness">YES</label>
      <input
        type="radio"
        name="happiness"
        id="happiness"
        value="no"
        v-model="isHappy"
      />
      <label for="happiness">NO</label>
      <br />
      <label> "Did the child try to communicate?</label>
      <input
        type="radio"
        name="communication"
        id="communication"
        value="yes"
        v-model="isCommunicative"
      />
      <label for="comunication">YES</label>
      <input
        type="radio"
        name="communication"
        id="communication"
        value="no"
        v-model="isCommunicative"
      />
      <label for="communication">NO</label>
      <br />
      <label> "Was the session a success?</label>
      <input
        type="radio"
        name="success"
        id="success"
        value="yes"
        v-model="isSuccess"
      />
      <label for="success">YES</label>
      <input
        type="radio"
        name="success"
        id="success"
        value="no"
        v-model="isSuccess"
      />
      <label for="success">NO</label>
      <br />
      <label for="data">Date:</label>
      <input type="date" id="data" name="data" v-model="date" required />

      <button class="submit">Submit New Evaluation</button>
    </form>
    <div class="confirmation" v-if="isShown">
      <h3>New evaluation added</h3>
      <div>
        <button @click="redirect">See Evaluation</button>
        <button @click="isShown = !isShown">Close</button>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import { useRouter } from "vue-router";
import getUser from "../composables/getUser";
import getCollection from "../composables/getCollection";
// firebase imports
import { db } from "../firebase/config";
import { collection, addDoc } from "firebase/firestore";

export default {
  setup() {
    const router = useRouter();
    // get the collection of caregivers to show them as options
    const { documents: caregivers } = getCollection("caregivers");

    // get the collection of children to show them as options
    const { documents: children } = getCollection("children");
    // to conditionally show the confirmation of submitted form
    let isShown = ref(false);
    let redirectURL = ref(null);

    // all proprieties needed for th evaluation object
    const { user } = getUser();
    const caregiver = ref("");
    const child = ref("");
    const date = ref(null);
    const isHappy = ref(null);
    const isCommunicative = ref(null);
    const isSuccess = ref(null);

    //function to submit the evaluation
    const handleSubmit = async () => {
      const colRef = collection(db, "evaluations");

      const docRef = await addDoc(colRef, {
        caregiver: caregiver.value,
        child: child.value,
        date: date.value,
        isHappy: isHappy.value === "yes",
        isCommunicative: isCommunicative.value === "yes",
        isSuccess: isSuccess.value === "yes",
        userUid: user.value.uid,
      });
      redirectURL = "/evaluations/" + docRef.id;
      isShown.value = !isShown.value;
      console.log(docRef.id);
    };
    // function to redirect to the evaluation page
    const redirect = () => {
      router.push({ path: redirectURL });
    };

    return {
      children,
      caregivers,
      handleSubmit,
      caregiver,
      child,
      date,
      isHappy,
      isCommunicative,
      isSuccess,
      isShown,
      redirect,
    };
  },
};
</script>

<style>
.confirmation {
  background-color: #008cff;
  border-radius: 12px;
  position: fixed;
  bottom: 20%;
  right: 0%;
  transform: translate(-50%, -50%);
  width: 350px;
  text-align: center;
  padding: 30px 30px 40px 30px;
  color: white;
}

.confirmation button {
  display: block;
  margin-top: 60px;
  background: white;
  color: #008cff;
  border: none;
  padding: 8px 16px;
  font-size: 18px;
}

.confirmation div {
  display: flex;
  justify-content: space-between;
}
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
