import toast from "react-hot-toast";

export const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

export const emailExists = async (email) => {
  var response = false;
  const URL = `http://localhost:5000/api/Usuarios/existe-email/${email}`;

  await fetch(URL).then(data => data.json()).then(data => response = data);

  return response;
}

export const dniExists = async (dni) => {
  var response = false;
  const URL = `http://localhost:5000/api/Usuarios/existe-dni/${dni}`;

  await fetch(URL).then(data => data.json()).then(data => response = data);

  return response;
}

export const validatePassword = (str) => {
  if (str.length < 6) {
      return false;
  } 

  const regexMayuscula = /[A-Z]/;
  const regexCaracterEspecial = /[!@#$%^&*]/;

  if (!regexMayuscula.test(str) || !regexCaracterEspecial.test(str)) {
      return false;
  }

  return true;
};

export const validateAge = (date) => {
  if(!date){
    toast.error('Debe ingresar una fecha de nacimiento.')
    return false;
  }

  var dob = new Date(date);  
  var month_diff = Date.now() - dob.getTime();  
  var age_dt = new Date(month_diff);   
  var year = age_dt.getUTCFullYear();  
  var age = Math.abs(year - 1970);

  if(age < 18){
    toast.error("Debes ser mayor de 18 años para utilizar el sistema.")
    return false;
  }
  
  return true;
}