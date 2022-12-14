import { useState } from 'react'
import './addPatient.css'
import Spinner from '../spinner/Spinner'
import Inputbox from './Inputbox'
var today;
const AddPatient = (props) => {
  const v = ['A+', 'A-','B+', 'B-', 'O+', 'O-', 'AB+', 'AB-'] // bloodGroups
  
  const todaysDate =() =>{
    today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();
    today = yyyy + '-' + mm + '-' + dd;
  }
  todaysDate()
  return (
    <section>
      
    <div className='patientContainer'>
      <img 
        src={"/img/wrong.svg"} 
        alt="" 
        className='wrongIcon'
        onClick={()=>{
          props.setAdd(false)
        }}  
        />
      <h1 style={{'text-align': 'center', 'margin': 0}}>Patient Data</h1>
      <div className='form'>
        {/* <hr style={{width: '100%',color: 'black'}}/> */}
        <h3 style={{width: '100%'}}>Personal Info</h3>
        <Inputbox title= {'Name'} type= {'text'} setName = {props.setName}/>
        <Inputbox title= {'Email'} type= {'email'} setEmail = {props.setEmail}/>
        <Inputbox title= {'Phone_No'} type= {'number'} setPhone = {props.setPhone}/>
        <Inputbox title= {'Age'} type= {'Number'} setAge={props.setAge}/>
        <Inputbox title= {'Address'} type= {'text'} setAddress = {props.setAddress}/>
        {/* <Inputbox title= {'Gender'} type= {'text'} setGender = {props.setGender}/> */}
        <div className="gender">
          <label>Gender</label>
          <select name="gender" id="gender" onChange={e=>props.setGender(e.target.value)}>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
        </div>
        <h3 style={{width: '100%'}}>Medical Info</h3>
        {/* <Inputbox title= {'Blood_Group'} type= {'text'} setBloodGroup = {props.setBloodGroup}/> */}
        <div className="gender">
          <label>Blood Group</label>
            <select name="bloodGroup" id="bloodGroup" onChange={e=>props.setBloodGroup(e.target.value)}>
              {v.map(d=>(
                <option value={d}>{d}</option>
                ))}
              </select>
          </div>
        <Inputbox title= {'Doctor_Name'} type= {'text'}  setDoctorName = {props.setDoctorName}/>
        <Inputbox title= {'Disease'} type= {'text'} setDisease = {props.setDisease}/>
        <Inputbox title= {'Symptoms'} type= {'text'} setSymptoms = {props.setSymptoms}/>
        <Inputbox title= {'Medicine_Name'} type= {'text'} setMedicine_name = {props.setMedicine_name}/>
        <Inputbox title= {'Report'} type= {'file'} setReport = {props.setReport}/>
        <button onClick={async()=>{          
          await props.pushData()
        }}>Submit</button>
        <h3 style={{width: '100%'}}> Date Of Consultancy </h3>
        <div className="element gender date">
        <label>Date</label>
              <input 
                type="date" 
                onChange={e=> props.setDate(e.target.value)} 
                max={today}
                id = "date"
              />
                
          </div>

      </div>
    </div>
        </section>
  )
}

export default AddPatient