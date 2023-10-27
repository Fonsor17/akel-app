//forse da cancellare tutto
import { ref } from 'vue'


const getCaregiver = (id, by) => {
   const caregiver = ref(null)
   const errorCaregiver = ref(null)
   const caregiverName = ref(null)

   const loadCaregiver = async () => {
    try {
      console.log(by);
      console.log('http://localhost:3000/' + by + '/' + id);
     let data = await fetch('http://localhost:3000/' + by + '/' + id)
     if (!data.ok) {
        throw Error('Could not get the children list')
     }
     caregiver.value = await data.json()
     caregiverName.value = caregiver.value.name + ' ' + caregiver.value.lastname
     console.log(caregiverName.value);
    } catch(err) {
        errorCaregiver.value = err.message
      }
 
   }
   // console.log(caregiver);
   return { caregiver, errorCaregiver, loadCaregiver, caregiverName }
}

export default getCaregiver