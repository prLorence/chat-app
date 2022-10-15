// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import firebase from '../../firebase/index'
import {useRouter} from 'next'

const logInUser = (userEmail, userPassword) => {
  const { auth, signInWithEmailAndPassword } = firebase();
  signInWithEmailAndPassword(auth, userEmail, userPassword).then((userCredential) => {
      const user = userCredential.user;
      console.log({user});
  }).catch(e => console.error(e))
}

export default logInUser;