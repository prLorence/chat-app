import firebase from '../../firebase/index';

const querySearch = async (req, callback) => {
  const {db, ref, get, limitToLast, query, orderByChild, startAt, endAt} =
    firebase();

  const myRes = [];

  const sKey = req.input.toLowerCase();

  const getData = await get(
    query(ref(db, 'users')),
    ...[
      orderByChild('fullName'),
      startAt(sKey),
      endAt(sKey + '\uf8ff'),
      limitToLast(10),
    ],
  );

  getData.forEach(a => {
    myRes.push(a.val());
  });

  callback(myRes);
};

export default querySearch;
