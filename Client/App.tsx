import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import type {Node} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';
import {SafeAreaProvider} from 'react-native-safe-area-context';

import HomeScreen from './screens/HomeScreen';
import ProfileScreen from './screens/ProfileScreen';
import SocialScreen from './screens/SocialScreen';
import LeaderBoardScreen from './screens/LeaderBoardScreen';
// import SettingsScreen from './Screens/SettingsScreen';
import AchievementsPage from './screens/AchievementsPage';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const headerRight = () => (
  <View style={styles.header}>
    <TouchableOpacity onPress={() => alert('Notifications!')}>
      <Text style={styles.icons}>🔔</Text>
    </TouchableOpacity>
    <TouchableOpacity onPress={() => alert('Search!')}>
      <Text style={styles.icons}>🔍</Text>
    </TouchableOpacity>
  </View>
);

const TabStack = () => (
  <Tab.Navigator initialRouteName="Home">
    <Tab.Screen name="Home" component={HomeScreen} options={{headerRight}}/>
    <Tab.Screen name="Profile" component={ProfileScreen} options={{headerRight}}/>
    <Tab.Screen name="Social" component={SocialScreen} options={{headerRight}}/>
    <Tab.Screen name="Leaderboards" component={LeaderBoardScreen} options={{headerRight}}/>
    {/* <Tab.Screen name="Settings" component={SettingsScreen} /> options={{headerRight}} */}
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
        <Stack.Screen name="Achievements" component={AchievementsPage} options={{headerRight}}/>
        </Stack.Navigator>
        </NavigationContainer>
      </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    paddingRight: 30,
  },
  icons: {
    margin: 10,
    fontSize: 20
  }
});

export default App;
