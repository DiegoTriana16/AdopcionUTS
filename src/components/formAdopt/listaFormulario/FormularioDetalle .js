import React from 'react';
import { TouchableOpacity, View, Text, ScrollView } from 'react-native';
import { TraerImagen } from '../../../utils/traerImagen';
import { styles } from './ListaFormulario.styles';
import { ButtonGroup, Input, Button} from 'react-native-elements';
import { useFormik } from "formik"
import { initialValues, validationSchema } from "./formulario.data"

const FormularioDetalle = ({ formularioSeleccionado, closeModal }) => {

  const estadosSolicitud = ['En estudio', 'Aprobado', 'Rechazado', 'Mascota no Disponible'];

  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: validationSchema(),
    validateOnChange: false,
    onSubmit: async (formValue) => {
      try {

        formValue.fechaRevision = new Date();

        console.log(formValue)
        const dataFirebase = { ...formValue, isValid: true, estado: 'En estudio', mascota: pet };
        const docRef = await addDoc(collection(db, 'formularioTest'), dataFirebase);
        const nuevoFormularioId = docRef.id;
        dataFirebase.formularioId = nuevoFormularioId;
        await updateDoc(docRef, dataFirebase);
        console.log('guardado con exito')
        console.log(dataFirebase)
        goToFormulario();

      } catch (error) {
        Toast.show({
          type: "error",
          position: "bottom",
          text1: "Error al guardar el formulario",
        });
      }
    }

  });





  const mascota = formularioSeleccionado.pet;
  return (
    <ScrollView>
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>

          <Text style={styles.formularioTitle}>Formulario</Text>
          <Text style={styles.formularioTitle}>{formularioSeleccionado?.mascota?.nombre}</Text>
          <View style={styles.imageContainer}>
            <TraerImagen uri={formularioSeleccionado?.mascota?.foto} />
          </View>
          <View style={styles.formDetailsContainer}>

            {/* Datos Personales */}
            <Text style={styles.fieldLabel}>Nombre completo:</Text>
            <Text style={styles.fieldValue}>{formularioSeleccionado?.nombreApellido}</Text>
            <Text style={styles.fieldLabel}>Cédula:</Text>
            <Text style={styles.fieldValue}>{formularioSeleccionado?.cedula}</Text>
            <Text style={styles.fieldLabel}>Teléfono:</Text>
            <Text style={styles.fieldValue}>{formularioSeleccionado?.celular}</Text>
            <Text style={styles.fieldLabel}>Dirección:</Text>
            <Text style={styles.fieldValue}>{formularioSeleccionado?.direccion}</Text>
            <Text style={styles.fieldLabel}>Profesión:</Text>
            <Text style={styles.fieldValue}>{formularioSeleccionado?.Profesión}</Text>
            <Text style={styles.fieldLabel}>Motivo de adopción:</Text>
            <Text style={styles.fieldValue}>{formularioSeleccionado?.motivoAdopcion}</Text>

            {/* Criterio de Adopción */}
            <Text style={styles.fieldLabel}>Vives en casa o apartamento:</Text>
            <ButtonGroup
              selectedIndex={formularioSeleccionado?.vivesCasaApartamento === 'Casa' ? 0 : 1}
              buttons={['Casa', 'Apartamento']}
              containerStyle={{ marginTop: 10 }}
              disabled
            />
            <Text style={styles.fieldLabel}>¿Permiten mascotas en tu lugar de vivienda?:</Text>
            <ButtonGroup
              selectedIndex={formularioSeleccionado?.permitenMascotas ? 0 : 1}
              buttons={['Sí', 'No']}
              containerStyle={{ marginTop: 10 }}
              disabled
            />
            <Text style={styles.fieldLabel}>¿Qué harías si tuvieras que mudarte?:</Text>
            <Text style={styles.fieldValue}>{formularioSeleccionado?.mudanza}</Text>
            <Text style={styles.fieldLabel}>¿Algún familiar alérgico a las mascotas?:</Text>
            <ButtonGroup
              selectedIndex={formularioSeleccionado?.familiarAlergico ? 0 : 1}
              buttons={['Sí', 'No']}
              containerStyle={{ marginTop: 10 }}
              disabled
            />

            {/* Sobre las Mascotas */}
            <Text style={styles.fieldLabel}>¿Has tenido mascotas antes?:</Text>
            <ButtonGroup
              selectedIndex={formularioSeleccionado?.experienciasMascotas ? 0 : 1}
              buttons={['Sí', 'No']}
              containerStyle={{ marginTop: 10 }}
              disabled
            />
            <Text style={styles.fieldLabel}>¿Qué pasó con ellas?:</Text>
            <Text style={styles.fieldValue}>{formularioSeleccionado?.quePasoConMascotasAnteriores}</Text>
            <Text style={styles.fieldLabel}>¿Tienes otras mascotas actualmente?:</Text>
            <Text style={styles.fieldValue}>{formularioSeleccionado?.tieneOtrasMascotas}</Text>
            <Text style={styles.fieldLabel}>¿Dónde dormirá la mascota?:</Text>
            <Text style={styles.fieldValue}>{formularioSeleccionado?.lugarDormirMascota}</Text>
            <Text style={styles.fieldLabel}>¿Qué harás con tus mascotas si realizas un viaje?:</Text>
            <Text style={styles.fieldValue}>{formularioSeleccionado?.queHacesConMascotasEnViaje}</Text>

            {/* Estado Solicitud */}
            <Text style={styles.fieldLabel}>Estado Solicitud:</Text>
            <Text style={styles.fieldValue}>{formularioSeleccionado?.estado}</Text>

            <Text style={styles.fieldLabel}>recomendaciones:</Text>
            <Input
              placeholder="recomendaciones"
              containerStyle={styles.input}
              onChangeText={(text) => formik.setFieldValue("recomendaciones", text)}
              errorMessage={formik.errors.direccion}
            />

            <Text style={styles.fieldLabel}>Observaciones:</Text>
            <Input
              placeholder="observaciones"
              containerStyle={styles.input}
              onChangeText={(text) => formik.setFieldValue("observaciones", text)}
              errorMessage={formik.errors.direccion}
            />
          </View>

        

          <Button
            title="Actualizar Formulario"
            containerStyle={styles.btnContainer}
            buttonStyle={styles.btn}
            onPress={useFormik}
            loading={formik.isSubmitting}
          />

          {/* Botón para cerrar el modal */}
          <TouchableOpacity
            style={styles.closeModalButton}
            onPress={closeModal}
          >
            <Text style={styles.closeModalButtonText}>Cerrar Modal</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

export default FormularioDetalle;
