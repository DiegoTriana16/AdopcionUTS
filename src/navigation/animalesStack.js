import {createDrawerNavigator} from "@react-navigation/drawer";
import AnimalesScreen from "../screens/animales/AnimalesScreen";
import HomeScreen from "../screens/animales/HomeScreen";
import {FormularioScreen} from "../screens/formulario/FormularioScreen";

const Drawer = createDrawerNavigator();

export const AnimalStack = () => {
    return (
        <Drawer.Navigator>
          <Drawer.Screen name="home" component={HomeScreen} />
          <Drawer.Screen name="animals" component={AnimalesScreen} />
          <Drawer.Screen name="Perfil" component={HomeScreen} />
          <Drawer.Screen name="formulario" component={FormularioScreen} />
        </Drawer.Navigator>
    )
}
