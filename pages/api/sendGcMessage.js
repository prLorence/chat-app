import firebase from '../../firebase/index';

const sendGcMessage = async (gcTitle, gcCreator, searchValue) => {
  const {db, ref, set, update} = firebase();

  const result = searchValue.reduce((unique, o) => {
    if (!unique.some(obj => obj.id === o.id)) unique.push(o);
    return unique;
  }, []);

  const members = {};

  result.forEach(a => {
    members[a.id] = true;
  });

  console.log({members});

  const id = `${moment().valueOf()}`;

  const constructValue = {
    gcTitle: gcTitle,
    id: id,
    creator: gcCreator,
    members: {...members},
  };

  console.log({constructValue});

  await set(ref(db, 'gc/' + id), constructValue).catch(e => console.error(e));

  const messageId = `msg-${id}`;

  await set(ref(db, `messages/${id}/${messageId}`), {
    creator: gcCreator,
    senderId: currUID,
    message: gcMessage,
  }).catch(e => console.error(e));

  await update(ref(db, 'gc/' + id), {
    msgId: messageId,
  }).catch(e => console.error(e));

  alert('sent message');
};

export default sendGcMessage;
