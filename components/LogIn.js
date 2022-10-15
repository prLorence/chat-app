import { TextField } from "@mui/material";
import {useState} from 'react'
import {Button} from '@mui/material'
import {componentStyles} from '../styles/jsStyles'
import logInUser from "../pages/api/logInUser";
import { useRouter } from 'next/router';

const Login = ({isUser}) => {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  }

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  }
  return (

    <> 
        <TextField 
          id = 't1'
          label = 'email'
          value={email}
          variant = 'outlined'
          onChange = {handleEmailChange} 
            
        /> 
        

        <TextField 
          id = 't2'
          label = 'password'
          value = {password}
          variant = 'outlined'
          onChange = {handlePasswordChange}
        /> 

        {
          !isUser ? 
          <Button 
              style={componentStyles.primaryButton} 
              title={isUser ? 'Logout' : 'Log In'} 
              onClick = {async () => {
                  if (email !== "" && password !== "") {
                      logInUser(email, password)
                  }
                }}>

              <h1>  Log In </h1>
            </Button>
            : 
            ''
          }

          {
          !isUser ? 
          <Button 
              style={componentStyles.primaryButton} 
              title={isUser ? 'Logout' : 'Sign Up'} 
              onClick = {async () => {
                router.push('/signUp')
                }}>

              <h1>  Sign Up </h1>
            </Button>
            : 
            ''
          }
    </>
  )
};

export default Login