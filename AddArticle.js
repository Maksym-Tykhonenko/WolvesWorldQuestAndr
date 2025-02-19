import React, { useState, useContext } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Image,
  Dimensions,
  ImageBackground,
  SafeAreaView
} from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';
import { WolfDataContext } from './WolfDataContext'; // Импортируем контекст

const { width } = Dimensions.get('window');

const AddArticle = ({ navigation }) => {
  const [name, setName] = useState('');
  const [details, setDetails] = useState('');
  const [image, setImage] = useState(null);
  const { addWolfData } = useContext(WolfDataContext); // Используем функцию добавления из контекста

  const handleImagePick = () => {
    launchImageLibrary(
      {
        mediaType: 'photo',
        quality: 0.8,
      },
      (response) => {
        if (!response.didCancel && !response.errorMessage && response.assets) {
          const selectedImage = response.assets[0];
          setImage({ uri: selectedImage.uri });
        }
      }
    );
  };

  const handleSave = () => {
    if (name && details && image) {
      const newWolf = {
        name,
        details,
        image: image.uri,
        photoAlbum: [image.uri],
        isStock: false,
      };
      addWolfData(newWolf); // Добавляем породу через контекст
      navigation.goBack();
    } else {
      alert('Please fill in all fields and select an image.');
    }
  };

  return (
    <ImageBackground source={require('./back.jpg')} style={styles.backgroundImage}>
      <View style={styles.container}>
        <TouchableOpacity style={styles.exitButton} onPress={() => navigation.goBack()}>
          <Text style={styles.exitButtonText}>✖️</Text>
        </TouchableOpacity>
        <Text style={styles.title}>Add New Wolf</Text>
        <TextInput
          placeholder="Enter Wolf Name"
          style={styles.input}
          value={name}
          onChangeText={setName}
          placeholderTextColor="white"
        />
        <TextInput
          placeholder="Enter Wolf Details"
          style={[styles.input, { height: 100, textAlignVertical: 'top' }]}
          value={details}
          onChangeText={setDetails}
          multiline
          placeholderTextColor="white"
        />
        <TouchableOpacity style={styles.imagePicker} onPress={handleImagePick}>
          <Text style={styles.imagePickerText}>
            {image ? 'Change Image' : 'Select Image'}
          </Text>
        </TouchableOpacity>
        {image && <Image source={image} style={styles.previewImage} />}
        <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
          <Text style={styles.saveButtonText}>Save</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
  },
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  exitButton: {
    position: 'absolute',
    top: 60,
    left: 20,
    backgroundColor: '#6C81A8',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 20,
    borderColor: '#FFF',
    borderWidth: 2,
    zIndex: 10,
  },
  exitButtonText: {
    fontSize: 18,
    fontWeight: '700',
    color: '#FFF',
    textAlign: 'center',
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 30,
    textAlign: 'center',
    color: 'white',
  },
  input: {
    color: 'white',
    borderWidth: 1,
    borderColor: 'white',
    padding: 10,
    borderRadius: 8,
    marginBottom: 20,
  },
  imagePicker: {
    backgroundColor: '#6C81A8',
    padding: 15,
    borderRadius: 8,
    marginBottom: 20,
    alignItems: 'center',
  },
  imagePickerText: {
    color: 'white',
    fontWeight: 'bold',
  },
  previewImage: {
    width: width * 0.8,
    height: width * 0.5,
    resizeMode: 'cover',
    alignSelf: 'center',
    marginBottom: 20,
    borderRadius: 10,
  },
  saveButton: {
    backgroundColor: '#6C81A8',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  saveButtonText: {
    color: '#FFF',
    fontWeight: 'bold',
  },
});

export default AddArticle;