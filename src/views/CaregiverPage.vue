<template>
 <EvaluationsList :id="id" :by="'caregivers'"/>
</template>

<script>
import EvaluationsList from '../components/EvaluationsList.vue';
import { useRoute } from 'vue-router'
import { ref } from "vue"



export default {
    components: { EvaluationsList },
    setup() {
       const route = useRoute()
       const id = ref(route.params.id);

       return { id }
     }
}
</script>

<style>

</style>