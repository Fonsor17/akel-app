<template>
  <div class="container-child">
    <div class="child-page">
      <div class="child-title">
        <h2>{{ name }}</h2>
        <button @click="isShown = !isShown"><i class="fa-solid fa-trash-can"></i></button>
      </div>
      <div class="confirmation-delete" v-if="isShown">
        <h3>Are you sure to continue and delete {{ name }} as child?</h3>
        <button @click="handleDelete" id="continue">Continue</button>
        <button @click="isShown = !isShown">Cancel</button>
      </div>
      <EvaluationsList :name="name" :by="'children'" />
    </div>
  </div>
</template>

<script>
import EvaluationsList from "../components/EvaluationsList.vue";
import { useRoute, useRouter } from "vue-router";
import { ref } from "vue";
// firebase imports
import { db } from "../firebase/config";
import { doc, deleteDoc } from "firebase/firestore";

export default {
  components: { EvaluationsList },
  setup() {
    const route = useRoute();
    const router = useRouter();
    const name = ref(route.params.name);

    const isShown = ref(false);
    // function to delete the element
    const handleDelete = () => {
      const docRef = doc(db, "children", route.params.id);

      deleteDoc(docRef);
      // redirecting after delete
      router.push("/");
    };

    return { name, handleDelete, isShown };
  },
};
</script>

<style>
.container-child {
  display: flex;
  justify-content: center;
}
.child-page {
  max-width: 400px;
}
.child-title {
  display: flex;
  justify-content: space-between;
  margin-bottom: 15px;
  max-width: 400px;
}
.child-title h2 {
  font-size: 26px;
  font-weight: 600;
}
.child-title button {
  width: 50px;
  height: 40px;
  margin-top: 0px;
  padding: 5px;
}

</style>
