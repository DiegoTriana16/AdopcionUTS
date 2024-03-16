import { View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Input, Button } from "react-native-elements"
import { styles } from "./ChangeDisplayName.styles"
import { useFormik } from "formik"
import { initialValues, validationSchema } from "./ChangeDisplayName.data"
import { getAuth, updateProfile } from "firebase/auth";
import { initFirebase } from '../../../utils/firebase';
import Toast from "react-native-toast-message";
import { collection, getFirestore, getDocs, where, query,updateDoc, addDoc, doc } from "firebase/firestore";


export function ChangeDisplayName(props) {

    const { onClose } = props;
    const currentUser = getAuth().currentUser;
    const email = currentUser.email;
    const db = getFirestore(initFirebase);
    let idUsuario = null;
    let usuario = null;
    const [datosUsuario, setDatosUsuario] = useState(null);

    const formik = useFormik({
        initialValues: initialValues(),
        validationSchema: validationSchema(),
        validateOnChange: false,

        onSubmit: async (formValue) => {
            try {
                const userQuery = query(collection(db, 'users'), where('email', '==', email));
                const querySnapshot = await getDocs(userQuery);

                if (querySnapshot.size > 0) {
                    idUsuario = querySnapshot.docs[0].id;
                    usuario = querySnapshot.docs[0].data();
                    setDatosUsuario(usuario);
                    //console.log('ID del usuario encontrado:', idUsuario);
                   // console.log('Datos del usuario:', datosUsuario);
                } else {
                    console.log('Usuario no encontrado en Firestore');
                }

                const userData = usuario;
                const updatedData = {};

                if (formValue.nombre && formValue.nombre !== userData.nombre) {
                    updatedData.nombre = formValue.nombre;
                }

                if (formValue.cedula && formValue.cedula !== userData.cedula) {
                    const cedulaAvailable = await isCedulaAvailable(formValue.cedula);
                    if (cedulaAvailable) {
                        updatedData.cedula = formValue.cedula;
                    } else {
                        Toast.show({
                            type: "error",
                            position: "bottom",
                            text1: "La cédula no está disponible.",
                        });
                        return;
                    }
                }

                if (formValue.telefono && formValue.telefono !== userData.telefono) {
                    updatedData.telefono = formValue.telefono;
                }
                
                if (Object.keys(updatedData).length > 0) {
                    //console.log('updatedData:', updatedData);
                    const userRef = doc(collection(db, 'users'), idUsuario)
                    //console.log('userRef:', userRef);
                    try {
                        await updateDoc(userRef, updatedData);
                    
                    } catch (error) {
                        console.error('Error al actualizar el documento:', error);
                    }

                    if (updatedData.nombre) {
                        await updateProfile(currentUser, { displayName: updatedData.nombre });
                    }
                    Toast.show({
                        type: "info",
                        position: "bottom",
                        text1: "Datos actualizados con exito",
                    });

                    onClose();

                } else {
                    Toast.show({
                        type: "info",
                        position: "bottom",
                        text1: "No se han realizado cambios.",
                    });
                }
            } catch (error) {
                Toast.show({
                    type: "error",
                    position: "bottom",
                    text1: "Error al cambiar los datos",
                });
            }
        }

    });

    const isCedulaAvailable = async (cedula) => {
        const usersRef = collection(db, "users");
        const q = query(usersRef, where("cedula", "==", cedula));
        const querySnapshot = await getDocs(q);
        return querySnapshot.empty;
    };

    return (
        <View style={styles.content}>
            <Input placeholder='Nombre y Apellido' rightIcon={{ type: "material-community", name: "account-circle-outline", color: "#c2c2c2" }}
                onChangeText={(text) => formik.setFieldValue("nombre", text)}
                errorMessage={formik.errors.nombre} />
            <Input placeholder='Cedula' rightIcon={{ type: "material-community", name: "numeric", color: "#c2c2c2" }}
                onChangeText={(text) => formik.setFieldValue("cedula", text)}
                errorMessage={formik.errors.cedula} />
            <Input placeholder='Telefono' rightIcon={{ type: "material-community", name: "phone", color: "#c2c2c2" }}
                onChangeText={(text) => formik.setFieldValue("telefono", text)}
                errorMessage={formik.errors.telefono} />
            <Button title="Cambiar datos" containerStyle={styles.btnContainer} buttonStyle={styles.btn}
                onPress={formik.handleSubmit}
                loading={formik.isSubmitting} />
        </View>
    )
}