import React from 'react'
import './nav.css'

const Navigation = () => {
  return (
    <nav>
        <span className='title' >
        <img src="https://www.freeiconspng.com/uploads/ambulance-cross-hospital-icon-11.png" alt="" />
          HMS Using Blockchain
        </span>
        <div className="userInfo">
            <div className="userPhoto">
                <img src={"/img/user.svg"} alt="user" />
            </div>
            <span className="user_email">abc@gmail.com</span>
        </div>
      </nav>
  )
}

export default Navigation