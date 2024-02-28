import React, { useEffect, useCallback, useState } from "react";
import {
  Dimensions,
  SafeAreaView,
  View,
  Image,
  Text,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  ActivityIndicator
} from "react-native";
import COLORS from "../../const/colors";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { useAnimalsContext } from "../../context/AnimalsContext";
const { height } = Dimensions.get("window");

import { collection, getDocs, getFirestore } from "firebase/firestore";
import { initFirebase } from "../../utils/firebase";
import { useFocusEffect } from "@react-navigation/native";
const db = getFirestore(initFirebase);

const petCategories = [
  { name: "Gato", icon: "cat" },
  { name: "Perro", icon: "dog" },
  { name: "Ave", icon: "ladybug" },
  { name: "Conejo", icon: "rabbit" }
];
const HomeScreen = ({ navigation }) => {
  const [Lista, setLista] = useState([]);
  const [ListaFilter, setListaFilter] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState();
  const { updateData, isData, resetData } = useAnimalsContext();

  useFocusEffect(
    useCallback(() => {
      updateData(true);

      return () => {
        updateData(false);
      };
    }, [])
  );

  useEffect(() => {
    const getLista = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "Animales"));
        const docs = [];
        querySnapshot.forEach((doc) => {
          const {
            id,
            nombre,
            edad,
            genero,
            raza,
            ubicacion,
            descripcion,
            tipo,
            disponibilidad,
            foto
          } = doc.data();
          docs.push({
            id,
            foto,
            nombre,
            edad,
            raza,
            ubicacion,
            genero,
            descripcion,
            tipo,
            disponibilidad
          });
        });
        setLista(docs);
        setListaFilter(docs);
      } catch (error) {
        console.log(error);
      }
    };
    getLista();
  }, [isData]);

  const handleFilter = (text) => {
    if (text) {
      const filteredList = Lista.filter((item) =>
        item.tipo?.toLowerCase().includes(text.toLowerCase())
      );
      setListaFilter(filteredList);
    } else {
      setListaFilter(Lista);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, color: COLORS.white }}>
      <View style={style.mainContainer}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between"
          }}
        >
          {petCategories.map(({ name, icon }) => (
            <View key={name} style={{ alignItems: "center" }}>
              <TouchableOpacity
                onPress={() => {
                  handleFilter(name);
                  setSelectedCategory(name)
                }}
                style={[
                  style.categoryBtn,
                  {
                    backgroundColor: selectedCategory == name ? COLORS.primary : COLORS.white
                  }
                ]}
              >
                <Icon name={icon} size={30} color={selectedCategory == name ? COLORS.white : COLORS.primary} />
              </TouchableOpacity>
              <Text style={style.categoryBtnName}>{name}</Text>
            </View>
          ))}
        </View>

        <View style={{ marginTop: 20 }}>
          {ListaFilter.length > 0 ? (
            <FlatList
              showsVerticalScrollIndicator={false}
              data={ListaFilter}
              renderItem={({ item }) => <Card pet={item} navigation={navigation} />}
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
    <TouchableOpacity activeOpacity={0.8} onPress={() => navigation.navigate("detailsScreen", pet)}>
      <View style={style.cardContainer}>

        <View style={style.cardImageContainer}>
          <Image
            source={{ uri: pet.foto }}
            style={{
              width: "100%",
              height: "100%",
              resizeMode: "contain"
            }}
          />
        </View>

        <View style={style.cardDetailsContainer}>

          <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
            <Text
              style={{
                fontWeight: "bold",
                color: COLORS.dark,
                fontSize: 20,
                textTransform: "capitalize"
              }}
            >
              {pet?.nombre}
            </Text>
            {pet.genero === "femenino" ? (
              <Icon name="gender-male" size={22} color="#cf69bf" />
            ) : (
              <Icon name="gender-female" size={22} color="#5087e6" />
            )}
          </View>

          <Text
            style={{ fontSize: 12, marginTop: 5, color: COLORS.dark, textTransform: "capitalize" }}
          >
            {pet?.tipo}
          </Text>
          <Text style={{ fontSize: 10, marginTop: 5, color: COLORS.grey }}>{pet?.edad}</Text>

          <View style={{ marginTop: 5, flexDirection: "row" }}>
            <Icon name="map-marker" color={COLORS.primary} size={18} />
            <Text
              style={{
                fontSize: 12,
                color: COLORS.grey,
                marginLeft: 5,
                textTransform: "capitalize"
              }}
            >
              {pet?.ubicacion}
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
    alignItems: "center"
  },
  mainContainer: {
    flex: 1,
    backgroundColor: COLORS.light,
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    paddingHorizontal: 20,
    paddingVertical: 40,
    minHeight: height
  },
  searchInputContainer: {
    height: 50,
    backgroundColor: COLORS.white,
    borderRadius: 7,
    paddingHorizontal: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between"
  },
  categoryBtn: {
    height: 50,
    width: 50,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10
  },
  categoryBtnName: {
    color: COLORS.dark,
    fontSize: 10,
    marginTop: 5,
    fontWeight: "bold",
    textTransform: "capitalize"
  },
  cardContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20
  },
  cardDetailsContainer: {
    height: 120,
    backgroundColor: COLORS.white,
    flex: 1,
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
    padding: 20,
    justifyContent: "center"
  },
  cardImageContainer: {
    height: 150,
    width: 140,
    backgroundColor: COLORS.background,
    borderRadius: 20
  }
});
export default HomeScreen;
