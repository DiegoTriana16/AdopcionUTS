import { LogBox } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import Toast from "react-native-toast-message";
import { createDrawerNavigator } from "@react-navigation/drawer";
import "react-native-gesture-handler";
import { CuentaStack } from "./src/navigation/CuentaStack";
import AppContext from "./src/context/AppContext";

const Drawer = createDrawerNavigator();

LogBox.ignoreAllLogs();

export default function App() {
  const Drawer = createDrawerNavigator();
  return (
    <AppContext>
      <NavigationContainer>
        <CuentaStack />        
      </NavigationContainer>
      <Toast />
    </AppContext>
  );
}
