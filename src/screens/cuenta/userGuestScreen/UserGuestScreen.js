import React from "react";
import { View, TouchableOpacity, Text, Image } from "react-native";
import { styles } from "./UserGuestScreen.styles";
import { screen } from "../../../utils";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";

export function UserGuestScreen() {
  const navigation = useNavigation();

  const goToLogin = () => {
    navigation.navigate(screen.cuenta.login);
  };

  return (
    <SafeAreaView centerContent={true} style={styles.content}>
      <View style={styles.content}>
        <Text style={styles.descripcion}>¿Te gustaria adoptar?</Text>
        <Text style={styles.descripcion}>
          Animate a conocer nuestras mascotas de forma sencilla puedes adoptar y
          descubir un mundo de posibilidades
        </Text>
        <Image
          source={require("../../../../assets/img/adopta-no-compres.png")}
          style={styles.image}
        />
        <View style={styles.contentButtom}>
          <TouchableOpacity
            title="Ver tu perfil"
            onPress={goToLogin}
            style={styles.buttonStyle}
          >
            <Text style={styles.contentButton}>Ir a Perfil</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}
