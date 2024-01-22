import React from 'react';
import {
  Dimensions,
  SafeAreaView,
  View,
  Image,
  TextInput,
  Text,
  TouchableOpacity,
  FlatList,
  ScrollView,
  StyleSheet,
} from 'react-native';
import COLORS from '../../const/colors';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import pets from '../../const/pets';

const { height } = Dimensions.get('window');
const petCategories = [
  { name: 'CATS', icon: 'cat' },
  { name: 'DOGS', icon: 'dog' },
  { name: 'BIRDS', icon: 'ladybug' },
  { name: 'BUNNIES', icon: 'rabbit' },
];

const Card = ({ pet, navigation }) => {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={() => navigation.navigate('AnimalesScreen', pet)}>
      <View style={styles.cardContainer}>
        {/* Render the card image */}
        <View style={styles.cardImageContainer}>
          <Image
            source={pet.image}
            style={{
              width: '100%',
              height: '100%',
              resizeMode: 'contain',
            }}
          />
        </View>

        {/* Render all the card details here */}
        <View style={styles.cardDetailsContainer}>
          {/* Name and gender icon */}
          <View
            style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <Text
              style={{ fontWeight: 'bold', color: COLORS.dark, fontSize: 20 }}>
              {pet?.name}
            </Text>
            <Icon name="gender-male" size={22} color={COLORS.grey} />
          </View>

          {/* Render the age and type */}
          <Text style={{ fontSize: 12, marginTop: 5, color: COLORS.dark }}>
            {pet?.type}
          </Text>
          <Text style={{ fontSize: 10, marginTop: 5, color: COLORS.grey }}>
            {pet?.age}
          </Text>

          {/* Render distance and the icon */}
          <View style={{ marginTop: 5, flexDirection: 'row' }}>
            <Icon name="map-marker" color={COLORS.primary} size={18} />
            <Text style={{ fontSize: 12, color: COLORS.grey, marginLeft: 5 }}>
              Distance:7.8km
            </Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export const AnimalesScreen = ({ navigation }) => {
  const [selectedCategoryIndex, setSeletedCategoryIndex] = React.useState(0);
  const [filteredPets, setFilteredPets] = React.useState([]);

  const filterPet = (index) => {
    const currentPets = pets.filter(
      (item) => item?.pet?.toUpperCase() === petCategories[index].name,
    )[0]?.pets;
    setFilteredPets(currentPets);
  };

  React.useEffect(() => {
    filterPet(0);
  }, []);

  return (
    <SafeAreaView style={{ flex: 1, color: COLORS.white }}>
      {/* Resto del código... */}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  // Estilos de tus componentes aquí...
});

export default AnimalesScreen;
