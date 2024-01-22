import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  content: {
    backgroundColor: "#E1615F",
    flex: 1,
    justifyContent: "center",
    alignItems: " center",
    padding: 20,
  },
  image: {
    resizeMode: "contain",
    height: 300,
    width: "100%",
  },

  descripcion: {
    textAlign: "center",
    marginBottom: 20,
    color: "white",
    fontSize: 18,
    fontWeight: "900",
  },
  contentButtom: {
    alignItems: "center",
  },
  buttonStyle: {
    backgroundColor: "white",
    color: "black",
    width: "80%",
    padding: 10,
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  contentButton: {
    fontSize: 18,
    fontWeight: 'bold'
  },
});
