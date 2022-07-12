export const validateEmail = (email: string) => {
  //logic to validate if Email is valid. Returns true if valid, returns false otherwise
  if (email.indexOf('@') === -1) {
    return false;
  } else {
    return true;
  }
};

export const validatePassword = (password: string) => {
  //logic to validate if password is valid. Returns true if valid, returns false otherwise
  if (password.length < 8) {
    return false;
  } else {
    return true;
  }
};

export const validateSame = (password: string, confirm: string) => {
  //logic to validate if the two passwords match each other. Returns true if they match, returns false otherwise
  if (password === '' || !(password === confirm)) {
    return false;
  } else {
    return true;
  }
};

export const canContinue = (
  email: string,
  password: string,
  confirm: string
) => {
  //logic to validate if the user can continue. Returns true if the user has filled all 3 fields correctly, returns false otherwise
  if (
    validateEmail(email) &&
    validatePassword(password) &&
    validateSame(password, confirm)
  ) {
    return true;
  } else {
    return false;
  }
};

export const validateString = (name: string) => {
  //logic to validate if the user has filled in a name field. Returns true if the user has filled in a field, false otherwise
  if (!(name === '')) {
    return true;
  } else {
    return false;
  }
};

export const canContinueTeacher = (
  name: string,
  lastName: string,
  school: string
) => {
  //logic to validate if a teacher has filled all fields required
  if (
    validateString(name) &&
    validateString(lastName) &&
    validateString(school)
  ) {
    return true;
  } else {
    return false;
  }
};

export const canContinueStudent = (
  name: string,
  lastName: string,
  studentId: string,
  school: string
) => {
  //logic to validate if a student has filled all fields required
  if (
    validateString(name) &&
    validateString(lastName) &&
    validateString(school) &&
    validateString(studentId)
  ) {
    return true;
  } else {
    return false;
  }
};
