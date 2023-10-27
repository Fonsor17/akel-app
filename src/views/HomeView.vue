<template>
  <button @click="toggle">Add Child</button>
  <AddChild v-if='isShown'/>
  <div class="children">
      <ChildrenList/>
  </div>


</template>

<script>
import ChildrenList from '../components/ChildrenList.vue'
import AddChild from '../components/AddChild.vue'
import { ref } from 'vue'

export default {
  components: {ChildrenList , AddChild },
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