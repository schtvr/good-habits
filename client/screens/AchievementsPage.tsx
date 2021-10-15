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
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {
  achievementSelector,
  getAllAchievements,
} from '../redux/achievementSlice';

interface IAchievement {
  id: number;
  name: string;
  description: string;
  url: ImageSourcePropType;
}
// interface Props {
//   achievements: IAchievement;
// }

const AchievementsPage = (): JSX.Element => {
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [selectedItem, setSelectedItem] = useState<null | number>(null);
  const [myAchievements, setMyAchievements] = useState<IAchievement[]>([]);
  const dispatch = useDispatch();
  const {achievements} = useSelector(achievementSelector);

  useEffect(() => {
    const start = async () => {
      await getAchievements();
    };
    start();
  }, []);

  const onOpenModal = (index: number) => {
    setSelectedItem(index);
    setModalVisible(!modalVisible);
  };

  const getAchievements = async () => {
    dispatch(
      getAllAchievements({
        api: {
          url: 'achievement/templates',
        },
      }),
    );
  };

  const renderItem = ({item, index}) => {
    const questImage = '../assets/quests.png';
    const taskImage = '../assets/task.png';
    const socialImage = '../assets/social.png';
    const selectImage = () => {
      if (item.category === 'Quests')
        return <Image source={require(questImage)} />;
      if (item.category === 'Tasks')
        return <Image source={require(taskImage)} />;
      if (item.category === 'Social')
        return <Image source={require(socialImage)} />;
    };
    return (
      <>
        <TouchableOpacity onPress={() => onOpenModal(index)}>
          <View style={styles.row}>
            {selectImage()}
            <View style={styles.content}>
              <Text style={styles.achievementTitle}>{item.name}</Text>
              <Text>{item.description}</Text>
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
      <View style={styles.header}>
        <Text style={styles.achievements}>All Achievements!</Text>
        <Text style={styles.ownedAchievements}>
          Owned 0/{achievements.length}
        </Text>
      </View>
      <FlatList
        data={achievements}
        keyExtractor={keyExtractor}
        renderItem={renderItem}
      />
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
});

export default AchievementsPage;
