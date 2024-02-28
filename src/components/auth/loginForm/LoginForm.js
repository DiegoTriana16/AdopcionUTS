import React, { useState } from "react";
import { View } from "react-native";
import { Input, Icon, Button } from "react-native-elements";
import { useFormik } from "formik";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useNavigation } from "@react-navigation/native";
import { screen } from "../../../utils";
import Toast from "react-native-toast-message";
import { initialValues, validationSchema } from "./LoginForm.data";
import { styles } from "./LoginForm.Style";
import { useUserContext } from "../../../context/AppContext";

export function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const navigation = useNavigation();
  const { saveUser } = useUserContext();

  const showHidenPassword = () => setShowPassword((prevState) => !prevState);

  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: validationSchema(),
    validateOnChange: false,
    onSubmit: async (formValue) => {
      try {
        const auth = getAuth();
        const user = await signInWithEmailAndPassword(auth, formValue.email, formValue.password);
        saveUser(user);
        navigation.navigate("DrawerNavigation");
      } catch (error) {
        Toast.show({
          type: "error",
          position: "bottom",
          text1: "credenciales no validas"
        });
        console.log(error);
      }
    }
  });

  const goToRegister = () => {
    navigation.navigate("DrawerNavigation");
  };

  return (
    <View containerStyle={styles.content}>
      <Input
        placeholder="correo electronico"
        containerStyle={styles.input}
        rightIcon={<Icon type="material-community" name="at" iconStyle={styles.icon} />}
        onChangeText={(text) => formik.setFieldValue("email", text)}
        errorMessage={formik.errors.email}
      ></Input>
      <Input
        placeholder="contraseña"
        containerStyle={styles.input}
        secureTextEntry={showPassword ? false : true}
        rightIcon={
          <Icon
            type="material-community"
            name={showPassword ? "eye-off-outline" : "eye-outline"}
            iconStyle={styles.icon}
            onPress={showHidenPassword}
          />
        }
        onChangeText={(text) => formik.setFieldValue("password", text)}
        errorMessage={formik.errors.password}
      ></Input>
      <Button
        title="Iniciar sesion"
        containerStyle={styles.btnContainer}
        buttonStyle={styles.btnStyle}
        onPress={formik.handleSubmit}
        // onPress={goToRegister}
        loading={formik.isSubmitting}
      />
    </View>
  );
}
