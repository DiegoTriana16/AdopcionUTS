import React, {useState, useEffect} from 'react';
import { View, Text } from 'react-native';
import {getAuth, onAuthStateChanged} from 'firebase/auth';
import {UserGuestScreen} from "./userGuestScreen/UserGuestScreen";
import {UsuarioLogeadoScreen} from "./UsuarioLogeadoScreen";
import {UserLoggerScreen} from "./userLoggerScreen";
import {LoadingModal} from "../../components"




export function CuentaScreen() {
  const [hasLogged, setHasLogged] = useState(null)

  useEffect(() => {
       const auth = getAuth();
       onAuthStateChanged(auth, (user)=>{
           setHasLogged(user ? true : false);
       });
      setHasLogged(false);
  }, []);

  if (hasLogged === null) {
      return <LoadingModal show= {true} text= "Cargando"/>
  }
  
  return hasLogged ? <UserLoggerScreen /> : <UserGuestScreen />;
}