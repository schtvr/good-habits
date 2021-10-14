import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import type {Node} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {useNavigation} from '@react-navigation/native';
import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';
import {SafeAreaProvider} from 'react-native-safe-area-context';

import HomeScreen from './screens/HomeScreen';
import ProfileScreen from './screens/ProfileScreen';
import SocialScreen from './screens/SocialScreen';
import LeaderBoardScreen from './screens/LeaderBoardScreen';
import SettingsScreen from './screens/SettingsScreen';
import AchievementsPage from './screens/AchievementsPage';
import ProfileSettings from './components/ProfileSettings';
import {store} from './redux/store';
import {Provider} from 'react-redux';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialIcons';
import QuestDetailsScreen from './screens/QuestDetailsScreen';
import LoginScreen from './screens/LoginScreen';
import RegisterPage from './screens/RegisterPage';

import {stateSelector} from './redux/userSlice';
import {useDispatch, useSelector} from 'react-redux';
import SearchDetailsScreen from './screens/SearchDetailsScreen';

const Auth = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

//AuthStack
const AuthStack = () => (
  <Auth.Navigator initialRouteName="signIn">
    <Auth.Screen
      name="signIn"
      component={LoginScreen}
      options={{headerShown: false}}
    />
    <Auth.Screen
      name="Register"
      component={RegisterPage}
      options={{headerShown: false}}
    />
  </Auth.Navigator>
);

//Tabstack
const headerRight = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.header}>
      <TouchableOpacity onPress={() => alert('Notifications!')}>
        <MaterialCommunityIcons
          style={styles.icons}
          name="notifications-none"
          size={30}
        />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('Search')}>
        <MaterialCommunityIcons style={styles.icons} name="search" size={30} />
      </TouchableOpacity>
    </View>
  );
};

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
    <Tab.Screen
      name="Settings"
      component={SettingsScreen}
      options={{
        headerRight,
        tabBarIcon: () => {
          return <MaterialCommunityIcons name="settings" size={26} />;
        },
      }}
    />
  </Tab.Navigator>
);

//Remove the ! or change isAuthenticated to true to see other screens!

const App: () => Node = () => {
  const {isAuthenticated} = useSelector(stateSelector);
  console.log(isAuthenticated);
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
              <Stack.Screen
                name="QuestDetailsScreen"
                component={QuestDetailsScreen}
              />
              <Stack.Screen
                name="ProfileSettings"
                component={ProfileSettings}
              />
              <Stack.Screen name="Search" component={SearchDetailsScreen} />
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
  },
});

export default () => {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
};
