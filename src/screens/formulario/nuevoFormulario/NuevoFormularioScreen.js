import { View, Text } from 'react-native'
import React from 'react'
import { styles } from './NuevoFormularioScreen.styles'
import { FormularioAdop } from "../../../components/formAdopt"
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view"
import { Image } from "react-native-elements"
import { TraerImagen } from '../../../utils/traerImagen'


export function NuevoFormularioScreen({ route }) {

  const pet = route.params.pet;

  console.log('LOG pet:', pet);
  const fotoUrl = pet.foto;

  console.log('LOG pet?.foto:', fotoUrl);

  return (
    <KeyboardAwareScrollView>
      <Text style={styles.tituloStyle}>{pet.nombre}</Text>
      <TraerImagen uri={pet?.foto} />
      <View>
        <FormularioAdop pet={pet} />
      </View>
    </KeyboardAwareScrollView>
  )
}
