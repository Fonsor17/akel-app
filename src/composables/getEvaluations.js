import { ref } from "vue"

const getEvaluations = () => {
   const evaluationsByCaregiver = ref([])
   const evaluations = ref([])
   const errorEvaluations = ref(null)

   const loadEvaluations = async (name) => {
    try {
     let data = await fetch('http://localhost:3000/evaluations')
     if (!data.ok) {
        throw Error('Could not get the children list')
     }
     evaluations.value = await data.json()
     console.log('careGivername:')
     console.log(name);
     evaluationsByCaregiver.value = evaluations.value.filter((evaluation) => evaluation.caregiver === name || evaluation.child === name )
     console.log('evaluations by caregiver');
     console.log(evaluationsByCaregiver.value);

    } catch(err) {
        errorEvaluations.value = err.message
      }
 
   }
   console.log('evaluationALL:');
   console.log(evaluations);
   return { evaluations, errorEvaluations, evaluationsByCaregiver, loadEvaluations }
   }

   export default getEvaluations