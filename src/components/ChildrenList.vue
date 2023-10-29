<template>
  <div class="children-list">
      <div class="child"  v-for="child in children" :key="child.id">
     <SingleChild :child="child" />
  </div>
  </div>
  </template>
  
  <script>
  // function to get caregivers list
  import getCollection from "../composables/getCollection";
  //components imports
  import SingleChild from "./SingleChild.vue";
  
  export default {
    components: { SingleChild },
    setup() {
      // get the collection of children from firebase
      const { documents: children } = getCollection("children");
  
      return { children };
    },
  };
  </script>
  
  <style>
  .child {
    list-style-type: none;
    background: #fff;
    padding: 5px 10px;
    border-radius: 6px;
    margin-bottom: 12px;
    display: flex;
    max-width: 400px;
  }
  </style>
  