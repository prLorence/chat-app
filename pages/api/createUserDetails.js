import { ConstructionOutlined } from '@mui/icons-material';
import firebase from '../../firebase/index'

const createDetails = async (username, number, uid) => {
  // retrieves current in session user details

  if (username !== "" && number !== "") {
    const {db, ref, set} = firebase();
    await set(ref(db, `users/${uid}`), {
      fullName: username,
      mobile: number,
      uid: uid
    })
    } else {
    alert("fill up the form please!")
  }
}

export default createDetails;