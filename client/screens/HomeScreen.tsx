import React, {useEffect, useState} from 'react';
import {
  Text,
  View,
  Button,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  ImageBackground,
  ActivityIndicator,
  Modal,
  Pressable,
} from 'react-native';
import ConfettiCannon from 'react-native-confetti-cannon';
import {LinearProgress, Card, ThemeProvider} from 'react-native-elements';
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
  getQuests,
} from '../funcs/dispatch/dispatchFuncs';
import {elementsTheme} from '../styles/react-native-elements-theme-provider';
import {
  achievementSelector,
  clearNewAchievements,
} from '../redux/achievementSlice';
import HomeHeader from '../components/HomeHeader';

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
  const {newAchievements} = useSelector(achievementSelector);
  const [confetti, setConfetti] = useState(false);
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [name, setName] = useState<string>('');
  const [category, setCategory] = useState<string>('');
  const [description, setDescription] = useState<string>('');
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
  useEffect(() => {
    getQuests(dispatch);
  }, []);
  const renderConfetti = () => {
    setModalVisible(true);
    setConfetti(true);
    setTimeout(() => {
      setConfetti(false);
    }, 5000);
  };

  const closeModal = () => {
    setModalVisible(!modalVisible);
    dispatch(clearNewAchievements());
  };

  const selecImage = () => {
    const questImage = '../assets/quests.png';
    const taskImage = '../assets/task.png';
    const socialImage = '../assets/social.png';
    if (newAchievements[0].category === 'Quests')
      return <Image source={require(questImage)} />;
    if (newAchievements[0].category === 'Tasks')
      return <Image source={require(taskImage)} />;
    if (newAchievements[0].category === 'Social')
      return <Image source={require(socialImage)} />;
  };
  useEffect(() => {
    if (newAchievements.length === 0) return;
    setName(newAchievements[0].name);
    setCategory(newAchievements[0].category);
    setDescription(newAchievements[0].description);
    renderConfetti();
  }, [newAchievements]);

  const Modals = (): JSX.Element => {
    if (newAchievements.length === 0) return;
    return (
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          closeModal();
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalTitle}>{name}</Text>
            {selecImage()}
            <Text style={styles.modalTitle}>{description}</Text>
            <Text style={styles.modalTitle}>Category</Text>
            <Text style={styles.modalText}>{category}</Text>
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => closeModal()}>
              <Text style={styles.textStyle}>Close</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    );
  };

  const renderAccordians = () => {
    const items = [];

    for (let i = 0; i < activeQuests.length; i++) {
      items.push(
        <Accordian
          key={i}
          index={i}
          title={activeQuests[i].name}
          id={activeQuests[i].id}
          length={activeQuests.length}
        />,
      );
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

              <Card>
                <HomeHeader user={user}/>
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
                      <Text>Active quests will appear here. Head to the Quests page to get started!</Text>
                    </TouchableOpacity>
                  </View>
                </Card>
              )}
              <Card>
                {myFriends.length < 1 ? (
                  <Text style={{padding: 12}}>Friends will appear here. Head to the Social page to make some connections!</Text>
                ) : (
                  <View>
                    <Text style={styles.activeFriends}> Active Friends</Text>
                    <CarouselComponent data={myFriends} />
                  </View>
                )}
              </Card>
            </ScrollView>
          </ThemeProvider>
        </ImageBackground>
      )}
      {confetti && (
        <ConfettiCannon
          fadeOut={true}
          count={200}
          fallSpeed={1500}
          origin={{x: -10, y: 0}}
        />
      )}
      {modalVisible ? <Modals /> : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
    paddingBottom: 20,
  },
  body: {
    flex: 1,
  },
  activeQuests: {
    alignSelf: 'center',
    paddingBottom: 12,
    fontSize: 22,
    color: '#222222',
  },
  noQuests: {
    alignSelf: 'center',
    paddingBottom: 12,
    fontSize: 22,
    color: '#2d3c8f',
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
    color: '#222222',
  },
  level: {
    position: 'absolute',
    bottom: 0,
    color: '#222222',
    left: 100,
  },
  carousel: {
    borderWidth: 1,
    borderColor: '#222222',
  },
  activeFriends: {
    color: '#222222',
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
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  modalView: {
    backgroundColor: '#8898f2',
    borderRadius: 20,
    paddingHorizontal: 20,
    paddingVertical: 10,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 10,
    padding: 10,
    elevation: 2,
    marginTop: 5,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    fontWeight: 'bold',
    marginHorizontal: 5,
  },
  modalTitle: {
    fontWeight: 'bold',
    fontSize: 18,
  },
  image: {
    height: 50,
    width: 50,
  },
});

export default HomeScreen;
