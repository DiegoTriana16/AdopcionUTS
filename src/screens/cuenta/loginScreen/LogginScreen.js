import React from "react";
import { View,Image } from "react-native";
import { Text  } from "react-native-elements";
import { useNavigation } from "@react-navigation/native";
import { styles } from "./LoginScreen.style";
import { LoginForm } from "../../../components/auth";
import { screen } from "../../../utils";

export function LogginScreen() {
  const navigation = useNavigation();

  const goToRegister = () => {
    navigation.navigate(screen.cuenta.register);
  };
  return (
    <View style={styles.contentLogin}>
      <Image
        source={require("../../../../assets/img/perro-flor.jpg")}
        style={styles.image}
      />
      <View style={styles.content}>
        <LoginForm />
        <Text style={styles.textRegister}>
          ¿Aun no tienes Cuenta?{" "}
          <Text style={styles.btnTegister} onPress={goToRegister}>
            Registrarse
          </Text>
        </Text>
      </View>
    </View>
  );
}
