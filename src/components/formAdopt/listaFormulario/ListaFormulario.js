import React, { useState, useEffect } from 'react';
import { ScrollView, TouchableOpacity, Modal, View, Text } from 'react-native';
import { Icon } from 'react-native-elements';
import { getAuth } from 'firebase/auth';
import { getFirestore, collection, query, where, getDocs } from 'firebase/firestore';
import { initFirebase } from '../../../utils/firebase';
import { TraerImagen } from '../../../utils/traerImagen';
import FormularioItem from './FormularioItem';
import FormularioDetalle from './FormularioDetalle ';


export function ListaFormulario() {
  const { email } = getAuth().currentUser;
  const db = getFirestore(initFirebase);
  const [formularios, setFormularios] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [formularioSeleccionado, setFormularioSeleccionado] = useState(null);
  const [roll, setRoll] = useState("user");
  let usuario = null;
  let rol = null;

  const [datosUsuario, setDatosUsuario] = useState(null);

  useEffect(() => {
    buscarListaDeFormulario();
  }, []);

  useEffect(() => {
    buscarUsuarioPorEmail();
  }, []);

  const buscarListaDeFormulario = async () => {
    try {
      await buscarUsuarioPorEmail();

      let userQuery = query(collection(db, 'formularioTest'), where('email', '==', email));
      //console.log('role:', rol);
      if (rol === "admin") {
        userQuery = query(collection(db, 'formularioTest'));
      }
      
      const querySnapshot = await getDocs(userQuery);

      if (querySnapshot.size > 0) {
        const listaFormularios = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));
        setFormularios(listaFormularios);
      } else {
        console.log('Lista de formularios no encontrado en Firestore');
      }
    } catch (error) {
      console.error('Error al buscar la lista de formularios:', error);
    }
  };

  const handleFormularioPress = formulario => {
    setFormularioSeleccionado(formulario);
    setModalVisible(true);
  };

  const buscarUsuarioPorEmail = async () => {
    try {
      const userQuery = query(collection(db, 'users'), where('email', '==', email));
      const querySnapshot = await getDocs(userQuery);

      if (querySnapshot.size > 0) {
        idUsuario = querySnapshot.docs[0].id;
        usuario = querySnapshot.docs[0].data();
        rol = usuario?.rol;        
        setDatosUsuario(usuario);
        setRoll(rol);
      } else {
        console.log('Usuario no encontrado en Firestore');
      }
    } catch (error) {
      console.error('Error al buscar el usuario:', error);
      throw error;
    }
  };

  return (
    <ScrollView>
      {formularios.map(formulario => (
        <FormularioItem
          key={formulario.id}
          formulario={formulario}
          onPress={() => handleFormularioPress(formulario)}
        />
      ))}
      <Modal
        animationType="slide"
        transparent={false}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <FormularioDetalle
          formularioSeleccionado={formularioSeleccionado}
          closeModal={() => setModalVisible(false)}
          rol={roll}
        />
      </Modal>
    </ScrollView>
  );
}
