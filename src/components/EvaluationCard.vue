<template>
    <router-link :to="{ name: 'single-evaluation', params: { id: evaluation.id, childId: childId }} ">
<div class="evaluation">
    <h1>{{ evaluation.date }}</h1>
    <p>On {{ evaluation.child }}</p>
    <p>By {{ evaluation.caregiver }}</p>
    
</div>
</router-link>
</template>

<script>
import { ref } from 'vue';

export default {
    props:['evaluation', 'caregiverId'],
    setup(props) {
       
        const childId = ref(props.caregiverId)

        console.log('props.caregiverId');
        console.log(childId.value);

        return childId

    }


}
</script>

<style>

</style>