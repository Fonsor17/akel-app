<template>
  <div class="children-list">
      <div class="child"  v-for="child in children" :key="child.id">
     <SingleChild :child="child"/>
  </div>
  </div>
  </template>
  
  <script>
  import { ref } from "vue";
//   import getChildren from "../composables/getChildren";
  import SingleChild from "./SingleChild.vue";

  // firebase imports
import { db } from '../firebase/config'
import { collection, getDocs } from 'firebase/firestore'

  
  
  export default {
    component: { SingleChild },
      setup() {
        const children = ref([])

    const colRef = collection(db, 'children')

    getDocs(colRef)
      .then(snapshot => {
        let docs = []
        snapshot.docs.forEach(doc => {
          docs.push({ ...doc.data(), id: doc.id })
        })
        children.value = docs
      })

    return { children }
  }
}
  </script>
  
  
  <style>
  
  </style>