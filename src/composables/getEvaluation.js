
import { ref } from 'vue'


const getEvaluation = (id) => {
   const evaluation = ref({})
   const errorEvaluation = ref(null)

   const loadEvaluation = async () => {
    try {
     let data = await fetch('http://localhost:3000/evaluations/' + id)
     if (!data.ok) {
        throw Error('Could not get the children list')
     }
     evaluation.value = await data.json()
     console.log(evaluation.value);
    } catch(err) {
        errorEvaluation.value = err.message
      }
 
   }
   console.log(evaluation);
   return { evaluation, errorEvaluation, loadEvaluation }
}

export default getEvaluation