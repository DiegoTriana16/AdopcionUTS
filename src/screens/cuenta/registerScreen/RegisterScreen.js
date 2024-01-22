import React from 'react'
import { View } from 'react-native'
import {Image} from "react-native-elements"
import {RegisterForm} from "../../../components/auth"
import {KeyboardAwareScrollView} from "react-native-keyboard-aware-scroll-view"
import {styles} from './registerScreen.style'

export function RegisterScreen() {
  return (
    <KeyboardAwareScrollView>
     <Image source = {require("../../../../assets/img/imagen2.jpg")} style= {styles.image}/>
     <View style={styles.content}>
       < RegisterForm />
      </View> 
    </KeyboardAwareScrollView>

  )
}