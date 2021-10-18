import React, {useEffect, useState} from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  ImageBackground,
  ActivityIndicator,
} from 'react-native';
import {
  LinearProgress,
  Card,
  ThemeProvider,
  Button,
} from 'react-native-elements';
import CarouselComponent from '../components/CarouselComponent';
import Accordian from '../components/Accordian';
import {IQuest, IUser} from '../interfaces/interfaces';
import {useSelector, useDispatch} from 'react-redux';
import {stateSelector} from '../redux/userSlice';
import {questSelector} from '../redux/questSlice';
import {friendSelector} from '../redux/friendSlice';
import {
  getUserById,
  getUsersActiveQuests,
  getUsersFriends,
  getDailyTasks,
  getMyFriendRequests,
  getUserTaskHistory,
} from '../funcs/dispatch/dispatchFuncs';
import {elementsTheme} from '../styles/react-native-elements-theme-provider';

interface Props {
  userFriends: [];
  userQuests: IQuest[];
  user: IUser;
  navigation: any;
}

const HomeScreen = ({navigation}: Props): JSX.Element => {
  const dispatch = useDispatch();
  const {user, loading} = useSelector(stateSelector);
  const {myFriends, allFriends} = useSelector(friendSelector);
  const {activeQuests, myQuests} = useSelector(questSelector);
  useEffect(() => {
    const start = async () => {
      await getUserById(dispatch);
      await getUsersActiveQuests(dispatch);
      await getUsersFriends(dispatch);
      await getMyFriendRequests(dispatch);
      await getUserTaskHistory(dispatch);
    };
    start();
  }, [allFriends]);

  useEffect(() => {
    const helper = async () => {
      await getUsersActiveQuests(dispatch);
      await getDailyTasks(dispatch);
    };
    helper();
  }, [myQuests]);

  const renderAccordians = () => {
    const items = [];
    for (let item of activeQuests) {
      items.push(<Accordian key={item.id} title={item.name} id={item.id} />);
    }
    return items;
  };
  return (
    <View style={styles.body}>
      {loading ? (
        <View style={styles.loaderContainer}>
          <Text style={styles.loader}>Loading...</Text>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      ) : (
        <ImageBackground
          style={{flex: 1}}
          source={require('../assets/mauve-stacked-waves-haikei.png')}>
          <ThemeProvider theme={elementsTheme}>
            <ScrollView style={{flex: 1}}>
              <Button
                title="Achievements"
                onPress={() => navigation.navigate('Achievements')}
              />
              <Card>
                <View style={styles.header}>
                  <View>
                    <Image source={require('../assets/avatar.png')} />
                    <Text style={styles.userName}>{user.userName}</Text>
                  </View>
                  <Text style={styles.level}>
                    Lvl {Math.floor(user.exp / 100)}
                  </Text>
                  <LinearProgress
                    style={styles.progressBar}
                    color="yellow"
                    value={(user.exp % 100) / 100}
                    variant={'determinate'}
                  />
                  <Text style={styles.EXP}>{user.exp % 100}/100 EXP</Text>
                </View>
              </Card>
              {activeQuests.length ? (
                <Card>
                  <View style={styles.container}>
                    <Text style={styles.activeQuests}>Active Quests</Text>
                    {renderAccordians()}
                  </View>
                </Card>
              ) : (
                <Card>
                  <View style={styles.container}>
                    <Text style={styles.activeQuests}>No Active Quests</Text>
                    <TouchableOpacity
                      onPress={() => navigation.navigate('Search')}>
                      <Text style={styles.noQuests}>Go to all quests</Text>
                    </TouchableOpacity>
                  </View>
                </Card>
              )}
              <Card>
                <Text style={styles.activeFriends}>Active Friends</Text>
                <CarouselComponent data={myFriends} />
              </Card>
            </ScrollView>
          </ThemeProvider>
        </ImageBackground>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 50,
    paddingHorizontal: 10,
    paddingBottom: 20,
  },
  body: {
    flex: 1,
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
    left: 90,
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
  loaderContainer: {
    marginTop: 100,
  },
  loader: {
    alignSelf: 'center',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  userName: {
    alignSelf: 'center',
    fontSize: 16,
  },
});

export default HomeScreen;
