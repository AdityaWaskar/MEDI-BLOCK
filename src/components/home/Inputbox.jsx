import React from 'react'
import './inputBox.css'

const Inputbox = (props) => {
  
  return (
    // <div>
        <div className="element" id={props.title}>
            <label>{props.title}</label>
            <input 
            type={props.type} 
            required
            onChange={(e) =>{ 
              if(props.title =='Name'){props.setName(e.target.value)}
              else if(props.title =='Email'){props.setEmail(e.target.value)}
              else if(props.title =='Phone_No'){props.setPhone(e.target.value)}
              else if(props.title =='Age'){props.setAge(e.target.value)}
              else if(props.title =='Address'){props.setAddress(e.target.value)}
              else if(props.title =='Gender'){props.setGender(e.target.value)}
              else if(props.title =='Blood_Group'){props.setBloodGroup(e.target.value)}
              else if(props.title =='Doctor_Name'){props.setDoctorName(e.target.value)}
              else if(props.title =='Disease'){props.setDisease(e.target.value)}
              else if(props.title =='Symptoms'){props.setSymptoms(e.target.value)}
              else if(props.title =='Medicine_Name'){props.setMedicine_name(e.target.value)}
              else if(props.title =='Report'){props.setReport(e.target.files[0])}
            }}
            />
          </div>
    // </div>
  )
}

export default Inputbox