import React , { useState } from 'react'
import { View } from 'react-native'
import {Avatar, Text} from 'react-native-elements';
import {getAuth, updateProfile } from "firebase/auth";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import {styles} from "./InfoUser.styles"
import * as ImagePicker from "expo-image-picker"

export function InfoUser(props) {

  const {setloading, setloadingText} = props;
  const {uid, photoURL, displayName,email} = getAuth().currentUser
  const [avatar, setAvatar] = useState(photoURL);

console.log(getAuth().currentUser)
  const cambiarAvatar = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      madiaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
    });
  
    if (!result.canceled) uploadImage(result.assets[0].uri);
  };

  const uploadImage = async (uri) => {
    setloadingText("Actualizando Avatar");
    setloading(true);

    const response = await fetch(uri);
    const blob = await response.blob();
    const storage = getStorage();
    const storageRef = ref(storage, `avatar/${uid}`);
    console.log("esta es  la respuesta del storageRef" + storageRef);

    uploadBytes(storageRef, blob).then((snapshot) => {
      updatePhotoURL(snapshot.metadata.fullPath);     
    });
  };

  const updatePhotoURL = async (imagePath) => {

    const storage = getStorage();
    const imageRef = ref(storage, imagePath);
    const imageURL = await getDownloadURL(imageRef);
    const auth = getAuth();
    updateProfile(auth.currentUser, {photoURL : imageURL})
    setAvatar(imageURL)
    setloading(false);
  };

  return (
    <View style={styles.content}>
      <Avatar 
      size="large" 
      rounded 
      containerStyle={styles.avatar}
      icon={{ type: "material", name: "person" }}
      source={{ uri: avatar }}
      >
        <Avatar.Accessory size={24} onPress={cambiarAvatar} />
      </Avatar>

      <View>
        <Text style={styles.displayName}>{displayName || "Anonimo"}</Text>
        <Text> {email}</Text>
      </View>
    </View>
  )
}