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
// import SettingsScreen from './screens/SettingsScreen';
import AchievementsPage from './screens/AchievementsPage';

import { store } from './redux/store';
import { Provider } from "react-redux";

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialIcons';
import QuestDetailsScreen from './screens/QuestDetailsScreen'
import LoginScreen from './screens/LoginScreen';


const Auth = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

//AuthStack
const AuthStack = () => (
  <Auth.Navigator>
    <Auth.Screen
      name="signUp"
      component={LoginScreen}
      options={{headerShown: false}}
    />
  </Auth.Navigator>
);

//Tabstack
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
    <Tab.Screen
      name="Home"
      component={HomeScreen}
      options={{
        headerRight,
        tabBarIcon: () => {
          return <MaterialCommunityIcons name="home" size={26} />;
        },
      }}
    />
    <Tab.Screen
      name="Profile"
      component={ProfileScreen}
      options={{
        headerRight,
        tabBarIcon: () => {
          return <MaterialCommunityIcons name="account-circle" size={26} />;
        },
      }}
    />
    <Tab.Screen
      name="Social"
      component={SocialScreen}
      options={{
        headerRight,
        tabBarIcon: () => {
          return <MaterialCommunityIcons name="groups" size={26} />;
        },
      }}
    />
    <Tab.Screen
      name="Leaderboards"
      component={LeaderBoardScreen}
      options={{
        headerRight,
        tabBarIcon: () => {
          return <MaterialCommunityIcons name="emoji-events" size={26} />;
        },
      }}
    />
    {/* <Tab.Screen name="Settings" component={SettingsScreen} /> options={{headerRight}} */}
  </Tab.Navigator>
);

//Remove the ! or change isAuthenticated to true to see other screens!

const App: () => Node = () => {
  const isAuthenticated = true;
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator>       
          {!isAuthenticated ? (
            <Stack.Screen
              name="Auth"
              component={AuthStack}
              options={{headerShown: false}}
            />
          ) : (
            <>
              <Stack.Screen
                options={{headerShown: false}}
                name="Main"
                component={TabStack}
              />
              <Stack.Screen name="Achievements" component={AchievementsPage} />
              <Stack.Screen name="QuestDetailsScreen" component={QuestDetailsScreen} />
            </>
          )}
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
    fontSize: 20,
  },
});

export default () => {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
};
