// function to fetch different collections by different users setting the collection name as argument

//firebase imports
import { db } from "../firebase/config";
import { collection, onSnapshot, query, where } from "firebase/firestore";
//function to get the logged user
import getUser from "./getUser";
//import watchEffect to get real time datas
import { ref, watchEffect } from "vue";

const getCollection = (c, q) => {
  const documents = ref(null);
  const { user } = getUser();

  // collection reference
  let colRef = collection(db, c);
  // query to get only collection depending on logged user
  colRef = query(colRef, where("userUid", "==", user.value.uid));
  // additional query to pass as argument when calling this function
  if (q) {
    colRef = query(colRef, where(...q));
  }

  const unsub = onSnapshot(colRef, (snapshot) => {
    let results = [];
    snapshot.docs.forEach((doc) => {
      results.push({ ...doc.data(), id: doc.id });
    });
    console.log("Received data:", results);
    //update values
    documents.value = results;
  });
  watchEffect((onInvalidate) => {
    onInvalidate(() => unsub());
  });

  return { documents };
};

export default getCollection;
