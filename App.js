import React, { useState } from 'react';
import { Image } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Profile from './Profile';
import SettingsScreen from './SettingsScreen';
import MainMenu from './MainMenu';
import QuizScreen from './QuizScreen';
import ProgressBar from './ProgressBar';
import LearnMoreScreen from './LearnMoreScreen';
import AddArticle from './AddArticle';
import Loader from './Loader';
import { AudioProvider } from './Audio';
import { VibrationProvider } from './VibrationContext';
import { WolfDataProvider } from './WolfDataContext';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();


const tabIcons = {
  Profile: require('./wolfuser.png'),
  MainMenu: require('./animals.png'),
  Settings: require('./settings.png'),
  Progress: require('./bar.png'),
};


const TabScreens = () => {
  return (
    <Tab.Navigator
      initialRouteName="Profile"
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarStyle: { backgroundColor: '#6C81A8' },
        tabBarActiveTintColor: 'white',
        tabBarInactiveTintColor: '#B0C4DE',
        tabBarIcon: ({ focused }) => (
          <Image
            source={tabIcons[route.name]}
            style={{
              width: 24,
              height: 24,
              tintColor: focused ? 'white' : '#B0C4DE',
            }}
          />
        ),
      })}
    >
      <Tab.Screen name="Profile" component={Profile} options={{ title: 'Profile' }} />
      <Tab.Screen name="MainMenu" component={MainMenu} options={{ title: 'Home' }} />
      <Tab.Screen name="Settings" component={SettingsScreen} options={{ title: 'Settings' }} />
      <Tab.Screen name="Progress" component={ProgressBar} options={{ title: 'Progress' }} />
    </Tab.Navigator>
  );
};


const App = () => {
  const [louderIsEnded, setLouderIsEnded] = useState(false);

  return (
    <AudioProvider>
      <VibrationProvider>
        <WolfDataProvider>
          <NavigationContainer>
            {!louderIsEnded ? (
              <Loader onEnd={() => setLouderIsEnded(true)} />
            ) : (
              <Stack.Navigator initialRouteName="Tabs">
                <Stack.Screen name="Tabs" component={TabScreens} options={{ headerShown: false }} />
                <Stack.Screen name="LearnMoreScreen" component={LearnMoreScreen} options={{ headerShown: false }} />
                <Stack.Screen name="AddArticle" component={AddArticle} options={{ headerShown: false }} />
                <Stack.Screen name="QuizScreen" component={QuizScreen} options={{ headerShown: false }} />
              </Stack.Navigator>
            )}
          </NavigationContainer>
        </WolfDataProvider>
      </VibrationProvider>
    </AudioProvider>
  );
};

export default App;