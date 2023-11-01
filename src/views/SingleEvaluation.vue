<template>
  <div class="evaluation-container">
  <div v-if="evaluation" class="evaluation">
    <h3>Evaluation of {{ evaluation.date }}</h3>
    <h3>
      On <span> {{ evaluation.child }}</span>
    </h3>
    <h3>
      By <span> {{ evaluation.caregiver }}</span>
    </h3>
    <div class="questions">
      <p>
        "Was the child happy after the session?
        <span v-if="evaluation.isHappy">Yes</span>
        <span v-else>No</span>
      </p>
      <p>
        "Did the child try to communicate?
        <span v-if="evaluation.isCommunacative">Yes</span>
        <span v-else>No</span>
      </p>
      <p>
        "Was the session a success?
        <span v-if="evaluation.isSuccess">Yes</span>
        <span v-else>No</span>
      </p>
    </div>
    <router-link :to="{ name: 'child', params: { name: evaluation.child }}">
      <button>
        See the other evaluation conducted on {{ evaluation.child }}
      </button>
    </router-link>
  </div>
  <div v-else>Evaluation not found</div>
</div>
  
</template>

<script>
import { ref } from "vue";
import { useRoute } from "vue-router";
// firebase import
import { db } from "../firebase/config";
import { doc, getDoc } from "firebase/firestore";

export default {
  setup() {
    const route = useRoute();
    const evaluation = ref(null);
    // function to get just one evaluation from firestore
    const getEvaluation = async (id) => {
      try {
        const docRef = doc(db, "evaluations", id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          evaluation.value = { ...docSnap.data(), id: docSnap.id };
        } else {
          console.log("document does not exist");
        }
      } catch (error) {
        console.error("Error getting document:", error);
      }
    };

    getEvaluation(route.params.id);

    return { evaluation };
  },
};
</script>

<style>
.evaluation-container {
  display: flex;
  justify-content: center;
}

.evaluation {
  display: flex;
  flex-direction: column;
  gap: 10px;
}
.evaluation p {
  margin: 10px 0;
}
.evaluation h3 {
  font-weight: 700;
}
</style>
