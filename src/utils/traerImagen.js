import React from 'react';
import { View, Image, StyleSheet } from 'react-native';

export const TraerImagen = ({ uri }) => {
  console.log("hello there")
  console.log(uri)
  const imageUrl = uri || 'https://firebasestorage.googleapis.com/v0/b/adopcion-fa25c.appspot.com/o/Animales%2Ftraductor?alt=media&token=a792bfa6-5347-45cf-942a-9a964d553a5a';

  return (
    <View style={styles.container}>
      <Image source={{ uri: imageUrl }} style={styles.image} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 300,
    height: 250,
    resizeMode: 'cover',
    borderRadius: 10,
  },
});