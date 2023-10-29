<template>
  <div class="caregivers-list">
    <div class="caregiver" v-for="caregiver in caregivers" :key="caregiver.id">
      <SingleCaregiver :caregiver="caregiver" />
    </div>
  </div>
</template>

<script>
// function to get caregivers list
import getCollection from "../composables/getCollection";
//components imports
import SingleCaregiver from "./SingleCaregiver.vue";

export default {
  components: { SingleCaregiver },
  setup() {
    // get the collection of caregivers from firebase
    const { documents: caregivers } = getCollection("caregivers");

    return { caregivers };
  },
};
</script>

<style>
.caregiver {
  list-style-type: none;
  background: #fff;
  padding: 5px 10px;
  border-radius: 6px;
  margin-bottom: 12px;
  display: flex;
  max-width: 400px;
}
</style>
