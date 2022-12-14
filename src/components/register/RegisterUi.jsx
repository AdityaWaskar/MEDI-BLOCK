import React, {useState} from 'react'
import { Link } from 'react-router-dom'
import './registerUi.css'


const RegisterUi = (props) => {
  // return (
    const [check, setCheck] = useState(false)

  return (
    <div className='regiterLoginSection'>
        <header>
            <div className="name">HMS System</div>
            <Link to={{pathname: `/`, }} className="a">Sign In</Link>
        </header>
        <div className="container">
            <div className="loginContainer">
                <div className="section1">
                    <div className="title">Admin Register</div>
                    <div className="subTitle"> Hey, Enter your details to create your new account</div>
                </div>
                <div className="section2">
                    <div className="email">
                        <input type="email" 
                            required
                            autoFocus
                            value={props.email}
                            onChange={(e) => props.setEmail(e.target.value)}
                            placeholder='Enter Email' 
                            // {props.email.includes('@')? style={border: "2px solid red"} : ''}
                            style={{border: (props.email.length===0?"1px solid lightGrey":(!props.email.includes('@')?"1px solid red":"1px solid green"))}}
                            />

                    </div>
                    <div className="pwd">
                        <input 
                            type={check?"text":"password"} 
                            id='pwd' 
                            placeholder='Password'
                            value={props.password}
                            onChange={(e) => props.setPassword(e.target.value)}
                            // style={{border:(props.password.length>7 ? "1px solid red":"1px solid lightGrey")}}
                            style={{border: (props.password.length===0?"1px solid lightGrey":(props.password.length<=7?"1px solid red":"1px solid green"))}}

                        />
                    </div>
                    <div className='checkbox'>
                        <input type="checkbox" 
                        onChange={()=> setCheck(!check)}
                         />
                        <label htmlFor="">show</label>
                    </div>
                    <div className="submit">
                        <button onClick={props.handleSignup}>Submit</button>
                    </div>
                    <p>Already have an account? <Link to={{pathname: `/`, }} className="redirect"><b>Login your account</b></Link></p>
                </div>
            </div>
        </div>
    
        <div className="footer">
            Copyright &#9400; lalanboy's 2022 | Privacy Policy
        </div>
    </div>
  )
  // )
}

export default RegisterUi