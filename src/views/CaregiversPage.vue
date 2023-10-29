<template>
  <AddCaregiver />
  <div class="caregivers">
    <CaregiversList />
  </div>
</template>

<script>
import CaregiversList from "../components/CaregiversList.vue";
import AddCaregiver from "../components/AddCaregiver.vue";

export default {
  components: { CaregiversList, AddCaregiver },
};
</script>

<style></style>
