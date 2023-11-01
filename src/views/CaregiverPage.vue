<template>
  <div class="container-caregiver">
    <div class="caregiver-page">
      <div class="caregiver-title">
        <h2>{{ name }}</h2>
        <button @click="isShown = !isShown">
          <i class="fa-solid fa-trash-can"></i>
        </button>
      </div>
      <div class="confirmation-delete" v-if="isShown">
        <h3>Are you sure to continue and delete {{ name }} as caregiver?</h3>
        <button @click="handleDelete" id="continue">Continue</button>
        <button @click="isShown = !isShown">Cancel</button>
      </div>
      <EvaluationsList :name="name" :by="'caregivers'" />
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
      const docRef = doc(db, "caregivers", route.params.id);

      deleteDoc(docRef);
      // redirecting after delete
      router.push("/caregivers");
    };

    return { name, handleDelete, isShown };
  },
};
</script>

<style>
.container-caregiver{
  display: flex;
  justify-content: center;
}
.caregiver-page {
  max-width: 400px;
}
.caregiver-title {
  display: flex;
  justify-content: space-between;
  margin-bottom: 15px;
  max-width: 400px;
}
.caregiver-title h2 {
  font-size: 26px;
  font-weight: 600;
}
.caregiver-title button {
  width: 50px;
  height: 40px;
  margin-top: 0px;
  padding: 5px;
}
.confirmation-delete {
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: white;
  border-radius: 12px;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 350px;
  border-radius: 12px;
  border: 1px solid #008cff;
  text-align: center;
  padding: 30px 30px 40px 30px;
  color: #008cff;
}
.confirmation-delete button {
  display: block;
  margin-top: 60px;
  border: none;
  padding: 8px 16px;
  font-size: 18px;
}
#continue {
  border: solid red;
}
</style>
