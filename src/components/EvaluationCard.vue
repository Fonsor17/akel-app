<template>
  <router-link
    :to="{
      name: 'single-evaluation',
      params: { id: evaluation.id },
    }"
  >
    <div class="evaluation">
      <h3>{{ evaluation.date }}</h3>
      <p>On {{ evaluation.child }}</p>
      <p>By {{ evaluation.caregiver }}</p>
    </div>
  </router-link>
</template>

<script>


export default {
  props: ["evaluation"],
  setup(props) {
    console.log('evaID:::');
   console.log(props.evaluation.id);
   }

};
</script>

<style>
.evaluation {
  list-style-type: none;
  background: #fff;
  padding: 5px 10px;
  border-radius: 6px;
  margin-bottom: 12px;
  display: flex;
  flex-direction: column;
  max-width: 400px;
}
p,
h3 {
  margin: 4px;
}
</style>
