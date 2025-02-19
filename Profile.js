import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  ScrollView,
  StyleSheet,
  Dimensions,
  ImageBackground,
  SafeAreaView,
} from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';
import { Picker } from '@react-native-picker/picker';
import AsyncStorage from '@react-native-async-storage/async-storage';

const { width, height } = Dimensions.get('window');
const defaultProfilePhoto = require('./user_17740838.png');
const background = require('./back.jpg');

const Profile = ({ navigation }) => {
  const [name, setName] = useState('');
  const [knowledgeLevel, setKnowledgeLevel] = useState('');
  const [profilePhoto, setProfilePhoto] = useState(null);

  useEffect(() => {
    const loadProfileData = async () => {
      try {
        const savedName = await AsyncStorage.getItem('userName');
        const savedPhoto = await AsyncStorage.getItem('profilePhoto');
        if (savedName) {
          setName(savedName);
          console.log('Loaded name:', savedName);
        }
        if (savedPhoto) {
          setProfilePhoto(savedPhoto);
          console.log('Loaded profile photo:', savedPhoto);
        }
      } catch (error) {
        console.error('Error loading profile data:', error);
      }
    };

    loadProfileData();
  }, []);

  const pickImage = () => {
    const options = {
      mediaType: 'photo',
      maxWidth: 300,
      maxHeight: 300,
      quality: 1,
    };

    launchImageLibrary(options, (response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.errorCode) {
        console.error('ImagePicker Error:', response.errorMessage);
      } else if (response.assets && response.assets.length > 0) {
        const { uri } = response.assets[0];
        setProfilePhoto(uri);
        AsyncStorage.setItem('profilePhoto', uri)
          .then(() => console.log('Profile photo saved:', uri))
          .catch((error) => console.error('Error saving profile photo:', error));
      }
    });
  };

  const handleProfileCreation = async () => {
    try {
      await AsyncStorage.setItem('userName', name);
      console.log('Name saved:', name);
      navigation.navigate('MainMenu', { name, profilePhoto });
    } catch (error) {
      console.error('Error saving name:', error);
    }
  };

  return (
    <ImageBackground source={background} style={styles.background}>
      <SafeAreaView style={styles.safeArea}>
        <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
          {/* Кнопка выбора фото */}
          <Text style={styles.label}>Customize your profile photo:</Text>
          <TouchableOpacity onPress={pickImage} style={styles.photoButton}>
            {profilePhoto ? (
              <Image source={{ uri: profilePhoto }} style={styles.photoImage} />
            ) : (
              <Image source={defaultProfilePhoto} style={styles.photoImage} />
            )}
          </TouchableOpacity>

          {/* Поле ввода имени */}
          <Text style={styles.label}>Name:</Text>
          <TextInput
            value={name}
            onChangeText={setName}
            placeholder="Enter your name"
            style={styles.nameInput}
            placeholderTextColor="#333"
          />{/* Поле выбора уровня знаний */}
          <Text style={styles.label}>How much do you know about Wolves:</Text>
          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={knowledgeLevel}
              onValueChange={(itemValue) => setKnowledgeLevel(itemValue)}
              style={styles.picker}
              dropdownIconColor="#FFFFFF"
              mode="dropdown"
            >
              <Picker.Item label="Select Knowledge Level" value="" />
              <Picker.Item label="Basic knowledge" value="Basic" />
              <Picker.Item label="Average knowledge" value="Average" />
              <Picker.Item label="Advanced knowledge" value="Advanced" />
            </Picker>
          </View>

          {/* Кнопка подтверждения */}
          <TouchableOpacity style={styles.submitButton} onPress={handleProfileCreation}>
            <Text style={styles.submitButtonText}>
              {name ? 'Confirm Profile Creation' : 'Go'}
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </SafeAreaView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  background: {
    flex: 1,
    resizeMode: 'cover',
  },
  container: {
    flex: 1,
  },
  contentContainer: {
    padding: 20,
    alignItems: 'center',
    flexGrow: 1,
    justifyContent: 'space-between',
  },
  label: {
    fontSize: width * 0.05,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#FFFFFF',
    textAlign: 'center',
  },
  nameInput: {
    borderWidth: 1,
    padding: 16,
    borderRadius: 25,
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    textAlign: 'center',
    width: '80%',
    fontSize: 20,
    marginBottom: 20,
    color: '#333',
    borderColor: '#6c757d',
  },
  pickerContainer: {
    height: 180,
    overflow: 'hidden',
    width: '80%',
    marginBottom: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    borderRadius: 25,
    borderColor: '#6c757d',
    borderWidth: 1,
    justifyContent: 'center',
  },
  picker: {
    color: '#FFFFFF',
    fontSize: 18,
    height: '100%',
    width: '100%',
  },
  photoButton: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    borderRadius: width * 0.5,
    width: width * 0.45,
    height: width * 0.45,
    marginBottom: height * 0.03,
    borderWidth: 1,
    borderColor: '#6c757d',
  },
  photoImage: {
    width: '90%',
    height: '90%',
    borderRadius: width * 0.5,
  },
  submitButton: {
    backgroundColor: '#6C81A8',
    padding: 20,
    borderRadius: 30,
    alignItems: 'center',
    width: '85%',
    marginBottom: 30,
  },
  submitButtonText: {
    fontSize: 20,
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
});

export default Profile;