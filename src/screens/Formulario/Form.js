import { Image, KeyboardAvoidingView, View } from "react-native";
import { Input, Icon, Button, ButtonGroup, Text } from "react-native-elements";
import { useFocusEffect, useNavigation } from "@react-navigation/native";

import { styles } from "./Form.Style";
import useFormulario from "./useFormulario";
import { ScrollView } from "react-native-gesture-handler";
import { useCallback } from "react";

function FormularioAnimal() {
  const navigation = useNavigation();

  const goToHome = () => {
    navigation.navigate("HomeScreen");
  }

  const { CargarImagen, image, formik } = useFormulario(goToHome);

  const textToLowerCase = (text) => {
    return text.trim().toLowerCase();
  };

  useFocusEffect(
    useCallback(() => {
      formik.resetForm()

      return () => {
        // updateData(false);
      };
    }, [])
  );

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1, paddingBottom: 10 }}
    >
      <ScrollView style={{ flex: 1 }}>
        <View style={styles.content}>
          <Input
            placeholder="Nombre"
            containerStyle={styles.input}
            rightIcon={<Icon type="material-community" name="account" iconStyle={styles.icon} />}
            onChangeText={(text) => formik.setFieldValue("nombre", textToLowerCase(text))}
            errorMessage={formik.errors.nombre}
          />

          <Input
            placeholder="Edad"
            containerStyle={styles.input}
            rightIcon={<Icon type="material-community" name="cake" iconStyle={styles.icon} />}
            onChangeText={(text) => formik.setFieldValue("edad", textToLowerCase(text))}
            errorMessage={formik.errors.edad}
          />

          <Input
            placeholder="Raza de la mascota"
            containerStyle={styles.input}
            rightIcon={<Icon type="material-community" name="dog" iconStyle={styles.icon} />}
            onChangeText={(text) => formik.setFieldValue("raza", textToLowerCase(text))}
            errorMessage={formik.errors.raza}
          />

          <Input
            placeholder="Ubicacion"
            containerStyle={styles.input}
            rightIcon={<Icon type="material-community" name="map-marker" iconStyle={styles.icon} />}
            onChangeText={(text) => formik.setFieldValue("ubicacion", textToLowerCase(text))}
            errorMessage={formik.errors.ubicacion}
          />

          <Text> genero de la mascota </Text>
          <ButtonGroup
            selectedIndex={formik.values.genero === 'femenino' ? 0 : 1}
            buttons={['femenino', 'masculino']}
            onPress={(selectedIndex) => formik.setFieldValue("genero", selectedIndex === 0 ? 'femenino' : 'masculino')}
            containerStyle={{ marginTop: 10 }}
            selectedButtonStyle={{ backgroundColor: '#E05E5C' }}
          />

          <Input
            placeholder="Descripcion"
            containerStyle={styles.input}
            rightIcon={<Icon type="material-community" name="image-text" iconStyle={styles.icon} />}
            onChangeText={(text) => formik.setFieldValue("descripcion", textToLowerCase(text))}
            errorMessage={formik.errors.descripcion}
          />
          <Input
            placeholder="Tipo de mascota"
            containerStyle={styles.input}
            rightIcon={<Icon type="material-community" name="cat" iconStyle={styles.icon} />}
            onChangeText={(text) => formik.setFieldValue("tipo", textToLowerCase(text))}
            errorMessage={formik.errors.descripcion}
          />
          <View style={{ display: 'none' }}>
            <Input
              placeholder="Disponibilidad"
              containerStyle={styles.input}
              rightIcon={<Icon type="material-community" name="at" iconStyle={styles.icon} />}
              onChangeText={(text) => formik.setFieldValue("disponibilidad", textToLowerCase(text))}
              errorMessage={formik.errors.descripcion}
            />
          </View>

          {image && (
            <Image
              height={100}
              source={{ uri: image }}
              // style={{ backgroundColor: "red" }}
              width={100}
            />
          )}

          <Button
            title="Cargar Imagen"
            containerStyle={styles.btnContainer}
            buttonStyle={styles.btnStyle}
            onPress={CargarImagen}
          />

          <Button
            title="Guardar Mascota"
            containerStyle={styles.btnContainer}
            buttonStyle={styles.btnStyle}
            onPress={formik.handleSubmit}
            loading={formik.isSubmitting}
          />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

export default FormularioAnimal;
