import { ref } from 'vue'

// firebase import
import { auth } from '../firebase/config'
import { onAuthStateChanged } from 'firebase/auth'

// refs
const user = ref(auth.currentUser)

// auth changes
onAuthStateChanged(auth, (_user) => {
    console.log('User state changes. Current user is: ', _user);
    user.value = _user
})

const getUser = () => {
    return { user }
}

export default getUser 