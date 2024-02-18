import { LogBox } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import Toast from "react-native-toast-message";
import { createDrawerNavigator } from "@react-navigation/drawer";
import "react-native-gesture-handler";
import { CuentaStack } from "./src/navigation/CuentaStack";
import AppContext from "./src/context/AppContext";
import AnimalsContext from "./src/context/AnimalsContext";

LogBox.ignoreAllLogs();

export default function App() {
  return (
    <AppContext>
      <NavigationContainer>
        <AnimalsContext>
          <CuentaStack />
        </AnimalsContext>
      </NavigationContainer>
      <Toast />
    </AppContext>
  );
}
