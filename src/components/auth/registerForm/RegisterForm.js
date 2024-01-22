import React, { useState } from "react";
import { View } from "react-native";
import { Input, Icon, Button } from "react-native-elements";
import { useFormik } from "formik";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { useNavigation } from "@react-navigation/native";
import { screen } from "../../../utils";
import { initialValues, validationSchema } from "./RegisterForm.data";
import Toast from "react-native-toast-message";
import { styles } from "./RegisterForm.style";

export function RegisterForm() {
  const [showPassword, setShowPassword] = useState(false);

  const navigation = useNavigation();

  const showHidenPassword = () => setShowPassword((prevState) => !prevState);

  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: validationSchema(),
    validateOnChange: false,
    onSubmit: async (formValue) => {
      try {
        const auth = getAuth();
        await createUserWithEmailAndPassword(
          auth,
          formValue.email,
          formValue.password
        );
        navigation.navigate(screen.cuenta.cuenta);
      } catch (error) {
        Toast.show({
          type: "error",
          position: "bottom",
          text1: "Error al registrarse, intentelo mas tarde",
        });
        console.log(error);
      }
    },
  });

  return (
    <View style={styles.content}>

      <Input
        placeholder="Nombre"
        containerStyle={styles.input}
        rightIcon=<Icon
          type="material-community"
          name="account"
          iconStyle={styles.icon}
        />
        onChangeText={(text) => formik.setFieldValue("nombre", text)}
        errorMessage={formik.errors.nombre}
      />

      <Input
        placeholder="Telefono"
        containerStyle={styles.input}
        rightIcon=<Icon
          type="material-community"
          name="phone"
          iconStyle={styles.icon}
        />
        onChangeText={(text) => formik.setFieldValue("telefono", text)}
        errorMessage={formik.errors.telefono}
      />

      <Input
        placeholder="Correo Electronico"
        containerStyle={styles.input}
        rightIcon=<Icon
          type="material-community"
          name="at"
          iconStyle={styles.icon}
        />
        onChangeText={(text) => formik.setFieldValue("email", text)}
        errorMessage={formik.errors.email}
      />

      <Input
        placeholder="Contrasena"
        containerStyle={styles.input}
        secureTextEntry={showPassword ? false : true}
        rightIcon=<Icon
          type="material-community"
          name={showPassword ? "eye-off-outline" : "eye-outline"}
          iconStyle={styles.icon}
          onPress={showHidenPassword}
        />
        onChangeText={(text) => formik.setFieldValue("password", text)}
        errorMessage={formik.errors.password}
      />

      <Input
        placeholder="Confirmar Contrasena"
        containerStyle={styles.input}
        secureTextEntry={showPassword ? false : true}
        rightIcon=<Icon
          type="material-community"
          name={showPassword ? "eye-off-outline" : "eye-outline"}
          iconStyle={styles.icon}
          onPress={showHidenPassword}
        />
        onChangeText={(text) => formik.setFieldValue("repeatPassword", text)}
        errorMessage={formik.errors.repeatPassword}
      />

      <Button
        title="Unirse"
        containerStyle={styles.btnContainer}
        buttonStyle={styles.btn}
        onPress={formik.handleSubmit}
        loading={formik.isSubmitting}
      />
    </View>
  );
}
