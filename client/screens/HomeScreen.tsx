import React, {useEffect, useState} from 'react';

import {
  Text,
  View,
  Button,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
} from 'react-native';
import {LinearProgress} from 'react-native-elements';
import CarouselComponent from '../components/CarouselComponent';
import Accordian from '../components/Accordian';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {IQuest, IUser} from '../interfaces/interfaces';
import {useDispatch, useSelector} from 'react-redux';
import userSlice, {getUser, stateSelector} from '../redux/userSlice';
import {questSelector, getActiveQuests, getActiveTasks} from '../redux/questSlice';
import {friendSelector, getAllFriends} from '../redux/friendSlice';

const friends = [
  {
    id: 1,
    name: 'Sean',
    activeQuests: ['Improve posture'],
  },
  {
    id: 2,
    name: 'Steve',
    activeQuests: ['Couch to 5k'],
  },
  {
    id: 3,
    name: 'Juan',
    activeQuests: ['Couch to 5k'],
  },
];

interface Props {
  userFriends: [];
  userQuests: IQuest[];
  user: IUser;
  navigation: any;
}

const HomeScreen = ({navigation}: Props): JSX.Element => {
  const dispatch = useDispatch();

  const {user} = useSelector(stateSelector);
  const {myFriends} = useSelector(friendSelector);
  const {activeQuests, myQuests} = useSelector(questSelector);

  const getToken = async () => {
    return await AsyncStorage.getItem('token');
  };
  const getUserById = async () => {
    dispatch(
      getUser({
        api: {
          url: 'user',
          headers: {
            Authorization: `Bearer ${await getToken()}`,
          },
        },
      }),
    );
  };

  const getDailyTasks = async () => {
    console.log('RETREIVING DAILY TASKS');
    dispatch(
      getActiveTasks({
        api: {
          url: 'tasks/daily',
          headers: {
            Authorization: `Bearer ${await getToken()}`,
          }
        }
      })
    )
  }

  const getUsersActiveQuests = async () => {
    dispatch(
      getActiveQuests({
        api: {
          url: 'quest/getActiveQuests',
          headers: {
            Authorization: `Bearer ${await getToken()}`,
          },
        },
      }),
    );
  };

  const getUsersFriends = async () => {
    dispatch(
      getAllFriends({
        api: {
          url: 'user/friends',
          headers: {
            Authorization: `Bearer ${await getToken()}`,
          },
        },
      }),
    );
  };

  useEffect(() => {
    const start = async () => {
      await getUserById();
      await getUsersActiveQuests();
      await getUsersFriends();
      await getDailyTasks();
    };
    start();
  }, [myQuests]);

  const renderAccordians = () => {
    const items = [];
    for (let item of activeQuests) {
      items.push(
        <Accordian
          key={item.id}
          title={item.name}
          id={item.id}
        />,
      );
    }
    return items;
  };

  return (
    <View style={styles.body}>
      <ScrollView style={{flex: 1}}>
        <Button
          title="Achievements"
          onPress={() => navigation.navigate('Achievements')}
        />
        <View style={styles.header}>
          <Image source={require('../assets/avatar.png')} />
          <Text style={styles.level}>Lvl {user.level}</Text>
          <LinearProgress
            style={styles.progressBar}
            color="yellow"
            value={user.exp}
            variant={'determinate'}
          />
          <Text style={styles.EXP}>{user.exp}/100 EXP</Text>
        </View>
        {activeQuests.length ? (
          <View style={styles.container}>
            <Text style={styles.activeQuests}>Active Quests</Text>
            {renderAccordians()}
          </View>
        ) : (
          <View style={styles.container}>
            <Text style={styles.activeQuests}>No Active Quests</Text>
            <TouchableOpacity onPress={() => navigation.navigate('Search')}>
              <Text style={styles.noQuests}>Go to all quests</Text>
            </TouchableOpacity>
          </View>
        )}
        <Text style={styles.activeFriends}>Active Friends</Text>
        <CarouselComponent data={friends} />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 50,
    backgroundColor: '#001845',
    paddingHorizontal: 10,
    paddingBottom: 20,
  },
  body: {
    flex: 1,
    backgroundColor: '#001845',
  },
  activeQuests: {
    alignSelf: 'center',
    paddingBottom: 20,
    fontSize: 22,
    color: '#979dac',
  },
  noQuests: {
    alignSelf: 'center',
    paddingBottom: 20,
    fontSize: 22,
    color: 'blue',
  },
  progressBar: {
    width: '50%',
    alignSelf: 'center',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    borderBottomColor: '#979dac',
    borderWidth: 2,
    paddingTop: 10,
  },
  EXP: {
    position: 'absolute',
    bottom: 0,
    right: 50,
    color: '#979dac',
  },
  level: {
    position: 'absolute',
    bottom: 0,
    color: '#979dac',
    left: 100,
  },
  carousel: {
    borderWidth: 1,
    borderColor: '#979dac',
  },
  activeFriends: {
    color: '#979dac',
    fontSize: 16,
    fontWeight: 'bold',
    paddingLeft: 25,
    paddingBottom: 10,
  },
  friendList: {
    alignContent: 'center',
  },
  friendButtons: {
    alignItems: 'flex-end',
  },
});

export default HomeScreen;
