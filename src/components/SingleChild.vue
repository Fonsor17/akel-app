<template>
   <router-link :to="{ name: 'child', params: { id: child.id } }"><h3>{{ child.fullName }}</h3></router-link>
</template>

<script>
import { ref } from 'vue';

export default {
    props: ['child'],
    setup(props) {
       const child = ref(props.child)
       return child
    }

}
</script>

<style>

</style>