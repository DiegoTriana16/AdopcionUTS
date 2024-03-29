import { View, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Input, Icon, Button, Text, CheckBox, ButtonGroup } from "react-native-elements"
import { styles } from "./Formulario.styles"
import { useFormik } from "formik"
import { initialValues, validationSchema } from "./formulario.data"
import Toast from "react-native-toast-message";
import { getAuth } from "firebase/auth";
import { initFirebase } from '../../../utils/firebase';
import { useNavigation } from "@react-navigation/native"
import { screen } from '../../../utils';
import { addDoc, collection, getFirestore, query, where, getDoc, doc, getDocs, updateDoc } from 'firebase/firestore'
import { CommonActions } from '@react-navigation/native';

export function FormularioAdop(props) {

  const navigation = useNavigation();
  const goToFormulario = () => {
    navigation.navigate('DrawerNavigation')
  }
  const { pet } = props;

  const goToListFormulario = () => {

    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{ name: 'FormularioScreen' }],
      })
    );
  };

  const { uid, displayName, email } = getAuth().currentUser
  const db = getFirestore(initFirebase);
  let idUsuario = null;
  let usuario = null;
  const [datosUsuario, setDatosUsuario] = useState(null);

  const buscarUsuarioPorEmail = async () => {
    try {
      const userQuery = query(collection(db, 'users'), where('email', '==', email));
      const querySnapshot = await getDocs(userQuery);

      if (querySnapshot.size > 0) {
        idUsuario = querySnapshot.docs[0].id;
        usuario = querySnapshot.docs[0].data();
        setDatosUsuario(usuario);
        console.log('ID del usuario encontrado:', idUsuario);
        console.log('Datos del usuario:', datosUsuario);
      } else {
        console.log('Usuario no encontrado en Firestore');
      }
    } catch (error) {
      console.error('Error al buscar el usuario:', error);
      throw error;
    }
  };

  useEffect(() => {
    buscarUsuarioPorEmail();
  }, []);

  const mostrarAlerta = () => {
    Alert.alert(
      "¡Advertencia!",
      "Una vez generado el formulario, no podrá ser modificado. ¿Está seguro de continuar?",
      [
        {
          text: "Cancelar",
          style: "cancel",
        },
        {
          text: "Continuar",
          onPress: () => formik.handleSubmit(),
        },
      ]
    );
  };

  const mostrarMensaje = () => {
    Alert.alert(
      "Gracias Por La Solicitud!",
      "El formulario sera revisado y podria tomar algun tiempo, podras ver el estado de la solicitud en la seccion de Lista Formularios",
      [
        {
          text: "Aceptar",
          style: "cancel",
        }
      ]
    );
  };


  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: validationSchema(),
    validateOnChange: false,
    onSubmit: async (formValue) => {
      try {

        formValue.fechaCreacion = new Date();
        formValue.cedula = datosUsuario.cedula;
        formValue.nombreApellido = datosUsuario.nombre;
        formValue.celular = datosUsuario.telefono;
        formValue.email = datosUsuario.email;

        console.log(formValue)
        const dataFirebase = { ...formValue, isValid: true, estado: 'En estudio', mascota: pet };
        const docRef = await addDoc(collection(db, 'formularioTest'), dataFirebase);
        const nuevoFormularioId = docRef.id;
        dataFirebase.formularioId = nuevoFormularioId;
        await updateDoc(docRef, dataFirebase);
        mostrarMensaje();
        goToListFormulario();
        goToFormulario();

      } catch (error) {
        Toast.show({
          type: "error",
          position: "bottom",
          text1: "Error al guardar el formulario",
        });
      }
    }

  });

  return (
    <View style={styles.content}>
      <Text>DATOS FORMULARIO</Text>

      <Text>DATOS PERSONALES</Text>
      <Text>nombre completo</Text>
      <Input
        placeholder={datosUsuario ? datosUsuario.nombre : "Nombre completo"}
        containerStyle={styles.input}
        rightIcon=<Icon
          type="material-community"
          name="account"
          iconStyle={styles.icon}
        />
        onChangeText={() => formik.setFieldValue("nombreApellido", datosUsuario.nombre)}
        errorMessage={formik.errors.nombreApellido}
        editable={false}
        value={datosUsuario ? datosUsuario.nombre : ""}
      />

      <Text>Cedula</Text>
      <Input
        placeholder={datosUsuario ? datosUsuario.cedula : "Cedula"}
        containerStyle={styles.input}
        rightIcon=<Icon
          type="material-community"
          name="numeric"
          iconStyle={styles.icon}
        />
        onChangeText={(text) => formik.setFieldValue("cedula", datosUsuario.cedula)}
        errorMessage={formik.errors.cedula}
        editable={false}
        value={datosUsuario ? datosUsuario.cedula : ""}
      />

      <Text>Telefono</Text>
      <Input
        placeholder={datosUsuario ? datosUsuario.telefono : "telefono"}
        containerStyle={styles.input}
        rightIcon=<Icon
          type="material-community"
          name="phone"
          iconStyle={styles.icon}
        />
        onChangeText={(text) => formik.setFieldValue("celular", datosUsuario.telefono)}
        errorMessage={formik.errors.celular}
        editable={false}
        value={datosUsuario ? datosUsuario.telefono : ""}
      />

      <Input
        placeholder="direccion"
        containerStyle={styles.input}
        rightIcon=<Icon
          type="material-community"
          name="map-marker"
          iconStyle={styles.icon}
        />
        onChangeText={(text) => formik.setFieldValue("direccion", text)}
        errorMessage={formik.errors.direccion}
      />

      <Input
        placeholder="Profesión"
        containerStyle={styles.input}
        rightIcon=<Icon
          type="material-community"
          name="briefcase"
          iconStyle={styles.icon}
        />
        onChangeText={(text) => formik.setFieldValue("Profesión", text)}
        errorMessage={formik.errors.direccion}
      />

      <Input
        placeholder="Por qué desea adoptar"
        multiline
        numberOfLines={4}
        containerStyle={styles.input}
        inputContainerStyle={styles.textInputContainer}

        onChangeText={(text) => formik.setFieldValue("motivoAdopcion", text)}
        errorMessage={formik.errors.direccion}
      />

      <Text>CRITERIO DE ADOPCIÓN</Text>

      <Text>¿Vives en casa o apartamento?</Text>

      <ButtonGroup
        selectedIndex={formik.values.vivesCasaApartamento === 'Casa' ? 0 : 1}
        buttons={['Casa', 'Apartamento']}
        onPress={(selectedIndex) => formik.setFieldValue("vivesCasaApartamento", selectedIndex === 0 ? 'Casa' : 'Apartamento')}
        containerStyle={{ marginTop: 10 }}
        selectedButtonStyle={{ backgroundColor: '#E05E5C' }}
      />

      <Text>¿Permiten mascotas en tu lugar de vivienda?</Text>

      <ButtonGroup
        selectedIndex={formik.values.permitenMascotas ? 0 : 1}
        buttons={['Sí', 'No']}
        onPress={(selectedIndex) => formik.setFieldValue("permitenMascotas", selectedIndex === 0)}
        containerStyle={{ marginTop: 10 }}
        selectedButtonStyle={{ backgroundColor: '#E05E5C' }}
      />

      <Input
        placeholder="¿Qué harías si tuvieras que mudarte?"
        multiline
        numberOfLines={4}
        containerStyle={styles.input}
        inputContainerStyle={styles.textInputContainer}
        onChangeText={(text) => formik.setFieldValue("mudanza", text)}
        errorMessage={formik.errors.direccion}
      />

      <Text>¿Algún familiar alérgico a las mascotas?</Text>
      <ButtonGroup
        selectedIndex={formik.values.familiarAlergico ? 0 : 1}
        buttons={['Sí', 'No']}
        onPress={(selectedIndex) => formik.setFieldValue("familiarAlergico", selectedIndex === 0)}
        containerStyle={{ marginTop: 10 }}
        selectedButtonStyle={{ backgroundColor: '#E05E5C' }}
      />

      <Text>SOBRE LAS MASCOTAS</Text>

      <Text>¿Has tenido mascotas antes?</Text>
      <ButtonGroup
        selectedIndex={formik.values.experienciasMascotas ? 0 : 1}
        buttons={['Sí', 'No']}
        onPress={(selectedIndex) => formik.setFieldValue("experienciasMascotas", selectedIndex === 0)}
        containerStyle={{ marginTop: 10 }}
        selectedButtonStyle={{ backgroundColor: '#E05E5C' }}
      />

      <Input
        placeholder="¿Qué pasó con ellas?"
        multiline
        numberOfLines={4}
        containerStyle={styles.input}
        inputContainerStyle={styles.textInputContainer}
        onChangeText={(text) => formik.setFieldValue("quePasoConMascotasAnteriores", text)}
        errorMessage={formik.errors.direccion}
      />

      <Input
        placeholder="¿Tienes otras mascotas actualmente?"
        containerStyle={styles.input}
        rightIcon=<Icon
          type="material-community"
          name="dog-service"
          iconStyle={styles.icon}
        />
        onChangeText={(text) => formik.setFieldValue("tieneOtrasMascotas", text)}
        errorMessage={formik.errors.direccion}
      />

      <Input
        placeholder="¿Dónde dormirá la mascota?"
        containerStyle={styles.input}
        rightIcon=<Icon
          type="material-community"
          name="home-circle"
          iconStyle={styles.icon}
        />
        onChangeText={(text) => formik.setFieldValue("lugarDormirMascota", text)}
        errorMessage={formik.errors.direccion}
      />

      <Input
        placeholder="¿Qué harás con tus mascotas si realizas un viaje?"
        multiline
        numberOfLines={4}
        containerStyle={styles.input}
        inputContainerStyle={styles.textInputContainer}
        onChangeText={(text) => formik.setFieldValue("queHacesConMascotasEnViaje", text)}
        errorMessage={formik.errors.direccion}
      />


      <Button
        title="Generar Solicitud de Adopcion"
        containerStyle={styles.btnContainer}
        buttonStyle={styles.btn}
        onPress={mostrarAlerta}
        loading={formik.isSubmitting}
      />
    </View>
  );
}