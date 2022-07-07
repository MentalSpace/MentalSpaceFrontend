import React, { useState } from "react";

export const validateEmail = (email: String) => { //logic to validate if Email is valid. Returns true if valid, returns false otherwise
    if(email.indexOf("@") == -1){
        return false;
    } else {
        return true;
    }
  }

export const validatePassword = (password: String) => { //logic to validate if password is valid. Returns true if valid, returns false otherwise
    if (password.length < 8){
      return false;
    } else {
      return true;
    }
  }

export const validateSame = (password: String, confirm: String) => { //logic to validate if the two passwords match each other. Returns true if they match, returns false otherwise
    if(password === ""|| !(password === confirm)){
      return false;
    } else {
      return true;
    }
  }

export const canContinue = (email: String, password: String, confirm: String) => { //logic to validate if the user can continue. Returns if the user has filled all 3 fields correctly, returns false otherwise
    if (validateEmail(email) && validatePassword(password) && validateSame(password, confirm)){
      return true;
    } else {
      return false;
    }
  }