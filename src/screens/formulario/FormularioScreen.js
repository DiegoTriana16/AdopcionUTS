import { View, ScrollView } from 'react-native'
import React, { useState } from 'react'
import { useNavigation } from "@react-navigation/native"
import { Text, Button, Image } from 'react-native-elements'
import { screen } from '../../utils';
import { ListaFormulario } from "../../components/formAdopt/listaFormulario"


export function FormularioScreen() {
  const navigation = useNavigation();

  const goToNuevoFormulario = () => {
    navigation.navigate(screen.formulario.nuevoFormulario)
  }


  return (
    <ScrollView>
      <View>
        <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 10, marginLeft: 'auto', marginRight: 'auto' }}>
          Formulario
        </Text>
        <ListaFormulario />
        <Button
          title="Nuevo Formulario"
          onPress={goToNuevoFormulario}
          buttonStyle={{ backgroundColor: '#3498db', borderRadius: 8, marginTop: 20 }}
          titleStyle={{ fontWeight: 'bold' }}
        />
      </View>
    </ScrollView>
  )
}
