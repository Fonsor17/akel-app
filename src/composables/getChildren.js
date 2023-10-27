// function to fetch all the children
import { ref } from 'vue'


const getChildren = () => {
   const children = ref([])
   const errorChildren = ref(null)

   const loadChildren = async () => {
    try {
     let data = await fetch('http://localhost:3000/children')
     if (!data.ok) {
        throw Error('Could not get the children list')
     }
     children.value = await data.json()
    } catch(err) {
        errorChildren.value = err.message
      }
 
   }
   console.log(children);
   return { children, errorChildren, loadChildren }
}

export default getChildren