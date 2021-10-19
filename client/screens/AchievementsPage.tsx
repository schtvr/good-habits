import React, {useState, useEffect} from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  Image,
  ListRenderItem,
  ImageSourcePropType,
  TouchableOpacity,
  Modal,
  Pressable,
  Text,
  ActivityIndicator,
  ImageBackground,
} from 'react-native';
import {ThemeProvider} from 'react-native-elements';
import {useDispatch, useSelector} from 'react-redux';
import {
  achievementSelector,
  getAllAchievements,
} from '../redux/achievementSlice';
import {elementsTheme} from '../styles/react-native-elements-theme-provider';

import {
  getTemplateAchievements,
  getUserAchievements,
} from '../funcs/dispatch/dispatchFuncs';
import {stateSelector} from '../redux/userSlice';

interface IAchievement {
  id: number;
  name: string;
  description: string;
  url: ImageSourcePropType;
}

const AchievementsPage = (): JSX.Element => {
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [selectedItem, setSelectedItem] = useState<null | number>(null);
  const [myAchievements, setMyAchievements] = useState<IAchievement[]>([]);
  const dispatch = useDispatch();
  const {achievements, userAchievements} = useSelector(achievementSelector);
  const {loading} = useSelector(stateSelector);
  const questImage = '../assets/quests.png';
  const taskImage = '../assets/task.png';
  const socialImage = '../assets/social.png';
  useEffect(() => {
    getTemplateAchievements(dispatch);
    getUserAchievements(dispatch);
  }, []);

  const onOpenModal = (index: number) => {
    setSelectedItem(index);
    setModalVisible(!modalVisible);
  };

  const checkOwned = obj => {
    for (let ele of userAchievements) {
      if (ele.templateId === obj.id) obj.owned = true;
    }
  };

  const renderItem = ({item, index}) => {
    let obj = {...item};
    checkOwned(obj);
    const selectImage = () => {
      if (obj.category === 'Quests')
        return (
          <Image
            style={
              obj.owned ? styles.achievementIconOwned : styles.achievementIcon
            }
            source={require(questImage)}
          />
        );
      if (obj.category === 'Tasks')
        return (
          <Image
            style={
              obj.owned ? styles.achievementIconOwned : styles.achievementIcon
            }
            source={require(taskImage)}
          />
        );
      if (obj.category === 'Social')
        return (
          <Image
            style={
              obj.owned ? styles.achievementIconOwned : styles.achievementIcon
            }
            source={require(socialImage)}
          />
        );
    };
    return (
      <>
        <TouchableOpacity onPress={() => onOpenModal(index)}>
          <View style={styles.row}>
            {selectImage()}
            <View style={styles.content}>
              <Text
                style={
                  obj.owned
                    ? styles.achievementTitleOwned
                    : styles.achievementTitle
                }>
                {obj.name}
              </Text>
              <Text
                style={
                  obj.owned ? styles.ownedDescription : styles.description
                }>
                {obj.description}
              </Text>
            </View>
          </View>
        </TouchableOpacity>
      </>
    );
  };

  const Modals = (): JSX.Element => {
    if (selectedItem !== null) {
      const item = achievements[selectedItem];
      const selectImage = () => {
        if (item.category === 'Quests')
          return <Image source={require(questImage)} />;
        if (item.category === 'Tasks')
          return <Image source={require(taskImage)} />;
        if (item.category === 'Social')
          return <Image source={require(socialImage)} />;
      };
      return (
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(!modalVisible);
          }}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={styles.modalTitle}>{item.name}</Text>
              {selectImage()}
              <Text style={styles.modalTitle}>{item.description}</Text>
              <Text style={styles.modalTitle}>Category</Text>
              <Text style={styles.modalText}>{item.category}</Text>
              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={() => setModalVisible(!modalVisible)}>
                <Text style={styles.textStyle}>Close</Text>
              </Pressable>
            </View>
          </View>
        </Modal>
      );
    }
  };
  const keyExtractor = item => {
    return item.id.toString();
  };

  return (
    <>
      <ImageBackground
        style={{flex: 1}}
        source={require('../assets/mauve-stacked-waves-haikei.png')}>
        <ThemeProvider theme={elementsTheme}>
          {loading ? (
            <View style={styles.loaderContainer}>
              <Text style={styles.loader}>Loading...</Text>
              <ActivityIndicator size="large" color="#0000ff" />
            </View>
          ) : (
            <>
              <View style={styles.header}>
                <Text style={styles.achievements}>All Achievements!</Text>
                <Text style={styles.ownedAchievements}>
                  Owned {userAchievements.length}/{achievements.length}
                </Text>
              </View>
              <FlatList
                data={achievements}
                keyExtractor={keyExtractor}
                renderItem={renderItem}
              />
            </>
          )}
          {modalVisible ? <Modals /> : null}
        </ThemeProvider>
      </ImageBackground>
    </>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignSelf: 'center',
  },
  row: {
    flexDirection: 'row',
    paddingTop: 20,
  },
  content: {
    paddingLeft: 20,
    alignSelf: 'center',
  },

  achievements: {
    fontSize: 24,
    paddingRight: 20,
    fontWeight: 'bold',
  },
  ownedAchievements: {
    alignSelf: 'center',
    fontSize: 16,
    fontWeight: 'bold',
  },
  achievementTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  achievementTitleOwned: {
    fontSize: 18,
    fontWeight: '800',
    color: 'black',
  },
  description: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  ownedDescription: {
    fontWeight: 'bold',
    fontSize: 16,
    color: 'black',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  modalView: {
    margin: 20,
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
    borderRadius: 20,
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
  achievementIcon: {
    tintColor: '#8e8f94',
  },
  achievementIconOwned: {},
  loaderContainer: {
    marginTop: 100,
  },
  loader: {
    alignSelf: 'center',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
  },
});

export default AchievementsPage;
