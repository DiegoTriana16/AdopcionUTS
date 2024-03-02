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

  useEffect(() => {
    buscarListaDeFormulario();
  }, []);

  const buscarListaDeFormulario = async () => {
    try {
      const userQuery = query(collection(db, 'formularioTest'), where('email', '==', email));
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
        />
      </Modal>
    </ScrollView>
  );
}
