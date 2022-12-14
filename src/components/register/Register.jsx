import React , {useState, useEffect} from 'react'
import fire from '../../fire.js'
import './register.css'
import RegisterUi from './RegisterUi.jsx'
// import { getDatabase, ref, set } from "firebase/database";


const Register = () => {
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



    // const saveUserData = ()=>{
    //   fire.firestore().collection('/user').get().then(function(value){
    //    value.forEach((value1)=>{
    //     var id = value1.id
    //     console.log(`id ${id}`)
    //     fire.firestore().collection('/user').doc(id).get().then((value22)=>{
    //       var data = value22.data.name;
    //       console.log(`DATA IS ${data}`);
    //     });
    //     // 4Register.jsx:33 DATA IS function (t) {
    //     //   return this._delegate.data(t);
    //     // }
    //     // 4Register.jsx:30 id JB4NLIrSuR5sFGcPDpCq
    //    })
    //   //  DATA IS 
    //   })
    // }

    // saveUserData()

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
                    alert(`logging successfully.` )
                }
            })
    }

    const handleSignup =() =>{
        clearErrors();
        if(password.length <7){
            setPasswordError('Enter password greater than 7 characters!')
            alert('Enter password greater than 7 characters!')
        }
        else{

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
            // var userRef = fire.database().ref("/user");
            // userRef.push({ });
            // const db = getDatabase();
            // set(ref(db, 'users/'), {
            //     username: name,
            //     email: email,
            //     profile_picture : imageUrl
            //   });
        }
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
        <RegisterUi
            email = {email}
            setEmail = {setEmail}
            password = {password}
            setPassword = {setPassword}
            handleSignup = {handleSignup}
            hasAccount = {hasAccount}
            setHasAccount = {setHasAccount}
            emailError = {emailError}
            passwordError = {passwordError}
        />
    </>
  )
}

export default Register