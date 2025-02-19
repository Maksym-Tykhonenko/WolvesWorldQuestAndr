import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, Dimensions, TouchableOpacity, ImageBackground, SafeAreaView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Svg, { Circle } from 'react-native-svg';
import { useFocusEffect } from '@react-navigation/native';
const { width, height } = Dimensions.get('window');

const ProgressBar = ({ route, navigation }) => {
  const { quizId, score } = route.params || {};
  const [quizProgress, setQuizProgress] = useState(Array(10).fill({ score: 0, progressPercentage: 0 }));

  useFocusEffect(
    React.useCallback(() => {
      const loadProgress = async () => {
        try {
          const storedProgress = await AsyncStorage.getItem('quizProgress');
          const defaultProgress = [
            { quizType: "Multiple Choice", score: 0, progressPercentage: 0, maxScore: 300 },
            { quizType: "Matching", score: 0, progressPercentage: 0, maxScore: 150 },
          ];
          setQuizProgress(storedProgress ? JSON.parse(storedProgress) : defaultProgress);
        } catch (error) {
          console.error('Error loading progress:', error);
        }
      };
  
      loadProgress();
    }, [])
  );
  useEffect(() => {
    if (quizId !== undefined && score !== undefined) {
      setQuizProgress((prevProgress) => {
        const updatedProgress = [...prevProgress];
  
        if (quizId > 0 && quizId <= updatedProgress.length && score > updatedProgress[quizId - 1].score) {
          updatedProgress[quizId - 1] = {
            ...updatedProgress[quizId - 1],
            score,
            progressPercentage: calculateProgressPercentage(quizId, score),
          };
  
          AsyncStorage.setItem('quizProgress', JSON.stringify(updatedProgress))
            .catch((error) => console.error('Error saving progress:', error));
        }
  
        return updatedProgress;
      });
    }
  }, [quizId, score]);

  const calculateProgressPercentage = (quizId, score) => {
    let maxScore = 0;
  
    if (quizId === 1) maxScore = 300;
    else if (quizId === 2) maxScore = 150;
  
    const progress = Math.min((score / maxScore) * 100, 100);
    return Math.round(progress);
    
  };

  const radius = 50;
  const strokeWidth = 10;
  const circumference = 2 * Math.PI * radius;

  return (
    <ImageBackground source={require('./back.jpg')} style={styles.backgroundImage}>
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.container}>
          <TouchableOpacity style={styles.exitButton} onPress={() => navigation.navigate('MainMenu')}>
            <Text style={styles.exitButtonText}>✖️</Text>
          </TouchableOpacity>
          <Text style={styles.header}>Quiz Progress</Text>
          <ScrollView style={styles.contentContainer}>
  {quizProgress.map((quiz, index) => (
    <View key={index} style={styles.progressContainer}>
      <Text style={styles.text}>
        {index === 0 ? "Multiple Choice" : "Matching"}: {Math.round(quiz.progressPercentage)}% | Score: {quiz.score} / {index === 0 ? 300 : 150}
      </Text>
      <Svg width={120} height={120} viewBox="0 0 120 120">
        <Circle
          cx="60"
          cy="60"
          r={radius}
          stroke="#384155"
          strokeWidth={strokeWidth}
          fill="none"
        />
        <Circle
          cx="60"
          cy="60"
          r={radius}
          stroke="#E8F0FF"
          strokeWidth={strokeWidth}
          fill="none"
          strokeDasharray={circumference}
          strokeDashoffset={circumference * (1 - quiz.progressPercentage / 100)}
          strokeLinecap="round"
        />
      </Svg>
    </View>
  ))}
</ScrollView>
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
  },
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  contentContainer: {
    paddingBottom: 20,
  },
  header: {
    fontSize: 30,
    fontWeight: '700',
    color: '#E8F0FF',
    textAlign: 'center',
    marginBottom: 20,
    textShadowColor: 'rgba(0, 0, 0, 0.8)',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 4,
  },
  progressContainer: {
    backgroundColor: '#6C81A8',
    borderRadius: 15,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.5,
    shadowRadius: 8,
    elevation: 8,
    borderColor: '#FFF',
    borderWidth: 2,
    alignItems: 'center',
  },
  text: {
    fontSize: 20,
    color: '#E8F0FF',
    marginBottom: 10,
    fontWeight: '600',
    textAlign: 'center',
  },
  exitButton: {
    alignSelf: 'flex-start',
    backgroundColor: '#6C81A8',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 20,
    elevation: 5,
    shadowColor: 'rgba(0, 0, 0, 0.7)',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 5,
    borderColor: '#FFF',
    borderWidth: 2,
  },
  exitButtonText: {
    fontSize: 18,
    fontWeight: '700',
    color: '#FFF',
    textAlign: 'center',
  },
});

export default ProgressBar;