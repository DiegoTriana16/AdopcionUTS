import {createNativeStackNavigator} from "@react-navigation/native-stack";
import {screen} from "../utils"
import {FormularioScreen} from "../screens/formulario/FormularioScreen"
import { NuevoFormularioScreen } from "../screens/formulario/nuevoFormulario"

const Stack = createNativeStackNavigator();

export function FormularioStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen name={screen.formulario.formulario} component={FormularioScreen} options={{title:"Adopcion"}}/>
        </Stack.Navigator>
    )
}