<template>
  <div class="new-evaluation">
    <form @submit.prevent="handleSubmit">
      <div class="custom-dropdown">
        <label>Caregiver:</label>
        <select v-model="caregiver" required>
          <option disabled value="">Please select one</option>
          <option v-for="caregiver in caregivers" :key="caregiver.id">
            {{ caregiver.fullName }}
          </option>
        </select>
      </div>
      <div class="custom-dropdown">
        <label>Child:</label>
        <select v-model="child" required>
          <option disabled value="">Please select one</option>
          <option v-for="child in children" :key="child.id">
            {{ child.fullName }}
          </option>
        </select>
      </div>
      <div class="question">
        <label> "Was the child happy after the session?</label>
        <div class="answers">
          <div>
            <input
              type="radio"
              name="happiness"
              id="happiness"
              value="yes"
              v-model="isHappy"
            />
            <label for="happiness">YES</label>
          </div>
          <div>
            <input
              type="radio"
              name="happiness"
              id="happiness"
              value="no"
              v-model="isHappy"
            />
            <label for="happiness">NO</label>
          </div>
        </div>
      </div>
      <div>
        <div class="question">
          <label> "Did the child try to communicate?</label>
          <div class="answers">
            <div>
              <input
                type="radio"
                name="communication"
                id="communication"
                value="yes"
                v-model="isCommunicative"
              />
              <label for="comunication">YES</label>
            </div>
            <div>
              <input
                type="radio"
                name="communication"
                id="communication"
                value="no"
                v-model="isCommunicative"
              />
              <label for="communication">NO</label>
            </div>
          </div>
        </div>
        <br />
        <div>
          <div class="question">
            <label> "Was the session a success?</label>
            <div class="answers">
              <div>
                <input
                  type="radio"
                  name="success"
                  id="success"
                  value="yes"
                  v-model="isSuccess"
                />
                <label for="success">YES</label>
              </div>
              <div>
                <input
                  type="radio"
                  name="success"
                  id="success"
                  value="no"
                  v-model="isSuccess"
                />
                <label for="success">NO</label>
              </div>
            </div>
          </div>
        </div>
      </div>
      <br />
      <div class="date">
        <label for="data">Date:</label>
        <input type="date" id="data" name="data" v-model="date" required />
      </div>

      <button class="submit">Submit New Evaluation</button>
    </form>
    <div class="confirmation" v-if="isShown">
      <h2>New evaluation added</h2>
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
    const date = ref(new Date().toISOString().substr(0, 10));
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
  left: 50%;
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

.new-evaluation {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.new-evaluation form {
  max-width: 480px;
  margin: 0 auto;
  text-align: left;
}
label {
  margin-bottom: 20px;
  font-weight: 600;
}

.custom-dropdown {
  width: 250px;
  display: flex;
  flex-direction: column;
  position: relative;
  vertical-align: middle;
  margin: 10px 10px 30px 10px;
}

.custom-dropdown select {
  background-color: #008cff;
  color: #fff;
  font-size: inherit;
  padding: 0.5em;
  padding-right: 2.5em;
  border: 0;
  margin: 0;
  border-radius: 3px;
  text-indent: 0.01px;
  text-overflow: "";
}

.custom-dropdown::before,
.custom-dropdown::after {
  content: "";
  position: absolute;
  pointer-events: none;
}

.custom-dropdown::after {
  /*  Custom dropdown arrow */
  content: "\25BC";
  height: 1em;
  font-size: 0.625em;
  line-height: 1;
  right: 1.2em;
  top: 50%;
  margin-top: -0.5em;
}

.custom-dropdown select[disabled] {
  color: rgba(0, 0, 0, 0.3);
}

.custom-dropdown select[disabled]::after {
  color: rgba(0, 0, 0, 0.1);
}

.custom-dropdown::before {
  background-color: rgba(0, 0, 0, 0.15);
}

.custom-dropdown::after {
  color: rgba(0, 0, 0, 0.4);
}

.question {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.answers {
  display: flex;
  justify-content: center;
  gap: 20px;
}

.date {
  display: flex;
  flex-direction: column;
}

</style>
