import { createDrawerNavigator, DrawerItemList } from "@react-navigation/drawer";
import AnimalesScreen from "../../screens/animales/AnimalesScreen";
import HomeScreen from "../../screens/animales/HomeScreen";
import {
  SimpleLineIcons,
  MaterialIcons,
} from "@expo/vector-icons";
import { Image, SafeAreaView, Text, View } from "react-native";
import FormularioAnimal from "../../screens/Formulario/Form";



const Drawer = createDrawerNavigator();

const DrawerNavigation = () => {
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
                Isabella Joanna
              </Text>
              <Text
                style={{
                  fontSize: 16,
                  color: "#111"
                }}
              >
                Product Manager
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
        name="FormularioScreen"
        options={{
          drawerLabel: "Formulario",
          title: "Formulario",
          drawerIcon: () => <MaterialIcons name="timer" size={20} color="#808080" />
        }}
        component={FormularioAnimal}
      />
    </Drawer.Navigator>
  );
};

export default DrawerNavigation;
