import React, {useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  ActivityIndicator,
  Image,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import {ThemeProvider, Card, Button} from 'react-native-elements';
import QuestDetailCard from '../components/QuestDetailCard';
import QuestListCard from '../components/QuestListCard';
import FriendListRow from '../components/FriendListRow';
import {useDispatch, useSelector} from 'react-redux';
import {getAllTasks, questSelector, addQuest} from '../redux/questSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {elementsTheme} from '../styles/react-native-elements-theme-provider';
import {stateSelector} from '../redux/userSlice';
import OtherQuest from '../components/OtherQuest';

const QuestDetailsScreen = ({route, navigation}) => {
  const dispatch = useDispatch();

  let {tasks} = useSelector(questSelector);
  let {quests, activeQuests} = useSelector(questSelector);

  const {loading} = useSelector(stateSelector);

  const {id, title} = route.params;
  activeQuests.length > 0
    ? (activeQuests = activeQuests.filter(quest => quest.id === id))
    : [];

  useEffect(() => {
    const getTasks = async () => {
      await getTasksByid();
      navigation.setOptions({title});
    };
    getTasks();
  }, []);

  const getToken = async () => {
    return await AsyncStorage.getItem('token');
  };

  const getTasksByid = async () => {
    dispatch(
      getAllTasks({
        api: {
          url: `task/quest/${id}`,
          headers: {
            Authorization: `Bearer ${await getToken()}`,
          },
        },
      }),
    );
  };

  return (
    <View style={{flex: 1}}>
      {loading ? (
        <View style={styles.loaderContainer}>
          <Text style={styles.loader}>Loading...</Text>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      ) : (
        <ThemeProvider theme={elementsTheme}>
          <ImageBackground
            style={{flex: 1}}
            source={require('../assets/mauve-stacked-waves-haikei.png')}>
            <QuestDetailCard id={id} />
            <FriendListRow questId={id} />
            <OtherQuest quests={quests} id={id} title={title} />
          </ImageBackground>
        </ThemeProvider>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  loaderContainer: {
    marginTop: 100,
  },
  loader: {
    alignSelf: 'center',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  container: {
    flexDirection: 'row',
  },
  image: {
    width: 60,
    height: 60,
    alignSelf: 'center',
  },
  textArea: {
    flexDirection: 'column',
    paddingLeft: 15,
    flex: 1,
  },
});

export default QuestDetailsScreen;
