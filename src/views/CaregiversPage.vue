<template>
    <button @click="toggle">Add Caregiver</button>
    <AddCaregiver v-if='isShown'/>
    <div class="caregivers">
        <CaregiversList/>
    </div>


</template>

<script>
import CaregiversList from '../components/CaregiversList.vue'
import AddCaregiver from '../components/AddCaregiver.vue'
import { ref } from 'vue'
 
export default {
    components: {CaregiversList , AddCaregiver },
    setup() {
     const isShown = ref(false)
     const toggle = () => {
        isShown.value = !isShown.value
     }
     return { isShown, toggle }
     }


}
</script>

<style>
 
</style>