import React , {useState, useEffect} from 'react'
import fire from '../../fire.js'
import Home from '../home/Home.jsx'
import './login.css'
import LoginUi from './LoginUi'


const Login = () => {
    const [ user, setUser ] = useState('');
    const [ email, setEmail ] = useState('');
    const [ emailError, setEmailError ] = useState('');
    const [ password, setPassword ] = useState('');
    const [ passwordError, setPasswordError ] = useState('');
    const [ hasAccount, setHasAccount ] = useState(false);

    const clearInputs = () =>{
        setEmail('');
        setPassword('');
    }
    const clearErrors = () =>{
        setEmailError('');
        setPasswordError('');
    }

    const handleLogin = () =>{
        clearErrors();
        fire
            .auth()
            .signInWithEmailAndPassword(email, password)
            .catch(err =>{
                switch (err.code) {
                    case "auth/invalid-email":
                    case "auth/user-disable":
                    case "auth/user-not-found":
                        setEmailError(err.message)
                        alert(err.message)
                        break;
                    case 'auth/wrong-password':
                        setPasswordError(err.message)
                        alert(err.message)
                        break;
                 }
            })
            .then((d)=>{
                if(d){
                    window.location.href = 'home'
                }
            })
    }

    const handleSignup =() =>{
        clearErrors();
        fire
            .auth()
            .createUserWithEmailAndPassword(email, password)
            .catch(err =>{
                switch (err.code) {
                    case "auth/email-already-use":
                    case "auth/invalid-email":
                        setEmailError(err.message)
                        alert(err.message)
                        break;
                    case 'auth/weak-password':
                        setPasswordError(err.message)
                        alert(err.message)
                        break;
                 }
            })
            .then((val)=>{
                console.log(val)
                console.log('account created')
            })
    }

    const handleLogout = () =>{
        fire.auth().signOut();
    }

    const authListner = () => {
        fire.auth().onAuthStateChanged(user => {
            if(user){
                clearInputs();
                setUser(user);
            }
            else{
                setUser('');
            }
        })
    }

    useEffect(() => {
        authListner()
    }, [])
    
  return (
    <>
        <LoginUi
            email = {email}
            setEmail = {setEmail}
            password = {password}
            setPassword = {setPassword}
            handleLogin = {handleLogin}
            hasAccount = {hasAccount}
            setHasAccount = {setHasAccount}
            emailError = {emailError}
            passwordError = {passwordError}
        />
    </>
  )
}

export default Login