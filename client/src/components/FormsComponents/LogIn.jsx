import React, { useState } from 'react'
import Input from './Input'
import { ejecutar, logIn } from '../scripts/auth'
import style from '../styles/Forms.module.css'
import { useHistory } from "react-router-dom";
import { Button } from '@mui/material';

// function LogIn() {

//   function handleSubmit(e) {
//     e.preventDefault()
//     if(
//       emailLogIn.valid === 'true' && 
//       passwordLogIn.valid === 'true'
//     ) { 
//       setValidForm(true)
//       console.log('Enviado')
//     } else {
//       setValidForm(false)
//     }
//   }

function LogIn() {
  let navigate = useHistory();
  const [validForm, setValidForm] = useState(null)

  const [ emailLogIn, setEmailLogIn ] = useState({value:'', valid: null})
  const [ passwordLogIn, setPasswordLogIn ] = useState({value:'', valid: null})

function handleSubmit(e){
  e.preventDefault();
  logIn(e.target.emailLogIn.value,e.target.passwordLogIn.value);
  navigate.push('/');
}

async function handleClick(){
  await ejecutar()
  navigate.goBack();
}

  return (
    <div className={style.container}>
      <h1>Log In</h1>
      <form className={style.form_container}  onSubmit={(e)=>handleSubmit(e)} id="sing-up">
        <Input 
        state={emailLogIn}
        setState={setEmailLogIn}
        label='Email'
        id='singup-email' 
        name='emailLogIn' 
        type="email" 
        placeholder='Enter email'
        // error='This email is not valid'
        // regularExpression={expression.email}
        />
        
        <Input 
        state={passwordLogIn}
        setState={setPasswordLogIn}
        label='Pasword'
        id='singup-password' 
        name='passwordLogIn' 
        type="password" 
        placeholder='Enter password'
        // error='Incorrect password'
        // regularExpression={expression.password}        
        />

        {validForm === false && <span>Please complete all fields correctly</span>}

        <Button type='submit' variant="contained">Log In</Button>

        {validForm === true && <span>Welcome back</span>}

        </form>

      <br />
      <hr className={style.separator}/>
      <br />

      <button className={style.google_btn} onClick={()=>handleClick()}>Log in with Google</button>

    </div>
  )
} 

export default LogIn