import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import type {Node} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import {StyleSheet} from 'react-native';
import {SafeAreaProvider} from 'react-native-safe-area-context';



import HomeScreen from './screens/HomeScreen';
import ProfileScreen from './screens/ProfileScreen';
import SocialScreen from './screens/SocialScreen';
import LeaderBoardScreen from './screens/LeaderBoardScreen';
// import SettingsScreen from './Screens/SettingsScreen';
import AchievementsPage from './screens/AchievementsPage';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const TabStack = () => (
  <Tab.Navigator initialRouteName="Home">
    <Tab.Screen name="Home" component={HomeScreen} />
    <Tab.Screen name="Profile" component={ProfileScreen} />
    <Tab.Screen name="Social" component={SocialScreen} />
    <Tab.Screen name="Leaderboards" component={LeaderBoardScreen} />
    {/* <Tab.Screen name="Settings" component={SettingsScreen} /> */}
  </Tab.Navigator>
);

const App: () => Node = () => {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            options={{headerShown: false}}
            name="Main"
            component={TabStack}
          />
          <Stack.Screen name="Achievements" component={AchievementsPage} />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({});

export default App;
