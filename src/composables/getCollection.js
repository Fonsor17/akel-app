// function to fetch all the children
import { ref, watchEffect } from 'vue'
//firebase imports
import { db } from '../firebase/config'
import { collection, onSnapshot } from 'firebase/firestore'


const getCollection = (c) => {
 const documents = ref(null)

 // collection reference 
 let colRef = collection(db, c)

const unsub = onSnapshot(colRef, snapshot => {
   let results = []
        snapshot.docs.forEach(doc => {
            results.push({ ...doc.data(), id: doc.id })
        })
        console.log('Received data:', results);
        //update values
        documents.value = results
        console.log(documents.value);
 })
 watchEffect((onInvalidate) => {
   onInvalidate(() => unsub())
})

 return { documents }
}


export default getCollection