import React, { useEffect } from "react";
import {
  Dimensions,
  SafeAreaView,
  View,
  Image,
  TextInput,
  Text,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import COLORS from "../../const/colors";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
const { height } = Dimensions.get("window");
const petCategories = [
  { name: "CATS", icon: "cat" },
  { name: "DOGS", icon: "dog" },
  { name: "BIRDS", icon: "ladybug" },
  { name: "BUNNIES", icon: "rabbit" },
];
import { collection, getDocs, getFirestore } from "firebase/firestore";
import { initFirebase } from "../../utils/firebase";

const db = getFirestore(initFirebase);

const HomeScreen = ({ navigation }) => {
  const [selectedCategoryIndex, setSeletedCategoryIndex] = React.useState(0);
  const [filteredPets, setFilteredPets] = React.useState([]);
  const [Lista, setLista] = React.useState([]);

  useEffect(() => {
    const getLista = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "Animales"));
        const docs = [];
        querySnapshot.forEach((doc) => {
          const { Nombre, Edad, Genero, Raza, Ubicacion, Descripcion, Tipo } =
            doc.data();
          docs.push({
            id: doc.id,
            Nombre,
            Edad,
            Genero,
            Raza,
            Ubicacion,
            Descripcion,
            Tipo,
          });
        });
        setLista(docs);
      } catch (error) {
        console.log(error);
      }
    };
    getLista();
  }, []);

  const fliterPet = (index) => {
    const currentPets = Lista.filter(
      (item) => item?.Tipo?.toLowerCase() == petCategories[index].name
    )[0]?.pets;
    setFilteredPets(currentPets);
  };

  React.useEffect(() => {
    fliterPet(0);
  }, []);

  return (
    <SafeAreaView style={{ flex: 1, color: COLORS.white }}>
      <View style={style.mainContainer}>
        {/* Render the search inputs and icons */}
        <View style={style.searchInputContainer}>
          <Icon name="magnify" size={24} color={COLORS.grey} />
          <TextInput
            placeholderTextColor={COLORS.grey}
            placeholder="Search pet to adopt"
            style={{ flex: 1 }}
          />
          <Icon name="sort-ascending" size={24} color={COLORS.grey} />
        </View>

        {/* Render all the categories */}
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            marginTop: 20,
          }}
        >
          {petCategories.map((item, index) => (
            <View key={"pet" + index} style={{ alignItems: "center" }}>
              <TouchableOpacity
                onPress={() => {
                  setSeletedCategoryIndex(index);
                  fliterPet(index);
                }}
                style={[
                  style.categoryBtn,
                  {
                    backgroundColor:
                      selectedCategoryIndex == index
                        ? COLORS.primary
                        : COLORS.white,
                  },
                ]}
              >
                <Icon
                  name={item.icon}
                  size={30}
                  color={
                    selectedCategoryIndex == index
                      ? COLORS.white
                      : COLORS.primary
                  }
                />
              </TouchableOpacity>
              <Text style={style.categoryBtnName}>{item.name}</Text>
            </View>
          ))}
        </View>

        {/* Render the cards with flatlist */}
        <View style={{ marginTop: 20 }}>
          {Lista.length > 0 ? (
            <FlatList
              showsVerticalScrollIndicator={false}
              data={Lista}
              renderItem={({ item }) => (
                <Card pet={item} navigation={navigation} />
              )}
            />
          ) : (
            <ActivityIndicator size="large" />
          )}
        </View>
      </View>
    </SafeAreaView>
  );
};

const Card = ({ pet, navigation }) => {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={() => navigation.navigate("detailsScreen", pet)}
    >
      <View style={style.cardContainer}>
        {/* Render the card image */}
        <View style={style.cardImageContainer}>
          <Image
            source={pet.image}
            style={{
              width: "100%",
              height: "100%",
              resizeMode: "contain",
            }}
          />
        </View>

        {/* Render all the card details here */}
        <View style={style.cardDetailsContainer}>
          {/* Name and gender icon */}
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <Text
              style={{ fontWeight: "bold", color: COLORS.dark, fontSize: 20 }}
            >
              {pet?.Nombre}
            </Text>
            {pet.Genero === "Hembra" ? (
              <Icon name="gender-male" size={22} color={COLORS.grey} />
            ) : (
              <Icon name="gender-female" size={22} color={COLORS.grey} />
            )}
          </View>

          {/* Render the age and type */}
          <Text style={{ fontSize: 12, marginTop: 5, color: COLORS.dark }}>
            {pet?.Tipo}
          </Text>
          <Text style={{ fontSize: 10, marginTop: 5, color: COLORS.grey }}>
            {pet?.Edad}
          </Text>

          {/* Render distance and the icon */}
          <View style={{ marginTop: 5, flexDirection: "row" }}>
            <Icon name="map-marker" color={COLORS.primary} size={18} />
            <Text style={{ fontSize: 12, color: COLORS.grey, marginLeft: 5 }}>
              pet?.Ubicacion
            </Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const style = StyleSheet.create({
  header: {
    padding: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  mainContainer: {
    flex: 1,
    backgroundColor: COLORS.light,
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    marginTop: 20,
    paddingHorizontal: 20,
    paddingVertical: 40,
    minHeight: height,
  },
  searchInputContainer: {
    height: 50,
    backgroundColor: COLORS.white,
    borderRadius: 7,
    paddingHorizontal: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  categoryBtn: {
    height: 50,
    width: 50,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
  },
  categoryBtnName: {
    color: COLORS.dark,
    fontSize: 10,
    marginTop: 5,
    fontWeight: "bold",
  },
  cardContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  cardDetailsContainer: {
    height: 120,
    backgroundColor: COLORS.white,
    flex: 1,
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
    padding: 20,
    justifyContent: "center",
  },
  cardImageContainer: {
    height: 150,
    width: 140,
    backgroundColor: COLORS.background,
    borderRadius: 20,
  },
});
export default HomeScreen;
