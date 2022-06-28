import React from 'react';
import './App.css';


function StudentMenu() {
  return (
    //buttons are nonfunctional
    <main>
      <center> 
        <div>
          <button className = 'b1'>
            Subscribe to Classes
          </button> 
          <button className = 'b2'>
            See Assignments
          </button>
          <button className = 'b3'>
            See and Edit Scheduele
          </button>
          <button className= 'b4'>
            Edit Homework Priorities
          </button>
          <button className= 'b5'>
            Edit non-homework activities
          </button>
        </div>
      </center>  
    </main>
      // Each buttonn should redirects to other screens when functional
  );
}



export default StudentMenu;