import { useState } from "react";
import * as ImagePicker from "expo-image-picker";
import { getStorage, getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { useFormik } from "formik";
import Toast from "react-native-toast-message";
import { initialValues, validationSchema } from "./Formulario.data";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../../utils/firebase";
import { useAnimalsContext } from "../../context/AnimalsContext";

const useFormulario = (goToHome) => {
  const [image, setImage] = useState(null);
  const { updateData, isData } = useAnimalsContext();

  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: validationSchema(),
    validateOnChange: false,
    onSubmit: async (formValue, { resetForm }) => {
      try {
        await SubirImagenFirebase(image);
        const url = await getImages();
        const mascota = { ...formValue, id: uuid(), foto: url };
        const document = await addDoc(collection(db, "Animales"), mascota);
        resetForm({
          values: {
            nombre: "",
            edad: "",
            raza: "",
            ubicacion: "",
            genero: "",
            descripcion: "",
            tipo: "",
            disponibilidad: ""
          }
        });

        Toast.show({
          type: "success",
          position: "top",
          text1: "Agregado correctamente"
        });
      } catch (error) {
        Toast.show({
          type: "error",
          position: "top",
          text1: "No se pudo crear animal"
        });
        console.log(error);
      }
    }
  });

  const uuid = () => {
    const fecha = Date.now().toString();
    const random = Math.random().toString(36).substring(2);
    return fecha + random;
  };
  const CargarImagen = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const SubirImagenFirebase = async (path) => {
    const storage = getStorage();
    const name = formik.values.nombre;
    const nameUrl = name.split(" ").join("-");
    const storageRef = ref(storage, `Animales/${nameUrl}`);

    const imageblob = await FetchImage(path);
    await uploadBytes(storageRef, imageblob)
      .then((snapshot) => {
        console.log("Subiste un blob o archivo!");
      })
      .catch((err) => {
        console.log(err);
        toastAlert("error", "top", "No se ha podido cargar la imagen");
        return;
      });
  };

  const FetchImage = async (path) => {
    const image = await fetch(path);
    return image.blob();
  };

  const getImages = async () => {
    const storage = getStorage();
    const imagesRef = ref(storage, `Animales/${formik.values.nombre}`);
    const url = await getDownloadURL(imagesRef);
    return url;
  };
  return {
    CargarImagen,
    image,
    formik
  };
};

export default useFormulario;
