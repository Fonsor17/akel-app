<template>
  <AddChild />
  <div class="children">
    <ChildrenList />
  </div>
</template>

<script>
import ChildrenList from "../components/ChildrenList.vue";
import AddChild from "../components/AddChild.vue";

export default {
  components: { ChildrenList, AddChild },
};
</script>

<style></style>
