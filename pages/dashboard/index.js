import {TextField, Button} from '@mui/material'
import { componentStyles } from '../../styles/jsStyles'
import {useState, useEffect} from 'react';
import firebase from '../../firebase/index'
import {useRouter} from 'next/router'
import createDetails from '../api/createUserDetails';
import styles from '../../styles/Home.module.css'

const Dashboard = () => {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [number, setNumber] = useState('');
  const [uid, setUid] = useState('');

  useEffect(() => {
    firebase().auth.onAuthStateChanged((user) => {
      if (user) {
        setUid(user.uid);
        console.log(user.uid);
      } else {
        console.log("not a user");
      }
    });
  }, [])

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  }

  const handleNumberChange = (e) => {
    setNumber(e.target.value);
  }

  return (
      <div className={styles.formContainer}> 
          <TextField 
            id = 't1'
            label = 'full name'
            variant = 'outlined'
            value={username}
            onChange = {handleUsernameChange}
          /> 
          

          <TextField 
            id = 't2'
            label = 'number'
            variant = 'outlined'
            value={number}
            onChange = {handleNumberChange}
          /> 


          <Button 
            style={componentStyles.primaryButton} 
            title={'Create Details'} 
            onClick = {() => {
              createDetails(username, number, uid) 
              router.push('/create-gc')
            }}>
            <h1> Create Details </h1>
          </Button>

          <Button 
            style={componentStyles.primaryButton} 
            title={'Create Details'} 
            onClick = {async () => {
              router.push("/gcs")
          }}>
            <h1> Go to available gcs </h1>
          </Button>
      </div>
    )
}

export default Dashboard;