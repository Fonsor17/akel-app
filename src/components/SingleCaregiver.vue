<template>
  <router-link :to="{ name: 'caregiver', params: { name: caregiver.fullName } }">
    <h3>{{ caregiver.fullName }}</h3>
  </router-link>
</template>

<script>
import { ref } from "vue";

export default {
  props: ["caregiver"],
  setup(props) {
    const caregiver = ref(props.caregiver);

    return caregiver;
  },
};
</script>

<style></style>
