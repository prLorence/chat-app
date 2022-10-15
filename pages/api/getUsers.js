import firebase from '../../firebase/index';

const getUsers = async () => {
  const {db, ref, get, child} = firebase();
  const dbRef = ref(db);

  const getVal = await get(child(dbRef, 'users')).catch(e => console.log({e}));

  const extractData = getVal.val();

  // return formatted extractData
  const dataMap = Object.entries(extractData).map(a => ({
    id: a[0],
    ...a[1],
  }));

  return dataMap;
};

export default getUsers;
