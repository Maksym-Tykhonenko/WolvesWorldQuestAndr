import React, { useState, useEffect, useCallback , useRef} from 'react';
import { View, Text, StyleSheet, Modal, TouchableOpacity, Image, SafeAreaView ,ImageBackground } from 'react-native';
import Draggable from 'react-native-draggable';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ReactNativeHapticFeedback from 'react-native-haptic-feedback';
import { useVibration } from './VibrationContext';
import { ScrollView } from 'react-native-gesture-handler';
const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
};


const quizzes = {
    1: [
      {
        type: 'multipleChoice',
        text: 'What is the largest recorded wolf species in history?',
        options: [
          { text: 'Gray Wolf', isCorrect: false },
          { text: 'Dire Wolf', isCorrect: true },
          { text: 'Arctic Wolf', isCorrect: false }
        ],
        fact: 'The Dire Wolf, now extinct, was one of the largest wolf species ever, weighing up to 150 pounds.',
      },
      {
        type: 'multipleChoice',
        text: 'Where is the Gray Wolf most commonly found?',
        options: [
          { text: 'South America', isCorrect: false },
          { text: 'Europe and Asia', isCorrect: true },
          { text: 'Australia', isCorrect: false }
        ],
        fact: 'The Gray Wolf is one of the most widespread wolf subspecies, found across Europe and Asia, from Spain to Russia.',
      },
      {
        type: 'multipleChoice',
        text: 'Which wolf subspecies is known for its white fur and smaller size?',
        options: [
          { text: 'Arctic Wolf', isCorrect: true },
          { text: 'Indian Wolf', isCorrect: false },
          { text: 'Red Wolf', isCorrect: false }
        ],
        fact: 'The Arctic Wolf\'s white fur provides excellent camouflage in snowy environments, helping it survive in extreme Arctic conditions.',
      },
      {
        type: 'multipleChoice',
        text: 'Which wolf subspecies is known to live in small family units or pairs rather than large packs?',
        options: [
          { text: 'Mexican Wolf', isCorrect: false },
          { text: 'Indian Wolf', isCorrect: true },
          { text: 'Eurasian Wolf', isCorrect: false }
        ],
        fact: 'Indian Wolves often hunt in pairs or small family groups, an adaptation to the less abundant prey in their environment.',
      },
      {
        type: 'multipleChoice',
        text: 'Which subspecies is the smallest and most genetically distinct wolf in North America?',
        options: [
          { text: 'Eastern Wolf', isCorrect: false },
          { text: 'Alaskan Interior Wolf', isCorrect: false },
          { text: 'Mexican Wolf', isCorrect: true }
        ],
        fact: 'The Mexican Wolf, also known as "El Lobo," is critically endangered and the smallest of the North American wolves.',
      },
      {
        type: 'multipleChoice',
        text: 'What is the primary prey of the Arctic Wolf?',
        options: [
          { text: 'Caribou', isCorrect: false },
          { text: 'Muskoxen', isCorrect: true },
          { text: 'Wild Boar', isCorrect: false }
        ],
        fact: 'Arctic Wolves are adapted to hunt large, cold-resistant prey like muskoxen, crucial for their survival in the harsh Arctic tundra.',
      },
      {
        type: 'multipleChoice',
        text: 'Which wolf is native to the southeastern United States and is critically endangered?',
        options: [
          { text: 'Red Wolf', isCorrect: true },
          { text: 'Gray Wolf', isCorrect: false },
          { text: 'Iberian Wolf', isCorrect: false }
        ],
        fact: 'The Red Wolf was once declared extinct in the wild but has since been reintroduced through conservation efforts.',
      },
      {
        type: 'multipleChoice',
        text: 'Which wolf subspecies is known for its reddish-brown fur and lives in the Iberian Peninsula?',
        options: [
          { text: 'Arabian Wolf', isCorrect: false },
          { text: 'Ethiopian Wolf', isCorrect: false },
          { text: 'Iberian Wolf', isCorrect: true }
        ],
        fact: 'The Iberian Wolf is known for its distinct black markings on its legs and tail, making it easily recognizable.',
      },
      {
        type: 'multipleChoice',
        text: 'What is the main diet of the Ethiopian Wolf?',
        options: [
          { text: 'Rodents', isCorrect: true },
          { text: 'Deer', isCorrect: false },
          { text: 'Fish', isCorrect: false }
        ],
        fact: 'Ethiopian Wolves specialize in hunting rodents, with up to 96% of their diet consisting of these small mammals.',
      },
      {
        type: 'multipleChoice',
        text: 'Which wolf subspecies can be found in the Arabian Peninsula and is well adapted to desert life?',
        options: [
          { text: 'Arabian Wolf', isCorrect: true },
          { text: 'Tundra Wolf', isCorrect: false },
          { text: 'Eastern Wolf', isCorrect: false }
        ],
        fact: 'Arabian Wolves have evolved to survive extreme heat and can endure long periods without water by obtaining moisture from their prey.',
      },
      {
        type: 'multipleChoice',
        text: 'Which wolf subspecies is found in the high-altitude regions of the Himalayas?',
        options: [
          { text: 'Iberian Wolf', isCorrect: false },
          { text: 'Himalayan Wolf', isCorrect: true },
          { text: 'Eurasian Wolf', isCorrect: false }
        ],
        fact: 'The Himalayan Wolf is adapted to high-altitude environments, with longer legs and larger lungs to cope with the lower oxygen levels.',
      },
      {
        type: 'multipleChoice',
        text: 'Which wolf subspecies is considered the largest canid in South America?',
        options: [
          { text: 'Arctic Wolf', isCorrect: false },
          { text: 'Mexican Wolf', isCorrect: false },
          { text: 'Maned Wolf', isCorrect: true }
        ],
        fact: 'The Maned Wolf is actually not a true wolf but is the largest canid in South America, known for its long legs and reddish-brown fur.',
      },
      {
        type: 'multipleChoice',
        text: 'Which wolf subspecies is primarily found in the tundra regions of Russia and Scandinavia?',
        options: [
          { text: 'Tundra Wolf', isCorrect: true },
          { text: 'Eastern Wolf', isCorrect: false },
          { text: 'Gray Wolf', isCorrect: false }
        ],
        fact: 'Tundra Wolves are well adapted to the extreme cold of the northern tundra, with thick fur and a stocky build to conserve heat.',
      },
      {
        type: 'multipleChoice',
        text: 'Which wolf is often referred to as the "skunk wolf" due to the smell of its urine?',
        options: [
          { text: 'Indian Wolf', isCorrect: false },
          { text: 'Maned Wolf', isCorrect: true },
          { text: 'Red Wolf', isCorrect: false }
        ],
        fact: 'The Maned Wolf’s urine has a strong odor similar to cannabis, which is why it is sometimes called the "skunk wolf."',
      },
      {
        type: 'multipleChoice',
        text: 'Which wolf subspecies has a significant history of hybridization with coyotes?',
        options: [
          { text: 'Eurasian Wolf', isCorrect: false },
          { text: 'Eastern Wolf', isCorrect: true },
          { text: 'Iberian Wolf', isCorrect: false }
        ],
        fact: 'The Eastern Wolf has hybridized with coyotes, especially in areas where their ranges overlap, leading to the creation of the so-called "coywolf."',
      },{
        type: 'multipleChoice',
        text: 'Which subspecies of wolf is often referred to as "Canis lupus lupus"?',
        options: [
          { text: 'Eurasian Wolf', isCorrect: true },
          { text: 'Red Wolf', isCorrect: false },
          { text: 'Mexican Wolf', isCorrect: false }
        ],
        fact: 'The Eurasian Wolf, also known as "Canis lupus lupus," is the most widespread wolf subspecies in Europe and Asia.',
      },
      {
        type: 'multipleChoice',
        text: 'Which wolf subspecies has the largest population in North America?',
        options: [
          { text: 'Gray Wolf', isCorrect: true },
          { text: 'Mexican Wolf', isCorrect: false },
          { text: 'Red Wolf', isCorrect: false }
        ],
        fact: 'The Gray Wolf has the largest population in North America and plays a key role in maintaining healthy ecosystems.',
      },
      {
        type: 'multipleChoice',
        text: 'Which wolf subspecies is known for its golden-brown coat and is found in Africa?',
        options: [
          { text: 'Golden Wolf', isCorrect: true },
          { text: 'Himalayan Wolf', isCorrect: false },
          { text: 'Eurasian Wolf', isCorrect: false }
        ],
        fact: 'The African Golden Wolf is a distinct species with a golden-brown coat, adapted to savanna and desert habitats.',
      },
      {
        type: 'multipleChoice',
        text: 'Which wolf is known to inhabit the forests of Central and Eastern Europe?',
        options: [
          { text: 'Carpathian Wolf', isCorrect: true },
          { text: 'Tundra Wolf', isCorrect: false },
          { text: 'Eastern Wolf', isCorrect: false }
        ],
        fact: 'The Carpathian Wolf is a subspecies of the Gray Wolf, thriving in the dense forests and mountains of Central Europe.',
      },
      {
        type: 'multipleChoice',
        text: 'What is the primary diet of the Red Wolf in the wild?',
        options: [
          { text: 'Rabbits and rodents', isCorrect: true },
          { text: 'Fish', isCorrect: false },
          { text: 'Caribou', isCorrect: false }
        ],
        fact: 'The Red Wolf primarily hunts small prey like rabbits and rodents, but it will also scavenge when food is scarce.',
      },
      {
        type: 'multipleChoice',
        text: 'Which wolf is the largest wolf subspecies found in Canada?',
        options: [
          { text: 'Mackenzie Valley Wolf', isCorrect: true },
          { text: 'Mexican Wolf', isCorrect: false },
          { text: 'Eurasian Wolf', isCorrect: false }
        ],
        fact: 'The Mackenzie Valley Wolf is one of the largest subspecies of wolves, known for its robust build and adaptability to northern climates.',
      },
      {
        type: 'multipleChoice',
        text: 'Which subspecies of wolf is known for its ability to run at high speeds to chase prey?',
        options: [
          { text: 'Tundra Wolf', isCorrect: false },
          { text: 'Arabian Wolf', isCorrect: false },
          { text: 'Indian Wolf', isCorrect: true }
        ],
        fact: 'Indian Wolves are well-adapted for running long distances at high speeds to pursue prey in open grasslands.',
      },
      {
        type: 'multipleChoice',
        text: 'Which wolf subspecies is often associated with legends and folklore in Japan?',
        options: [
          { text: 'Japanese Wolf', isCorrect: true },
          { text: 'Eurasian Wolf', isCorrect: false },
          { text: 'Red Wolf', isCorrect: false }
        ],
        fact: 'The Japanese Wolf, now extinct, played a prominent role in Japanese folklore and was often considered a sacred animal.',
      },
      {
        type: 'multipleChoice',
        text: 'Which wolf subspecies primarily inhabits mountainous regions of Turkey?',
        options: [
          { text: 'Anatolian Wolf', isCorrect: true },
          { text: 'Carpathian Wolf', isCorrect: false },
          { text: 'Golden Wolf', isCorrect: false }
        ],
        fact: 'The Anatolian Wolf is a lesser-known subspecies adapted to the rugged, mountainous terrain of Turkey.',
      },
      {
        type: 'multipleChoice',
        text: 'Which wolf subspecies is known for its smaller size and nocturnal hunting habits in desert regions?',
        options: [
          { text: 'Arabian Wolf', isCorrect: true },
          { text: 'Golden Wolf', isCorrect: false },
          { text: 'Indian Wolf', isCorrect: false }
        ],
        fact: 'Arabian Wolves are smaller in size and hunt primarily at night to avoid the extreme heat of their desert habitats.',
      },
      {
        type: 'multipleChoice',
        text: 'Which wolf subspecies is the main predator of reindeer in the tundra regions?',
        options: [
          { text: 'Tundra Wolf', isCorrect: true },
          { text: 'Eurasian Wolf', isCorrect: false },
          { text: 'Arctic Wolf', isCorrect: false }
        ],
        fact: 'The Tundra Wolf preys heavily on reindeer, playing a crucial role in maintaining the balance of tundra ecosystems.',
      },
      {
        type: 'multipleChoice',
        text: 'Which wolf species has the smallest population globally?',
        options: [
          { text: 'Ethiopian Wolf', isCorrect: true },
          { text: 'Mexican Wolf', isCorrect: false },
          { text: 'Red Wolf', isCorrect: false }
        ],
        fact: 'The Ethiopian Wolf has fewer than 500 individuals in the wild, making it the most endangered wolf species globally.',
      },
      {
        type: 'multipleChoice',
        text: 'Which wolf subspecies is adapted to the extreme cold of Alaska and northern Canada?',
        options: [
          { text: 'Alaskan Interior Wolf', isCorrect: true },
          { text: 'Mexican Wolf', isCorrect: false },
          { text: 'Eastern Wolf', isCorrect: false }
        ],
        fact: 'The Alaskan Interior Wolf has a thick coat and large body to withstand the freezing temperatures of its habitat.',
      },
      {
        type: 'multipleChoice',
        text: 'Which wolf subspecies is known to inhabit the mountainous regions of Spain and Portugal?',
        options: [
          { text: 'Iberian Wolf', isCorrect: true },
          { text: 'Eurasian Wolf', isCorrect: false },
          { text: 'Tundra Wolf', isCorrect: false }
        ],
        fact: 'The Iberian Wolf thrives in the rugged, forested mountains of Spain and Portugal and is known for its elusive nature.',
      },
      {
        type: 'multipleChoice',
        text: 'Which wolf subspecies primarily preys on large mammals like deer and moose?',
        options: [
          { text: 'Gray Wolf', isCorrect: true },
          { text: 'Indian Wolf', isCorrect: false },
          { text: 'Golden Wolf', isCorrect: false }
        ],
        fact: 'Gray Wolves often hunt in packs, allowing them to take down large prey such as deer, elk, and moose.',
      }
      ],
    2: [
      {
        text: 'Match the wolf names with their pictures:',
        items: [
            { text: 'Arctic Wolf', image: require('./assets/arctic_wolf.jpg') }, 
            { text: 'Gray Wolf', image: require('./assets/gray_wolf.jpg') }, 
            { text: 'Mexican Wolf', image: require('./assets/mexican_wolf.jpg') }, 
            { text: 'Red Wolf', image: require('./assets/red_wolf.jpg') }, 
            { text: 'Eurasian Wolf', image: require('./assets/eurasian_wolf.jpg') }, 
            { text: 'Ethiopian Wolf', image: require('./assets/ethiopian_wolf.jpg') }, 
            { text: 'Arabian Wolf', image: require('./assets/arabian_wolf.jpg') }, 
            { text: 'Maned Wolf', image: require('./assets/maned_wolf.jpg') }, 
            { text: 'Tundra Wolf', image: require('./assets/tundra_wolf.jpg') }, 
            { text: 'Himalayan Wolf', image: require('./assets/himalayan_wolf.jpg') }, 
            { text: 'Iberian Wolf', image: require('./assets/iberian_wolf.jpg') }, 
            { text: 'Alaskan Interior Wolf', image: require('./assets/alaskan_wolf.jpg') }, 
            { text: 'Indian Wolf', image: require('./assets/indian_wolf.jpg') }, 
            { text: 'Eastern Wolf', image: require('./assets/eastern_wolf.jpg') }, 
            { text: 'Colombian Wolf', image: require('./assets/colombian_wolf.jpg') } 
        ],
    },
    ],
    
};
const Timer = ({ initialTime, isPaused, onTimeUp, quizFinished }) => {
  const timerRef = useRef(initialTime);
  const [displayTime, setDisplayTime] = useState(initialTime);

  useEffect(() => {
      const interval = setInterval(() => {
          if (isPaused || quizFinished || timerRef.current <= 0) return;

          timerRef.current -= 1;
          setDisplayTime(timerRef.current);

          if (timerRef.current <= 0) {
              clearInterval(interval);
              onTimeUp(); 
          }
      }, 1000);

      return () => clearInterval(interval);
  }, [isPaused, onTimeUp, quizFinished]);

  return <Text style={styles.timer}>Time Left: {displayTime}s</Text>;
};
const itemsPerBatch = 5;
const QuizScreen = ({ navigation }) => {
  const [quizId, setQuizId] = useState(null);
  const [mode, setMode] = useState(null);
  const [score, setScore] = useState(0);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [quizFinished, setQuizFinished] = useState(false);
  const [matchedItems, setMatchedItems] = useState([]);
  const [currentFact, setCurrentFact] = useState('');
  const [isFactModalVisible, setIsFactModalVisible] = useState(false);
  const [isTimerActive, setIsTimerActive] = useState(false);
  const [isTimerPaused, setIsTimerPaused] = useState(false);
  const [remainingTime, setRemainingTime] = useState(40);
  const [currentItems, setCurrentItems] = useState([]);
  const [currentBatchIndex, setCurrentBatchIndex] = useState(0);
  const { vibrationOn } = useVibration();


    
    const saveEarnedCoins = async () => {
        try {
            const existingCoins = await AsyncStorage.getItem('coins');
            
            
            const adjustedScore = Math.floor(score / 5);
    
           
            const totalCoins = (existingCoins ? parseInt(existingCoins, 10) : 0) + adjustedScore;
            await AsyncStorage.setItem('coins', totalCoins.toString());
        } catch (error) {
            console.error('Error saving earned coins:', error);
        }
    };
      useEffect(() => {
        if (quizFinished) {
          saveEarnedCoins();
        }
      }, [quizFinished]);
      const saveScore = async (finalScore) => {
        try {
          const storedProgress = await AsyncStorage.getItem('quizProgress');
          const progressData = storedProgress
            ? JSON.parse(storedProgress)
            : [
                { quizType: "Multiple Choice", score: 0, progressPercentage: 0, maxScore: 300 },
                { quizType: "Matching", score: 0, progressPercentage: 0, maxScore: 150 },
              ];
      
          const quizIndex = quizId === 1 ? 0 : 1;
      
          if (finalScore > progressData[quizIndex].score) {
            progressData[quizIndex] = {
              ...progressData[quizIndex],
              score: finalScore,
              progressPercentage: Math.min((finalScore / progressData[quizIndex].maxScore) * 100, 100),
            };
      
            console.log('Updated Progress:', progressData); // Лог для проверки обновлений
            await AsyncStorage.setItem('quizProgress', JSON.stringify(progressData));
          }
        } catch (error) {
          console.error('Error saving score:', error);
        }
      };
    useEffect(() => {
      if (quizId) {
          loadQuestion();
      }
  }, [quizId]);
  const startQuiz = (selectedMode) => {
    setMode(selectedMode);
    setIsTimerActive(selectedMode === 'timed');
    setQuestionIndex(0);
    setQuizFinished(false);
    loadQuestion();
};

const handleTimeUp = async () => {
  const finalScore = quizId === 2 ? calculateMatchingScore() : score;
  setScore(finalScore);
  await saveScore(finalScore); // Сохраняем прогресс
  setQuizFinished(true);
};

const calculateMatchingScore = () => {
  let newScore = score;

  matchedItems.forEach((item, index) => {
      if (item && item.text === currentQuestion.items[index].text) {
          newScore += 10; 
      }
  });

  return newScore;
};
    useEffect(() => {
        loadQuestion();
    }, [questionIndex]);

    const loadQuestion = () => {
      const currentQuiz = quizzes[quizId];
    
      // Завершаем квиз, если вопросы закончились
      if (!currentQuiz || questionIndex >= currentQuiz.length) {
        const finalScore = quizId === 2 ? calculateMatchingScore() : score;
        saveScore(finalScore); // Сохраняем финальный прогресс
        setQuizFinished(true); // Завершаем квиз
        return;
      }
    
      if (quizId === 2) {
        const shuffledItems = shuffleArray([...currentQuiz[0].items]);
        setMatchedItems(Array(shuffledItems.length).fill(null)); 
        setCurrentItems(shuffledItems.slice(0, itemsPerBatch)); 
        setCurrentBatchIndex(0);
        setCurrentQuestion({ ...currentQuiz[0], items: shuffledItems });
      } else {
        setCurrentQuestion(currentQuiz[questionIndex]);
      }
    };
    
  const handleAnswer = (isCorrect, fact) => {
        if (vibrationOn) {
            ReactNativeHapticFeedback.trigger(isCorrect ? 'notificationSuccess' : 'notificationError');
        }

        if (isCorrect) {
            setScore((prev) => prev + 10);
            setCurrentFact(fact);
            setIsFactModalVisible(true);
            setIsTimerPaused(true);
        } else if (mode === 'suddenDeath') {
            setQuizFinished(true);
        }
        setQuestionIndex((prev) => prev + 1);
    };
    const handleDrop = (dropIndex, item) => {
      const newMatchedItems = [...matchedItems];
      newMatchedItems[dropIndex + currentBatchIndex * itemsPerBatch] = item;
      setMatchedItems(newMatchedItems);

      setCurrentItems((prev) => prev.filter((i) => i.text !== item.text));

      const isBatchComplete = newMatchedItems
          .slice(currentBatchIndex * itemsPerBatch, (currentBatchIndex + 1) * itemsPerBatch)
          .every((matchedItem) => matchedItem !== null);

      if (isBatchComplete && (currentBatchIndex + 1) * itemsPerBatch < currentQuestion.items.length) {
          setTimeout(() => {
              setCurrentBatchIndex((prev) => prev + 1);
              const nextBatch = currentQuestion.items.slice(
                  (currentBatchIndex + 1) * itemsPerBatch,
                  (currentBatchIndex + 2) * itemsPerBatch
              );
              setCurrentItems(nextBatch);
          }, 500);
      }
  };
  const submitAnswer = async () => {
    let finalScore = score;
  
    // Рассчитываем финальный результат для Matching
    matchedItems.forEach((item, index) => {
      if (item && item.text === currentQuestion.items[index].text) {
        finalScore += 10; // Добавляем очки за правильный ответ
      }
    });
  
    // Устанавливаем финальный счет и сохраняем его
    setScore(finalScore);
    await saveScore(finalScore);
    setQuizFinished(true);
  };
  

    const handleModalClose = () => {
      setIsFactModalVisible(false);
      if (mode === 'timed') setIsTimerPaused(false); 
  };
  useEffect(() => {
    if (quizId) {
        setQuestionIndex(0); 
        setQuizFinished(false); 
        loadQuestion(); 
    }
}, [quizId]);

    const MultipleChoiceQuestion = ({ question, onAnswer }) => (
        
        <SafeAreaView style={styles.questionContainer}>
            
            <Text style={styles.questionText}>{question.text}</Text>
            {question.options.map((option, index) => (
                <TouchableOpacity
                    key={index}
                    style={styles.answerButton}
                    onPress={() => onAnswer(option.isCorrect, question.fact)}
                >
                    <Text style={styles.answerButtonText}>{option.text}</Text>
                </TouchableOpacity>
            ))}
        </SafeAreaView >
    );
    
    const MatchingQuestion = () => {
      const currentDropZones = currentQuestion.items.slice(
          currentBatchIndex * itemsPerBatch,
          (currentBatchIndex + 1) * itemsPerBatch
      );
  
      return (
          <SafeAreaView style={styles.questionContainer}>
              <ScrollView
                  contentContainerStyle={{
                      flexGrow: 1,
                      justifyContent: 'space-between',
                      paddingBottom: 100,
                  }}
              >
                  <Text style={styles.questionText}>{currentQuestion.text}</Text>
  
                  <View style={styles.matchingRowContainer}>
                      <View style={styles.itemsContainer}>
                          {currentItems.map((item, index) => (
                              <View key={index} style={styles.matchingContainer}>
                                  <Draggable
                                      key={`draggable-${index}-${item.text}`}
                                      renderSize={120}
                                      x={0}
                                      y={0}
                                      onDragRelease={() => {
                                          const dropIndex = currentDropZones.findIndex(
                                              (_, i) =>
                                                  !matchedItems[i + currentBatchIndex * itemsPerBatch]
                                          );
                                          if (dropIndex !== -1) handleDrop(dropIndex, item);
                                      }}
                                  >
                                      <View style={styles.draggableTextContainer}>
                                          <Text style={styles.draggableText}>{item.text}</Text>
                                      </View>
                                  </Draggable>
                              </View>
                          ))}
                      </View>
                      <View style={styles.dropZonesContainer}>
                          {currentDropZones.map((item, index) => (
                              <View key={index} style={styles.dropZone}>
                                  {matchedItems[index + currentBatchIndex * itemsPerBatch] ? (
                                      <Text style={styles.dropZoneText}>
                                          {matchedItems[index + currentBatchIndex * itemsPerBatch].text}
                                      </Text>
                                  ) : (
                                      <Image source={item.image} style={styles.image} />
                                  )}
                              </View>
                          ))}
                      </View>
                  </View>
                  <TouchableOpacity style={styles.submitButton} onPress={() => {
    calculateMatchingScore();
    setQuizFinished(true); 
    saveScore(); 
    submitAnswer();
}}>
    <Text style={styles.submitButtonText}>End Quiz</Text>
</TouchableOpacity>
              </ScrollView>
          </SafeAreaView>
      );
  };
    
    return (
      <ImageBackground source={require('./back.jpg')} style={styles.backgroundImage}>
          <SafeAreaView  style={styles.container}>
              <TouchableOpacity style={styles.exitButton} onPress={navigation.goBack}>
                  <Text style={styles.exitButtonText}>✖️</Text>
              </TouchableOpacity>
  
              {isTimerActive && (
    <Timer
        initialTime={remainingTime}
        isPaused={isTimerPaused}
        onTimeUp={handleTimeUp} 
        quizFinished={quizFinished}
    />
)}
  
              {!mode && !quizId ? (
                  <View style={styles.modeSelectionContainer}>
                      <Text style={styles.modeSelectionText}>Select Quiz</Text>
                      <TouchableOpacity style={styles.modeButton} onPress={() => setQuizId(1)}>
                       
                          <Text style={styles.modeButtonText}>Multiple Choice</Text>
                      </TouchableOpacity>
                      <TouchableOpacity style={styles.modeButton} onPress={() => setQuizId(2)}>
                      
                          <Text style={styles.modeButtonText}>Matching</Text>
                      </TouchableOpacity>
                  </View>
              ) : !mode ? (
                  <View style={styles.modeSelectionContainer}>
                      <Text style={styles.modeSelectionText}>Select Mode</Text>
                      <TouchableOpacity style={styles.modeButton} onPress={() => startQuiz('timed')}>
                      <Image source={require('./stopwatch.png')} style={styles.modeImage}></Image>
                          <Text style={styles.modeButtonText}>Timed Mode (40s)</Text>
                      </TouchableOpacity>
                      <TouchableOpacity style={styles.modeButton} onPress={() => startQuiz('suddenDeath')}>
                      <Image source={require('./sick.png')} style={styles.modeImage}></Image>
                          <Text style={styles.modeButtonText}>Sudden Death Mode</Text>
                      </TouchableOpacity>
                  </View>
              ) : (
                  <>
                      {quizFinished ? (
                          <Text style={styles.finishedText}>Quiz Finished! Final Score: {score}</Text>
                      ) : (
                          currentQuestion && (
                              quizId === 2 ? (
                                  <MatchingQuestion
                                      currentQuestion={currentQuestion}
                                      currentItems={currentItems}
                                      handleDrop={handleDrop}
                                  />
                              ) : (
                                  <MultipleChoiceQuestion
                                      question={currentQuestion}
                                      onAnswer={handleAnswer}
                                  />
                              )
                          )
                      )}
                      <FactModal visible={isFactModalVisible} fact={currentFact} onClose={handleModalClose} />
                  </>
              )}
          </SafeAreaView >
      </ImageBackground>
  );
}; const FactModal = ({ visible, fact, onClose }) => (
    <Modal visible={visible} animationType="slide" transparent>
        <View style={styles.modalContent}>
            <Text style={styles.factText}>{fact}</Text>
            <TouchableOpacity style={styles.okButton} onPress={onClose}>
                <Text style={styles.okButtonText}>OK</Text>
            </TouchableOpacity>
        </View>
    </Modal>
);
const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
  },
  okButton: {
    backgroundColor: '#6C81A8',
    paddingVertical: 14,
    paddingHorizontal: 30,
    borderRadius: 12,
    alignItems: 'center',
    borderColor: '#FFF',
    borderWidth: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 6,
    elevation: 6,
  },
  okButtonText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    letterSpacing: 1,
  },
  modeImage: {
    width: 50,
    height: 50,
    alignSelf: 'center',
    resizeMode: 'contain',
  },
  submitButton: {
    backgroundColor: '#6C81A8',
    paddingVertical: 18,
    paddingHorizontal: 40,
    borderRadius: 12,
    marginVertical: 20,
    alignSelf: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 6,
    elevation: 6,
    borderColor: '#FFF',
    borderWidth: 2,
   
    
  },
  submitButtonText: {
    fontSize: 20,
    color: '#FFF',
    fontWeight: '700',
    textAlign: 'center',
    letterSpacing: 1,
  },
  modeSelectionContainer: {
    flex: 1,
    justifyContent: 'center',
    alignContent: 'center',
    padding: 20,
    
  },
  modeSelectionText: {
    alignSelf: 'center',
    fontSize: 24,
    fontWeight: 'bold',
    color: '#E8F0FF',
    marginBottom: 20,
  },
  modeButton: {
    backgroundColor: '#6C81A8',
    paddingVertical: 18,
    paddingHorizontal: 40,
    borderRadius: 12,
    marginVertical: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 6,
    elevation: 6,
    borderColor: '#FFF',
    borderWidth: 2,
  },
  modeButtonText: {
    fontSize: 20,
    color: '#FFF',
    fontWeight: '700',
    textAlign: 'center',
    letterSpacing: 1,
  },
  container: {
    marginBottom:-50,
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    paddingHorizontal: 30,
    
  },
  exitButton: {
    marginTop:30,
    position: 'absolute', 
    top: 20, 
    left: 20, 
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
    zIndex: 100,
},

  exitButtonQuizMode: {
    alignSelf: 'center',
    marginTop: -20,
  },
  exitButtonSelectionMode: {
    alignSelf: 'center',
    marginTop: 40,
  },
  exitButtonText: {
    
    fontSize: 18,
    fontWeight: '700',
    color: '#FFF',
    textAlign: 'center',
  },
  title: {
    fontSize: 30,
    fontWeight: '700',
    color: '#FFF',
    marginVertical: 20,
    textAlign: 'center',
  },
  score: {
    fontWeight: 'bold',
    fontSize: 22,
    color: '#FFF',
    marginBottom: 15,
  },
  finishedText: {
    fontSize: 23,
    fontWeight: 'bold',
    color: '#E8F0FF',
    marginTop: 120,
  },
  timer: {
    fontWeight: 'bold',
    fontSize: 20,
    color: '#E8F0FF',
    marginTop: 100,
  },
  questionContainer: {
    backgroundColor: '#6C81A8', 
    paddingVertical: 25, 
    paddingHorizontal: 50, 
    borderRadius: 15, 
    marginVertical: 90, 
    alignSelf: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 }, 
    shadowOpacity: 0.5, 
    shadowRadius: 8, 
    elevation: 8, 
    borderColor: '#FFF',
    borderWidth: 2, 
    width: '95%',
    minHeight: 220, 
    
  },

  questionText: {
    fontSize: 24, 
    color: '#FFF', 
    marginBottom: 20, 
    textAlign: 'center', 
    fontWeight: '700', 
  },

  answerButton: {
    
    backgroundColor: '#384155',
    padding: 10,
    borderRadius: 30,
    marginBottom: 10,
  },
  answerButtonText: {
    fontWeight:'bold',
    fontSize: 20,
    color: '#FFF',
    textAlign: 'center',
  },
  matchingRowContainer: {
    
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  itemsContainer: {
    flex: 1,
    alignItems: 'center',
    marginRight: 10,
  },
  matchingContainer: {
    marginLeft: 15,
    alignSelf: 'baseline',
    marginBottom: 85,
  },
  dropZonesContainer: {
    flex: 1,justifyContent: 'space-between',
  },
  dropZone: {
    width: '75%',
    height: 105,
    borderWidth: 1.5,
    borderColor: '#E8F0FF',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 5,
    
  },
  dropZoneText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFF',
    textAlign: 'center',
  },
  image: {
    borderRadius: 8,
    width: 100,
    height: 100,
    resizeMode: 'cover',
  },
  modalContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(25, 25, 25, 1)',
    padding: 30,
  },
  factText: {
    fontWeight: 'bold',
    color: '#FFF',
    fontSize: 22,
    textAlign: 'center',
    marginBottom: 20,
  },
  draggableTextContainer: {
    borderRadius: 8,
    backgroundColor: '#384155',
    width: 120,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 5,
  },
  draggableText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#FFF',
    textAlign: 'center',
    flexWrap: 'wrap',
  },
});
export default QuizScreen;