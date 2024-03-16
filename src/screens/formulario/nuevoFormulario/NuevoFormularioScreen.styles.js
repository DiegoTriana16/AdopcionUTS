import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({

    content: {
        marginHorizontal: 30,
    },
    image: {
        resizeMode: "contain",
        height: 300,
        width: "100%",
        marginBottom: 40
    },
    title: {
        fontWeight: "bold",
        fontSize: 19,
        marginBottom: 10,
        textAlign: "center"
    },
    descripcion: {
        textAlign: "center",
        marginBottom: 20,
    },
    buttonStyle: {
        backgroundColor: "#000ba6"
    },
    imageContainer: {
        alignItems: 'center',
        marginBottom: 20,
    },
    tituloStyle: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        marginTop: 10,
        marginBottom: 20,
        // Puedes agregar más estilos según tus preferencias
    }

});