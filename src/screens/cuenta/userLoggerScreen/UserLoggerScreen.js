import React, { useState } from "react";
import { View } from "react-native";
import { Button } from "react-native-elements";
import { InfoUser } from "../../../components/account";
import {AccountOptions} from "../../../components/account/AccountOptions"
import { LoadingModal } from "../../../components";
import { getAuth, signOut } from "firebase/auth";
import { styles } from "./UserLoggerScreen.styles";

export function UserLoggerScreen() {
  const [loading, setloading] = useState(false);
  const [loadingText, setloadingText] = useState('');
  
  const logOut = async () => {
    const auth = getAuth();
    await signOut(auth);
  };

  return (
    <View style={styles.content}>
      <InfoUser setloading={setloading} setloadingText={setloadingText} />
      <AccountOptions/>
      <Button
        title="Cerrar Sesion"
        buttonStyle={styles.button}
        titleStyle={styles.btnTitles}
        onPress={logOut}
      />

      <LoadingModal show={loading} text={loadingText} />
    </View>
  );
}
