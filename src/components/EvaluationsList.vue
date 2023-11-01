<template>
  <div class="intro">
  <p v-if="by === 'caregivers'">Evaluations conducted by <br>{{ name }}:</p>
  <p v-if="by === 'children'">Evaluations conducted on <br>{{ name }}:</p>
  <router-link :to="{ name: 'new-evaluation' }">
    <button class="add-evaluation">Add Evaluation<i class="fa-solid fa-file-circle-plus"></i></button>
  </router-link>
</div>
  <!-- <h3 v-if="evaluations && evaluations.length === 0"> 
    No {{ name }}' evaluations found
  </h3> -->
  <EvaluationCard
    v-for="evaluation in evaluations"
    :key="evaluation.id"
    :evaluation="evaluation"
  />
</template>

<script>
//component import
import EvaluationCard from "./EvaluationCard.vue";
//function import to get the evaluations
import getCollection from "../composables/getCollection";

export default {
  props: ["name", "by"],
  components: { EvaluationCard },
  setup(props) {
    //if the evaluations must be get by caregiver
    if (props.by === "caregivers") {
      const { documents: evaluations } = getCollection("evaluations", [
        "caregiver",
        "==",
        props.name,
      ]);
      console.log("evaluations:");
      console.log(evaluations);
      return { evaluations };
    } else {
      //if the evaluations must be get by children
      const { documents: evaluations } = getCollection("evaluations", [
        "child",
        "==",
        props.name,
      ]);
      return { evaluations };
    }
  },
};
</script>

<style scoped>
p {
  margin-bottom: 10px;
  font-weight: 600;
}

.intro {
  max-width: 400px;
  display: flex;
  gap: 20px;
  justify-content: space-between;
}

.intro button {
  margin: 0px
}

.add-evaluation {
 padding: 6px;
}
.fa-solid {
  margin-left: 10px;
}
</style>
