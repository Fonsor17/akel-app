<template>
  <router-link :to="{ name: 'caregiver', params: { id: caregiver.id } }">
  <h3>{{ caregiver.fullName }}</h3>
  </router-link>
</template>

<script>
import { ref } from 'vue';


export default {
    props: ['caregiver'],
    setup(props) {
       const caregiver = ref(props.caregiver)
      //  console.log(caregiver.value + 'caregiver');
      //  console.log('id' + caregiver.value.id);
       
       return caregiver
     }

}
</script>

<style>

</style>