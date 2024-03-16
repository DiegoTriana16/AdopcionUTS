import {
  Text,
  ImageBackground,
  SafeAreaView,
  StatusBar,
  View,
  Pressable,
  StyleSheet
} from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import COLORS from "../../const/colors";
import { screen } from "../../utils";

const DetailsScreen = ({ navigation,route }) => {
  const pet = route.params;

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.white }}>
      <StatusBar backgroundColor={COLORS.background} />
      <View style={{ height: 400, backgroundColor: COLORS.background }}>
        <ImageBackground
          resizeMode="contain"
          source={{ uri: pet?.foto }}
          style={{
            height: 280,
            top: 20
          }}
        ></ImageBackground>

        <View style={style.detailsContainer}>
          
          <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
            <Text style={{ fontSize: 20, color: COLORS.dark, fontWeight: "bold" }}>
              {pet.nombre}
            </Text>
            <Icon name="gender-male" size={25} color={COLORS.grey} />
          </View>

          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginTop: 5
            }}
          >
            <Text style={{ fontSize: 12, color: COLORS.dark }}>{pet.tipo}</Text>
            <Text style={{ fontSize: 13, color: COLORS.dark }}>{pet.edad}</Text>
          </View>

          <View style={{ marginTop: 5, flexDirection: "row" }}>
            <Icon name="map-marker" color={COLORS.primary} size={20} />
            <Text style={{ fontSize: 14, color: COLORS.grey, marginLeft: 5 }}>{pet.ubicacion}</Text>
          </View>
        </View>
      </View>

      <View style={{ marginTop: 80, justifyContent: "space-between", flex: 1 }}>
        
        <View>
          <View style={{ flexDirection: "row", paddingHorizontal: 20 }}>
            {/* <Image
              source={require("../../../assets/img/person.jpg")}
              style={{ height: 40, width: 40, borderRadius: 20 }}
            />
            <View style={{ flex: 1, paddingLeft: 10 }}>
              <Text style={{ color: COLORS.dark, fontSize: 12, fontWeight: "bold" }}>
                JANE GARY
              </Text>
              <Text
                style={{
                  color: COLORS.grey,
                  fontSize: 11,
                  fontWeight: "bold",
                  marginTop: 2
                }}
              >
                Owner
              </Text>
            </View> */}
            {/* <Text style={{ color: COLORS.grey, fontSize: 12 }}>May 25, 2020</Text> */}
          </View>
          <Text style={style.comment}>{pet.descripcion}.</Text>
        </View>

        <View style={style.footer}>
          <Pressable onPress={()=>navigation.navigate(screen.formulario.nuevoFormulario,{pet})} style={style.btn}>
            <Text style={{ color: COLORS.white, fontWeight: "bold" }}>ADOPTAR</Text>
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
};

const style = StyleSheet.create({
  detailsContainer: {
    height: 120,
    backgroundColor: COLORS.white,
    marginHorizontal: 20,
    flex: 1,
    bottom: -60,
    borderRadius: 18,
    elevation: 10,
    padding: 20,
    justifyContent: "center"
  },
  comment: {
    marginTop: 10,
    fontSize: 14,
    color: COLORS.dark,
    lineHeight: 20,
    marginHorizontal: 20
  },
  footer: {
    height: 100,
    backgroundColor: COLORS.light,
    borderTopRightRadius: 20,
    borderTopLeftRadius: 30,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20
  },
  iconCon: {
    backgroundColor: COLORS.primary,
    width: 50,
    height: 50,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 15
  },
  btn: {
    backgroundColor: '#E05E5C',
    flex: 1,
    height: 50,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center"
  },
  header: {
    flexDirection: "row",
    padding: 20,
    justifyContent: "space-between"
  }
});
export default DetailsScreen;
