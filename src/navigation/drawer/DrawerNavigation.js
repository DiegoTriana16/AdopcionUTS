import { createDrawerNavigator, DrawerItemList } from "@react-navigation/drawer";
import HomeScreen from "../../screens/animales/HomeScreen";
import {
  SimpleLineIcons,
  MaterialIcons,
  FontAwesome5,
  AntDesign
} from "@expo/vector-icons";
import { Image, SafeAreaView, Text, View } from "react-native";
import FormularioAnimal from "../../screens/Formulario/Form";
import { FormularioScreen } from "../../screens/Formulario/FormularioScreen";
import { CuentaScreen } from "../../screens/cuenta/CuentaScreen"
import { getAuth } from "firebase/auth";

const Drawer = createDrawerNavigator();

const DrawerNavigation = () => {

  const currentUser = getAuth().currentUser;
  const email = currentUser.email;
  const displayName = currentUser.displayName;



  return (
    <Drawer.Navigator

      drawerContent={(props) => {
        return (
          <SafeAreaView>
            <View
              style={{
                height: 300,
                width: "100%",
                justifyContent: "center",
                alignItems: "center",
                borderBottomColor: "#f4f4f4",
                borderBottomWidth: 1,
                paddingTop: 50
              }}
            >
              <Image
                source={require("../../../assets/img/adopta-no-compres.png")}
                style={{
                  height: 130,
                  width: 130,
                  borderRadius: 65
                }}
              />
              <Text
                style={{
                  fontSize: 22,
                  marginVertical: 6,
                  fontWeight: "bold",
                  color: "#111"
                }}
              >
                {displayName}
              </Text>
              <Text
                style={{
                  fontSize: 16,
                  color: "#111"
                }}
              >
                {email}
              </Text>
            </View>
            <DrawerItemList {...props} />
          </SafeAreaView>
        );
      }}
      screenOptions={{
        drawerStyle: {
          backgroundColor: "#fff",
          width: 250
        },
        headerStyle: {
          backgroundColor: "#f4511e"
        },
        headerTintColor: "#fff",
        headerTitleStyle: {
          fontWeight: "bold"
        },
        drawerLabelStyle: {
          color: "#111"
        }
      }}
    >
      <Drawer.Screen
        name="HomeScreen"
        options={{
          drawerLabel: "Home",
          title: "Home",
          drawerIcon: () => <SimpleLineIcons name="home" size={20} color="#808080" />
        }}
        component={HomeScreen}
      />
      <Drawer.Screen
        name="AgregarScreen"
        options={{
          drawerLabel: "Agregar Mascota",
          title: "Agregar Mascota",
          drawerIcon: () => <FontAwesome5 name="cat" size={24} color="#808080" />,
          drawerItemStyle: {
            display: email === "test@test.com" ? "flex" : "none"
          }
        }}
        component={FormularioAnimal}
      />

      <Drawer.Screen
        name="FormularioScreen"
        options={{
          drawerLabel: "Lista Formularios",
          title: "Listar Formulario",
          drawerIcon: () => <AntDesign name="filetext1" size={20} color="#808080" />
        }}
        component={FormularioScreen}
      />
      <Drawer.Screen
        name="Cuenta"
        options={{
          drawerLabel: "Cuenta",
          title: "Cuenta",
          drawerIcon: () => <AntDesign name="user" size={20} color="#808080" />
        }}
        component={CuentaScreen}
      />
    </Drawer.Navigator>
    
  );
};

export default DrawerNavigation;
