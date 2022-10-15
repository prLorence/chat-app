import {TextField, Button} from '@mui/material';
import {componentStyles} from '../../styles/jsStyles';
import {useState, useEffect} from 'react';
import firebase from '../../firebase/index';
import {useRouter} from 'next/router';
import createDetails from '../api/createUserDetails';
import styles from '../../styles/Home.module.css';
import getUser from '../api/getUser';

const Dashboard = () => {
  const router = useRouter();
  const [hasDetails, setHasDetails] = useState(false);
  const [username, setUsername] = useState('');
  const [number, setNumber] = useState('');
  const [uid, setUid] = useState('');
  const [error, setError] = useState('');
  const [checkUser, setCheckUser] = useState({});

  useEffect(() => {
    firebase().auth.onAuthStateChanged(user => {
      if (user) setUid(user.uid);
      else console.log('not a user');
      getUser(uid).then(e => setCheckUser(e));
      if (checkUser.fullName && checkUser.mobile) setHasDetails(true);
    });
  }, [checkUser.fullName, checkUser.mobile, uid]);

  const handleUsernameChange = e => {
    setUsername(e.target.value);
  };

  const handleNumberChange = e => {
    setNumber(e.target.value);
  };

  return (
    <div className={styles.formContainer}>
      {hasDetails ? (
        <>
          <p>{`username: ${checkUser.fullName}`}</p>
          <p>{`phone number: ${checkUser.mobile}`}</p>
        </>
      ) : (
        <>
          <TextField
            id="t1"
            label="full name"
            variant="outlined"
            value={username}
            onChange={handleUsernameChange}
          />
          <TextField
            id="t2"
            label="number"
            variant="outlined"
            value={number}
            onChange={handleNumberChange}
          />
          <Button
            style={componentStyles.primaryButton}
            title={'Create Details'}
            onClick={() => {
              createDetails(username, number, uid);
              router.push('/create-gc');
            }}>
            <h1> Create Details </h1>
          </Button>
        </>
      )}

      <Button
        style={componentStyles.primaryButton}
        title={'Create Details'}
        onClick={async () => {
          if (hasDetails) router.push('/gcs');
          else if (username === '' && number === '')
            setError('Please enter your details first.');
        }}>
        <h1> View Group Chats </h1>
      </Button>
      <Button
        style={componentStyles.primaryButton}
        title={'Create Details'}
        onClick={async () => {
          if (hasDetails) router.push('/create-gc');
          else if (username === '' && number === '')
            setError('Please enter your details first.');
        }}>
        <h1> Create Group Chat </h1>
      </Button>
      <p> {error} </p>
    </div>
  );
};

export default Dashboard;
