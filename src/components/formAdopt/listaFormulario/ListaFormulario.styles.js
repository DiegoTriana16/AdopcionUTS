import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({    
    content :{
        flex : 1,
        alignItems: "center",
        justifyContent: "center",
        marginTop:30
    },
    input: {
        width: "100%",
        marginTop: 20
    },
    icon:{
        color: "#c1c1c1"
    },
    btnContainer:{
        marginTop: 20,
        width: "95%"
    },
    btn: {
        backgroundColor: "#000ba6"
    },
    textInputContainer: {
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 5,
        padding: 10,
        marginTop: 10,
        marginBottom: 10,
      },
      itemContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
      },
      itemText: {
        fontSize: 18,
        fontWeight: 'bold',
      },
      arrowContainer: {
        marginLeft: 10,
      },

      modalContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      },
      modalContent: {
        backgroundColor: "white",
        padding: 20,
        borderRadius: 10,
        elevation: 5,
        width: "80%",
      },
      modalText: {
        fontSize: 16,
        marginBottom: 10,
      },
      closeModalButton: {
        marginTop: 20,
        padding: 10,
        backgroundColor: "#000ba6",
        borderRadius: 5,
        alignSelf: "center",
      },
      closeModalButtonText: {
        color: "white",
        fontSize: 16,
        fontWeight: "bold",
      },
      formularioTitle: {
        fontSize: 24,
        fontWeight: "bold",
        color: "#000", // Puedes ajustar el color según tu preferencia
        marginBottom: 15,
        textAlign: "center",
      },
      imageContainer: {
        alignItems: 'center',
        marginBottom: 20,
      },
      formDetailsContainer: {
        paddingHorizontal: 20, // Puedes ajustar el espaciado horizontal según sea necesario
        marginTop: 10, // Puedes ajustar el espaciado superior según sea necesario
      },


    
});