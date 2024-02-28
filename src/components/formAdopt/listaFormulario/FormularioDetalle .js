import React from 'react';
import { ScrollView, View, Text, TouchableOpacity } from 'react-native';
import { styles } from './ListaFormulario.styles';
import { TraerImagen } from '../../../utils/traerImagen';

const FormularioDetalle = ({ formularioSeleccionado, closeModal }) => (
  <ScrollView>
    <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            
            <Text style={styles.formularioTitle}>Formulario</Text>
            <View style={styles.imageContainer}>
              <TraerImagen uri={formularioSeleccionado?.urlDeLaImagen} />
            </View>            
            <View style={styles.formDetailsContainer}>
            <Text style={styles.modalText}>Email: {formularioSeleccionado?.email}</Text>
            <Text style={styles.modalText}>Estado: {formularioSeleccionado?.estado}</Text>

            {/* Datos Personales */}
            <Text style={styles.modalText}>Nombre completo: {formularioSeleccionado?.nombreApellido}</Text>
            <Text style={styles.modalText}>Cédula: {formularioSeleccionado?.cedula}</Text>
            <Text style={styles.modalText}>Teléfono: {formularioSeleccionado?.celular}</Text>
            <Text style={styles.modalText}>Dirección: {formularioSeleccionado?.direccion}</Text>
            <Text style={styles.modalText}>Profesión: {formularioSeleccionado?.Profesión}</Text>
            <Text style={styles.modalText}>Motivo de adopción: {formularioSeleccionado?.motivoAdopcion}</Text>

            {/* Criterio de Adopción */}
            <Text style={styles.modalText}>Vives en casa o apartamento: {formularioSeleccionado?.vivesCasaApartamento}</Text>
            <Text style={styles.modalText}>¿Permiten mascotas en tu lugar de vivienda?: {formularioSeleccionado?.permitenMascotas ? 'Sí' : 'No'}</Text>
            <Text style={styles.modalText}>¿Qué harías si tuvieras que mudarte?: {formularioSeleccionado?.mudanza}</Text>
            <Text style={styles.modalText}>¿Algún familiar alérgico a las mascotas?: {formularioSeleccionado?.familiarAlergico ? 'Sí' : 'No'}</Text>

            {/* Sobre las Mascotas */}
            <Text style={styles.modalText}>¿Has tenido mascotas antes?: {formularioSeleccionado?.experienciasMascotas ? 'Sí' : 'No'}</Text>
            <Text style={styles.modalText}>¿Qué pasó con ellas?: {formularioSeleccionado?.quePasoConMascotasAnteriores}</Text>
            <Text style={styles.modalText}>¿Tienes otras mascotas actualmente?: {formularioSeleccionado?.tieneOtrasMascotas}</Text>
            <Text style={styles.modalText}>¿Dónde dormirá la mascota?: {formularioSeleccionado?.lugarDormirMascota}</Text>
            <Text style={styles.modalText}>¿Qué harás con tus mascotas si realizas un viaje?: {formularioSeleccionado?.queHacesConMascotasEnViaje}</Text>
            <Text style={styles.modalText}>Estado Solicitud: {formularioSeleccionado?.estado}</Text>
            </View>
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

export default FormularioDetalle;
