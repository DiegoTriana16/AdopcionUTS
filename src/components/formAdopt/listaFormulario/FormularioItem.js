import React from 'react';
import { TouchableOpacity, View, Text } from 'react-native';
import { Icon } from 'react-native-elements';
import { styles } from './ListaFormulario.styles';

const FormularioItem = ({ formulario, onPress }) => (
  <TouchableOpacity onPress={onPress} style={styles.itemContainer}>
    <View>
      <Text style={styles.itemText}>Email: {formulario.email}</Text>
      <Text style={styles.itemText}>Estado: {formulario.estado}</Text>
    </View>
    <View style={styles.arrowContainer}>
      <Icon
        name="chevron-right"
        type="entypo"
        size={24}
        color="#555"
      />
    </View>
  </TouchableOpacity>
);

export default FormularioItem;
