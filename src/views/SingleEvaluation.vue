<template>
    <div class="evaluation">
  <h1>Evaluation of {{ evaluation.date }}</h1>
   <h3>On <span> {{ evaluation.child }}</span></h3>
   <h3>By <span> {{ evaluation.caregiver }}</span></h3>
   <div class="questions">
     <p>"Was the child happy after the session?
        <span v-if="evaluation.happiness">Yes</span>
        <span v-else>No</span>
     </p> 
     <p> "Did the child try to communicate?
        <span v-if="evaluation.communication">Yes</span>
        <span v-else>No</span>
     </p> 
     <p>"Was the session a success?
        <span v-if="evaluation.success">Yes</span>
        <span v-else>No</span>
     </p> 
    </div>
    <router-link :to="{ name: 'child' }">
      <button>See {{ evaluation.child }} evaluations</button>
    </router-link>

 
</div>
</template>

<script>
import getEvaluation from "../composables/getEvaluation"
import { useRoute } from 'vue-router';

export default {
   setup()  {
    const route = useRoute()
    

    console.log(route.path);
    const { evaluation, errorEvaluation, loadEvaluation } = getEvaluation(route.params.id)

   loadEvaluation()

   return { evaluation, errorEvaluation }
   },
}
</script>

<style>

</style>