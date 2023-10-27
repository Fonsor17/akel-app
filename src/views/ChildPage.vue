<template>
    <h3>Evaluations conducted by</h3>
    <EvaluationsList :id="id" :by="'children'"/>
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