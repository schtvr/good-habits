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
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {
  achievementSelector,
  getAllAchievements,
} from '../redux/achievementSlice';
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
  console.log('-------------------inside achievements', userAchievements);

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
    const questImage = '../assets/quests.png';
    const taskImage = '../assets/task.png';
    const socialImage = '../assets/social.png';
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
              <Text>{obj.description}</Text>
            </View>
          </View>
        </TouchableOpacity>
      </>
    );
  };

  const Modals = (): JSX.Element => {
    if (selectedItem !== null) {
      const item = achievements[selectedItem];
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
              <Text style={styles.modalText}>{item.name}</Text>
              <Text>{item.description}</Text>
              <Text>{item.category}</Text>
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
    fontSize: 20,
    paddingRight: 20,
  },
  ownedAchievements: {
    alignSelf: 'center',
    borderColor: 'black',
    borderWidth: 1,
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
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 40,
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
    marginBottom: 15,
    textAlign: 'center',
  },
  achievementIcon: {
    tintColor: 'gray',
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
