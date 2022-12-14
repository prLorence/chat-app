import Head from 'next/head';
import Image from 'next/image';
import styles from '../../styles/Home.module.css';

import React, {useEffect, useState, useMemo} from 'react';
import {useRouter} from 'next/router';
import firebase from '../../firebase/index';
import {Autocomplete, TextField, CircularProgress, Button} from '@mui/material';
import moment from 'moment';
import {eq, throttle} from 'lodash';
import {DataGrid} from '@mui/x-data-grid';
import {componentStyles} from '../../styles/jsStyles';

// 3:11:50 in training video
// test
export default function Dashboard() {
  const router = useRouter();
  const [data, setData] = useState([]);
  const [refresh, setRefresh] = useState(Math.random());
  const [message, setMessage] = useState('');
  const [currUID, setCurrUID] = useState(null);
  const [currentUser, setCurrentUser] = useState({});
  const [user, setUser] = useState({});
  const {query} = router;

  useEffect(() => {
    const {auth} = firebase();
    firebase().auth.onAuthStateChanged(user => {
      const userInSession = auth.currentUser;
      if (user) {
        setCurrUID(user.uid);
        userInSession.displayName = user.uid;
      }
    });
  }, []);

  const getData = async () => {
    const {db, ref, get, child} = firebase();

    const dbRef = ref(db);

    const getVal = await get(child(dbRef, `messages/${query.id}`));

    const extractVal = getVal.val();

    const formattedData = Object.entries(extractVal).map(a => ({
      id: a[0],
      ...a[1],
    }));

    setData(formattedData);
  };

  const getUser = async a => {
    const {db, ref, get, child, auth} = firebase();
    const dbRef = ref(db);
    const getVal = await get(child(dbRef, 'users/' + a));
    const userVal = getVal.val();
    const retrievedUser = auth.currentUser;
    setUser(userVal);
    setCurrentUser(retrievedUser.displayName);
  };

  useEffect(() => {
    if (currUID) {
      getUser(currUID);
      getData();
    }
  }, [currUID, refresh]);

  const handleMessageChange = e => {
    setMessage(e.target.value);
  };

  const sendMessage = async () => {
    if (message !== '') {
      const {db, ref, set} = firebase();
      const id = `${moment().valueOf()}`;
      const msgId = `msg-${id}`;

      await set(ref(db, `messages/${query.id}/${msgId}`), {
        senderName: user.fullName,
        senderId: currUID,
        message: message,
      });

      setMessage('');
      setRefresh(Math.random());
    } else {
      alert('no message detected');
    }
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>Hello World</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}> {query.gcTitle} </h1>
        <h1 className={styles.description}>created by: {query.creator}</h1>

        {data.map(a => (
          // eslint-disable-next-line react/jsx-key
          <div
            style={{
              display: 'flex',
              width: '50%',
            }}>
            <p>
              {a.senderName
                ? `${a.senderName}: ${a.message}`
                : `${a.creator}: ${a.message}`}
            </p>
          </div>
        ))}

        <TextField
          id="messageInput"
          label="send message"
          variant="outlined"
          value={message}
          onChange={handleMessageChange}
        />

        <Button
          variant="contained"
          style={componentStyles.primaryButton}
          onClick={sendMessage}>
          <h1>Send Message</h1>
        </Button>
      </main>
    </div>
  );
}
