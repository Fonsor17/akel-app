<template>
<h3 v-if="!evaluationsByCaregiver.length">No {{ caregiverName }}' evaluations found</h3>
<h1 v-else>{{ caregiverName }}</h1>
 <EvaluationCard v-for="evaluation in evaluationsByCaregiver" :key="evaluation.id" :evaluation="evaluation"/>
 <router-link :to="{ name: 'new-evaluation' }">
 <button class="add-evaluation">Add Evaluation</button>
 </router-link>
</template>

<script>
import EvaluationCard from './EvaluationCard.vue';
import getCaregiver from '../composables/getCaregiver'
import getEvaluations from '../composables/getEvaluations'
import { useRoute } from 'vue-router'


export default {
  props: ['id', 'by'],
  components: { EvaluationCard },
  setup(props) {
    console.log('gruppo:');
    console.log(props.by);
   const route = useRoute()

    const { caregiver, errorCaregiver, caregiverName, loadCaregiver } = getCaregiver(route.params.id, props.by)
    const { evaluationsByCaregiver, errorEvaluations, loadEvaluations } = getEvaluations()


    loadCaregiver()
    .then(() => console.log('caregiverNAme: ' + caregiverName.value))
    .then(() => loadEvaluations(caregiverName.value))
    .then(() => console.log(evaluationsByCaregiver.value))
   

    // console.log('caregiver:');
    // console.log(caregiver.value);
    return { caregiver, caregiverName, errorCaregiver, errorEvaluations, evaluationsByCaregiver }

    
   }
  }
//   setup(props) {
//     const caregivers = ref([]);
//     const caregiverById = ref({});
//     const evaluationsByCaregiver = ref([]);
//     const caregiverName = ref('');
//     const evaluations = ref([]);
//     const error = ref('');

//     onMounted(async () => {
//       try {
//         // Fetch caregivers
//         const caregiversResponse = await fetch('http://localhost:3000/caregivers');
//         if (!caregiversResponse.ok) {
//           throw new Error('Failed to fetch caregivers data');
//         }
//         caregivers.value = await caregiversResponse.json();

//         // Find caregiver by ID
//         caregiverById.value = caregivers.value.find((caregiver) => caregiver.id === props.id);
//         console.log('caregiverById:', caregiverById.value);

//         // Calculate caregiverName
//         caregiverName.value = `${caregiverById.value.name} ${caregiverById.value.lastname}`;
//         console.log('fullname:', caregiverName.value);

//         // Fetch evaluations
//         const evaluationsResponse = await fetch('http://localhost:3000/evaluations');
//         if (!evaluationsResponse.ok) {
//           throw new Error('Failed to fetch evaluations data');
//         }
//         evaluations.value = await evaluationsResponse.json();
//         console.log('evaluations:', evaluations.value);

//         // Filter evaluations by caregiverName
//         evaluationsByCaregiver.value = evaluations.value.filter(
//           (evaluation) => evaluation.caregiver === caregiverName.value
//         );
//       } catch (err) {
//         error.value = err.message;
//         console.error(err);
//       }
//     });

//     return { caregivers, caregiverById, evaluationsByCaregiver, caregiverName, evaluations, error };
//   },
// };


// export default {
//     props: [ 'id' ],
//     components: { EvaluationCard },

    // data() {
    //   return {
    //     caregivers: [],
    //     caregiverById: [],
    //     evaluationsByCaregiver: [],
    //     caregiverName: '',
    //     evaluations: [],
    //     error: '',
    //       }
    // },
    // mounted() {
        
    //     fetch('http://localhost:3000/caregivers')
    //     .then((res) => res.json())
    //     .then((data) => this.caregivers = data)
    //     .then(() => console.log(this.caregivers))
    //     .then(() => this.caregiverById = this.caregivers.find((caregiver) => caregiver.id = this.id))
    //     .then(() => this.caregiverName = this.caregiverById.name + ' ' + this.caregiverById.lastname) 
    //     .then(() => {console.log(this.caregiverById); console.log('fullname:' + this.caregiverName);})
    //     .catch(err => console.log(err.message))

    //     fetch('http://localhost:3000/evaluations')
    //     .then((res) => res.json())
    //     .then((data) => this.evaluations = data)
    //     .then(() => console.log(this.evaluations))
    //     .then(() => this.evaluationsByCaregiver = this.evaluations.filter((evaluation) => evaluation.caregiver === caregiverName))
    //     .catch(err => console.log(err.message))
    // }}

/// linkato su gitHUB:


//     setup(props) {
//     const caregivers = ref([]);
//     const caregiverById = ref(null);
//     const error = ref('');

//     onMounted(async () => {
//       try {
//         const response = await fetch('http://localhost:3000/caregivers');
//         if (!response.ok) {
//           throw new Error('No available data');
//         }
//         const data = await response.json();
//         caregivers.value = data;
//         console.log('caregivers.value:');
//         console.log(caregivers.value);

//         // Find the caregiver by ID
//         caregiverById.value = caregivers.value.find((caregiver) => caregiver.id === props.id);
//         console.log('caregiverById:');
//         console.log(caregiverById.value);
//         console.log('props.id:')
//         console.log(props.id);
//       } catch (err) {
//         error.value = err.message;
//         console.log(error.value);
//       }
//     });

//     return { caregivers, caregiverById, error };
// }
// }

///fine linkato su github
       
        // for(let caregiver in this.caregivers) {
        //     if(caregiver.id === this.id) {
        //         this.caregiverById.value = caregiver
        //     }
        // }
        // caregiverById.value = caregivers.value.find((caregiver) => caregiver.id === props.id )
      
        
//     setup(props) {

//         console.log(props.id);

//         const caregivers = ref([])
//         const caregiverById = ref(null)
//     const error = ref(null)

//     const load = async () => {
//       try {
//         let data = await fetch('http://localhost:3000/caregivers')
//         if(!data.ok) {
//           throw Error('no available data')
//         }
//         caregivers.value = await data.json()
//         console.log("caregivers:");
//         console.log(caregivers.value)
//         for(let caregiver in caregivers) {
//             if(caregiver.id === props.id) {
//                 caregiverById.value = caregiver
//             }
//         }
//         // caregiverById.value = caregivers.value.find((caregiver) => caregiver.id === props.id )
//         console.log("caregiverById:");
//         console.log(caregiverById.value)
//       }
//       catch(err) {
//         error.value = err.message
//         console.log(error.value)
//       }
//     }

//     load()
    
//     return { caregivers, error, caregiverById }
//   },
//     //     let caregiver = ref(null)
    //  let { caregivers, errorCaregivers, loadCaregivers } = getCaregivers()
    //   const { evaluations, errorEvaluations, loadEvaluations} = getEvaluations()
 
    //   caregiver.value = caregivers.value.find((caregiver) => caregiver.id === props.id )
    //   console.log('caregiver: ');
    //   console.log(caregiver.value);
    //   console.log('props : ' + props.id);
    //   console.log('caregiver: ' + caregiver.value);
    //   const ciao = ref([ "strunz", "cacca", "ggg"])
    //  loadCaregivers()

    //   loadEvaluations()

    //   console.log(ciao.value);

   

    //   const evaluationsByCaregiver = ref(evaluations.value.filter((evaluation) => evaluation.id === props.id ))

    //   console.log(evaluationsByCaregiver);

    //   return { evaluationsByCaregiver, errorEvaluations, errorCaregivers}
     
  

</script>

<style>

</style>