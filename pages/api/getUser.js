import firebase from '../../firebase/index';

const getUser = async uid => {
  const {db, ref, get, child} = firebase();
  const dbRef = ref(db);

  const getVal = await get(child(dbRef, `users/${uid}`)).catch(e =>
    console.log({e}),
  );

  const extractData = getVal.val();

  return extractData;
};

export default getUser;
