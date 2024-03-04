import { View } from 'react-native'
import React from 'react'
import { Input, Button } from "react-native-elements"
import { styles } from "./ChangeDisplayName.styles"
import { useFormik } from "formik"
import { initialValues, validationSchema } from "./ChangeDisplayName.data"
import { getAuth, updateProfile } from "firebase/auth";
import Toast from "react-native-toast-message";


export function ChangeDisplayName(props) {

    const { onClose } = props;

    const formik = useFormik({
        initialValues: initialValues(),
        validationSchema: validationSchema(),
        validateOnChange: false,
        onSubmit: async (formValue) => {
            try {

                const { displayName } = formValue;
                const currentUser = getAuth().currentUser;
                await updateProfile(
                    currentUser,
                    { displayName }
                );

                onClose();
            } catch (error) {
                Toast.show({
                    type: "error",
                    position: "bottom",
                    text1: "Error al cambiar el nombre",
                });
            }
        }

    });

    return (
        <View style={styles.content}>
            <Input placeholder='Nombre y Apellido' rightIcon={{ type: "material-community", name: "account-circle-outline", color: "#c2c2c2" }}
                onChangeText={(text) => formik.setFieldValue("displayName", text)}
                errorMessage={formik.errors.displayName} />
            <Button title="Cambiar nombre y apellido" containerStyle={styles.btnContainer} buttonStyle={styles.btn}
                onPress={formik.handleSubmit}
                loading={formik.isSubmitting} />
        </View>
    )
}