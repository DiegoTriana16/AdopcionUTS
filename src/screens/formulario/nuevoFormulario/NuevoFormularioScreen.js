import { View, Text } from 'react-native'
import React from 'react'
import { styles } from './NuevoFormularioScreen.styles'
import {FormularioAdop} from "../../../components/formAdopt"
import {KeyboardAwareScrollView} from "react-native-keyboard-aware-scroll-view"
import {Image} from "react-native-elements"


export function NuevoFormularioScreen ({route})  {

  const pet = route.params;
  console.log(pet)

  return (
    <KeyboardAwareScrollView>
     <Image source = {require("../../../../assets/img/gatomega.jpg")} style= {styles.image}/>
      <View>
        <FormularioAdop/>
      </View>
    </KeyboardAwareScrollView>
  )
}
