import React, { useState } from 'react';
import { View, Text } from 'react-native';
import { Input, Button } from 'react-native-elements';
import { useFormik } from 'formik';
import { getAuth, reauthenticateWithCredential, updatePassword } from 'firebase/auth';
import Toast from 'react-native-toast-message';
import { styles } from './ChangePassword.styles'; 

export function ChangePassword(props) {
    const [showPassword, setShowPassword] = useState(false);
    const { onClose } = props;

    const showHidePassword = () => setShowPassword(prevState => !prevState);

    const formik = useFormik({
        initialValues: {
            currentPassword: '',
            newPassword: '',
            confirmNewPassword: ''
        },
        validateOnChange: false,
        onSubmit: async (values) => {
            try {
                const auth = getAuth();
                const user = auth.currentUser;

                // Reautenticar al usuario con su contraseña actual
                const credential = {
                    email: user.email,
                    password: values.currentPassword
                };
                //await reauthenticateWithCredential(user, credential);

                // Verificar que la nueva contraseña y la confirmación sean iguales
                if (values.newPassword !== values.confirmNewPassword) {
                    throw new Error('Las contraseñas no coinciden.');
                }

                // Cambiar la contraseña del usuario
                await updatePassword(user, values.newPassword);

                // Mostrar mensaje de éxito
                Toast.show({
                    type: 'success',
                    position: 'bottom',
                    text1: 'Contraseña actualizada correctamente.'
                });

                onClose();
            } catch (error) {
                // Mostrar mensaje de error
                console.log("error", error)
                Toast.show({
                    type: 'error',
                    position: 'bottom',
                    text1: 'Error al actualizar la contraseña.',
                    text2: error.message
                });
            }
        }
    });

    return (
        <View style={styles.content}>
            <Input
                placeholder="Contraseña actual"
                containerStyle={styles.inputContainer}
                secureTextEntry={!showPassword}
                rightIcon={{
                    type: 'material-community',
                    name: showPassword ? 'eye-off-outline' : 'eye-outline',
                    onPress: showHidePassword
                }}
                onChangeText={formik.handleChange('currentPassword')}
                value={formik.values.currentPassword}
                errorMessage={formik.errors.currentPassword}
            />
            <Input
                placeholder="Nueva contraseña"
                containerStyle={styles.inputContainer}
                secureTextEntry={!showPassword}
                rightIcon={{
                    type: 'material-community',
                    name: showPassword ? 'eye-off-outline' : 'eye-outline',
                    onPress: showHidePassword
                }}
                onChangeText={formik.handleChange('newPassword')}
                value={formik.values.newPassword}
                errorMessage={formik.errors.newPassword}
            />
            <Input
                placeholder="Confirmar nueva contraseña"
                containerStyle={styles.inputContainer}
                secureTextEntry={!showPassword}
                rightIcon={{
                    type: 'material-community',
                    name: showPassword ? 'eye-off-outline' : 'eye-outline',
                    onPress: showHidePassword
                }}
                onChangeText={formik.handleChange('confirmNewPassword')}
                value={formik.values.confirmNewPassword}
                errorMessage={formik.errors.confirmNewPassword}
            />
            <Button
                title="Cambiar contraseña"
                onPress={formik.handleSubmit}
                loading={formik.isSubmitting}
                containerStyle={styles.buttonContainer}
                buttonStyle={styles.button}
            />
        </View>
    );
}
