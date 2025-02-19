import React, { useState, useRef, useContext, useEffect } from 'react';
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
import AsyncStorage from '@react-native-async-storage/async-storage';
import { WolfDataContext } from './WolfDataContext';

const { width, height } = Dimensions.get('window');
const defaultProfilePhoto = require('./user_17740838.png'); 
const background = require('./back.jpg'); 

const MainMenu = ({ navigation }) => {
  const [profilePhoto, setProfilePhoto] = useState(null); 
  const [searchText, setSearchText] = useState('');
  const [filteredData, setFilteredData] = useState([]);
  const scrollViewRef = useRef(null);
  const { wolfData } = useContext(WolfDataContext);


  useEffect(() => {
    const loadProfilePhoto = async () => {
      try {
        const storedPhoto = await AsyncStorage.getItem('profilePhoto');
        if (storedPhoto) {
          console.log('Loaded profile photo URI:', storedPhoto); // Лог URI
          setProfilePhoto(storedPhoto);
        } else {
          console.log('No profile photo found in AsyncStorage.');
        }
      } catch (error) {
        console.error('Error loading profile photo:', error);
      }
    };
  
    loadProfilePhoto();
  }, []);

 
  useEffect(() => {
    setFilteredData(wolfData);
  }, [wolfData]);

  const handleSearch = (text) => {
    setSearchText(text);
    if (!text) {
      setFilteredData(wolfData);  
    } else {
      const matchedWolf = wolfData.find((wolf) =>
        wolf.name.toLowerCase().includes(text.toLowerCase())
      );
      setFilteredData(matchedWolf ? [matchedWolf] : []);
    }
  };

  return (
    <ImageBackground source={background} style={styles.background}>
      <SafeAreaView style={styles.safeArea}>
        <ScrollView ref={scrollViewRef} style={styles.feed}>
          {/* Header */}
          <View style={styles.header}>
            <TouchableOpacity
              style={styles.wolfButton}
              onPress={() => navigation.navigate('Profile')}
            >
              <Image
                source={profilePhoto ? { uri: profilePhoto } : defaultProfilePhoto}
                style={styles.wolfImage}
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.settingsButton}
              onPress={() => navigation.navigate('Settings')}
            >
              <Text style={styles.buttonText}>Settings</Text>
            </TouchableOpacity>
          </View>

          {/* Main wolf image */}
          <Image source={require('./wolfface.png')} style={styles.mainWolfImage} />

          {/* Quiz button */}
          <TouchableOpacity
            style={styles.quizButton}
            onPress={() => navigation.navigate('QuizScreen')}
          >
            <Text style={styles.quizButtonText}>Test your knowledge</Text>
          </TouchableOpacity>

          {/* Search bar */}
          <TextInput
            placeholder="Search for breeds..."
            style={styles.searchBar}
            placeholderTextColor="#6C81A8"
            value={searchText}
            onChangeText={handleSearch}
          />

          {/* Feed with wolf breeds */}
          {filteredData.map((item, index) => (
            <View key={index} style={styles.feedItem}>
              <Image
                source={typeof item.image === 'string' ? { uri: item.image } : item.image}
                style={styles.feedImage}
              />
              <View style={styles.feedText}>
                <Text style={styles.feedTitle}>{item.name}</Text>
                <TouchableOpacity
                  style={styles.learnMoreButton}
                  onPress={() =>
                    navigation.navigate('LearnMoreScreen', {
                      breed: item.name,
                    })
                  }
                >
                  <Text style={styles.learnMoreText}>Learn More</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))}
          <TouchableOpacity
            style={styles.actionButton}
            onPress={() => navigation.navigate('AddArticle')}
          >
            <Text style={styles.actionButtonText}>Add New Article</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.actionButton}
            onPress={() => navigation.navigate('Progress')}
          >
            <Text style={styles.actionButtonText}>ScoreBoard</Text>
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
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: 20,
  },
  wolfButton: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#6C81A8',
    borderRadius: width * 0.1,
    width: width * 0.2,
    height: width * 0.2,
  },
  wolfImage: {
    width: '100%',
    height: '100%',
    borderRadius: width * 0.1,
  },
  settingsButton: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#6C81A8',
    borderRadius: width * 0.1,
    width: width * 0.2,
    height: width * 0.2,
    borderColor: 'white',
    borderWidth: 2,
  },
  buttonText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  mainWolfImage: {
    zIndex: -1,
    width: width * 1,
    height: width * 1,
    alignSelf: 'center',
    marginBottom: -60,
    marginTop: -40,
    borderRadius: 100,
  },
  quizButton: {
    backgroundColor: '#6C81A8',
    padding: 15,
    borderRadius: 30,
    alignItems: 'center',
    width: '85%',
    marginBottom: 10,
    borderColor: 'white',
    borderWidth: 2,
    alignSelf: 'center',
  },
  quizButtonText: {
    fontSize: 20,
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  searchBar: {
    borderWidth: 1,
    padding: 15,
    borderRadius: 30,
    backgroundColor: 'rgba(240, 248, 255, 0.7)',
    textAlign: 'center',
    width: '85%',
    fontSize: 20,
    marginBottom: 10,
    color: '#333',
    borderColor: '#6C81A8',
    borderWidth: 3,
    alignSelf: 'center',
  },
  feed: {
    flex: 1,
    width: '100%',
    padding: 5,
  },
  feedItem: {
    flexDirection: 'row',
    marginBottom: 20,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'white',
    borderRadius: 10,
    padding: 10,
    backgroundColor: '#6C81A8',
  },
  feedImage: {
    width: 80,
    height: 80,
    borderRadius: 10,
    marginRight: 10,
  },
  feedText: {
    flex: 1,
  },
  feedTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#E8F0FF',
  },
  learnMoreButton: {
    backgroundColor: 'rgba(240, 248, 255, 0.7)',
    marginTop: 5,
    padding: 10,
    borderRadius: 5,
  },
  learnMoreText: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#6C81A8',
  },
  actionButton: {
    padding: 15,
    backgroundColor: '#6C81A8',
    alignItems: 'center',
    borderRadius: 30,
    width: '85%',
    alignSelf: 'center',
    marginVertical: 10,
    borderColor: 'white',
    borderWidth: 2,
  },
  actionButtonText: {fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
});

export default MainMenu;