import React, {useState, useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import type {Node} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {useNavigation} from '@react-navigation/native';
import {StyleSheet, View, Text, TouchableOpacity, Settings} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {Badge, Overlay, Button} from 'react-native-elements';
import HomeScreen from './screens/HomeScreen';
import ProfileScreen from './screens/ProfileScreen';
import QuestsScreen from './screens/QuestsScreen';
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

import {
  friendSelector,
  acceptFriendRequest,
  rejectFriendRequest,
} from './redux/friendSlice';

import OtherProfileScreen from './screens/OtherProfilesScreen';
import {getMyFriendRequests} from './funcs/dispatch/dispatchFuncs';
import UploadPfp from './screens/UploadPfp';
import CreateAQuestScreen from './screens/CreateAQuestScreen';

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
  const [visible, setVisible] = useState(false);
  const toggleOverlay = () => {
    if (friendRequests.length === 0) return;
    setVisible(!visible);
  };
  const {friendRequests} = useSelector(friendSelector);

  let id;
  if (friendRequests[0]) {
    id = friendRequests[0].id;
  }
  const dispatch = useDispatch();
  const getToken = async () => {
    return await AsyncStorage.getItem('token');
  };
  const acceptMyFriendRequest = async () => {
    await getMyFriendRequests(dispatch);
    dispatch(
      acceptFriendRequest({
        api: {
          method: 'PUT',
          url: `user/acceptFriendRequest/${id}`,
          headers: {
            Authorization: `Bearer ${await getToken()}`,
          },
        },
      }),
    );
    setVisible(false);
  };

  const rejectMyFriendRequest = async () => {
    await getMyFriendRequests(dispatch);
    dispatch(
      rejectFriendRequest({
        api: {
          method: 'PUT',
          url: `user/${id}/cancelFriendRequest`,
          headers: {
            Authorization: `Bearer ${await getToken()}`,
          },
        },
      }),
    );
  };

  return (
    <View style={styles.header}>
      {!(friendRequests.length === 0) && (
        <Badge
          badgeStyle={{position: 'absolute', right: -50}}
          value={friendRequests.length}
          status="error"
        />
      )}
      <TouchableOpacity onPress={toggleOverlay}>
        <MaterialCommunityIcons
          style={styles.icons}
          name="notifications-none"
          size={26}
        />
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('Search')}>
        <MaterialCommunityIcons style={styles.icons} name="search" size={26} />
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('Settings')}>
        <MaterialCommunityIcons
          style={styles.icons}
          name="more-horiz"
          size={26}
        />
      </TouchableOpacity>
      <Overlay
        isVisible={visible}
        onBackdropPress={toggleOverlay}
        overlayStyle={{height: 175, width: 260, backgroundColor: '#8898f2'}}>
        <Text style={styles.content}>Friend Request!</Text>
        <View
          style={{
            alignItems: 'center',
            borderColor: 'black',
            borderWidth: 1,
            flex: 1,
            justifyContent: 'flex-end',
          }}>
          <Text style={styles.userName}>{friendRequests[0]?.userName}</Text>
          <View style={{flexDirection: 'row'}}>
            <Button
              title="Accept"
              onPress={acceptMyFriendRequest}
              buttonStyle={{
                width: 100,
                borderRadius: 10,
                backgroundColor: '#3d4eb3',
              }}
            />
            <Text>{'    '}</Text>
            <Button
              title="Reject"
              onPress={rejectMyFriendRequest}
              buttonStyle={{
                width: 100,
                borderRadius: 10,
                backgroundColor: '#3d4eb3',
              }}
            />
          </View>
          <Button
            title="cancel"
            type="clear"
            buttonStyle={{width: 100, borderRadius: 10}}
            titleStyle={{color: '#fff'}}
            onPress={() => setVisible(false)}
          />
        </View>
      </Overlay>
    </View>
  );
};

const TabStack = () => {
  return (
    <Tab.Navigator initialRouteName="Home">
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          title: 'Concentrated Jort Juice',
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
        name="Quests"
        component={QuestsScreen}
        options={{
          headerRight,
          tabBarIcon: () => {
            return <MaterialCommunityIcons name="explore" size={26} />;
          },
        }}
      />
    </Tab.Navigator>
  );
};

const App: () => Node = () => {
  const {isAuthenticated} = useSelector(stateSelector);

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
              <Stack.Screen name="OtherUser" component={OtherProfileScreen} />
              <Stack.Screen
                name="QuestDetailsScreen"
                component={QuestDetailsScreen}
              />
              <Stack.Screen
                name="ProfileSettings"
                component={ProfileSettings}
              />
              <Stack.Screen
                name="Upload Profile Picture"
                component={UploadPfp}
              />
              <Stack.Screen name="Search" component={SearchDetailsScreen} />
              <Stack.Screen
                name="Create Quest"
                component={CreateAQuestScreen}
              />
              <Stack.Screen name="Settings" component={SettingsScreen} />
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
    paddingRight: 5,
  },
  icons: {
    margin: 10,
  },
  content: {
    fontSize: 18,
    alignSelf: 'center',
    fontWeight: 'bold',
    color: 'black',
  },
  userName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
    color: 'black',
  },
});

export default () => {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
};
