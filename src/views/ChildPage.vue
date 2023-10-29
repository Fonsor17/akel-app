<template>
  <div class="child-title">
    <h2>{{ name }}</h2>
  </div>
  <EvaluationsList :name="name" :by="'children'" />
</template>

<script>
import EvaluationsList from "../components/EvaluationsList.vue";
import { useRoute } from "vue-router";
import { ref } from "vue";

export default {
  components: { EvaluationsList },
  setup() {
    const route = useRoute();
    const name = ref(route.params.name);

    return { name };
  },
};
</script>

<style>
.child-title {
  display: flex;
  flex-direction: column;
  margin-bottom: 15px;
}
</style>
