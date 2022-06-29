import React from 'react';
import './SubscribeMenu.css';
import { Select } from "native-base";

function SubscribeMenu() {
  return (
    <main >
      <h1>Subscribe To...</h1>
      <h4>Please fill out all 3 fields</h4>
      <div className = 'd1'>
        <h3 className = 'teach'>Teacher: </h3>
        <select className = 'sTeach'>
          <option className = 'op1'>Please Select</option>
        </select>
      </div>
      <div className = 'd2'>
        <h3 className = 'class'> Class: </h3>
        <select className = 'sClass'>
          <option className = 'op2'>Please Select</option>
        </select>
      </div>
      <div className = 'd3'>
        <h3 className = 'period'> Period: </h3>
        <select className = 'sPeriod'>
          <option>Please Select</option>
        </select>
      </div>
      <div> 
        <p></p> 
        <button className = 'sub'>Subscribe</button> 
      </div>
    </main>
  
  );
  // The dropdown menu will allow the user to choose there option for their class, teacher, and Period
  // For the button once the user fills out what they will subscribe to, they have the option press subscribe to sumbit it 
  // still need to figure out how to prevent a user from submitting less than 3 fields
  //to-do: backend
  
}

export default SubscribeMenu;
