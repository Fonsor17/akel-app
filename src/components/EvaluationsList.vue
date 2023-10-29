<template>
  <p v-if="by === 'caregivers'">Evaluation conducted by {{ name }}:</p>
  <p v-if="by === 'children'">Evaluation conducted on {{ name }}:</p>
  <h3 v-if="evaluations && evaluations.length === 0"> 
    No {{ name }}' evaluations found
  </h3>
  <EvaluationCard
    v-for="evaluation in evaluations"
    :key="evaluation.id"
    :evaluation="evaluation"
  />
  <router-link :to="{ name: 'new-evaluation' }">
    <button class="add-evaluation">Add Evaluation</button>
  </router-link>
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
}
</style>
