import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Switch,
  TouchableOpacity,
  Modal,
  Pressable,
  Button,
} from 'react-native';
import {IQuest} from '../interfaces/interfaces';
import {Avatar, Input} from 'react-native-elements';
import {useDispatch, useSelector} from 'react-redux';
import {getAllQuests, questSelector} from '../redux/questSlice';
import {getUsers, stateSelector} from '../redux/userSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {addFriend, friendSelector} from '../redux/friendSlice';

const SearchDetailsScreen = ({navigation}) => {
  const dispatch = useDispatch();
  let {quests} = useSelector(questSelector);
  let {usersList} = useSelector(stateSelector);
  let {myFriends} = useSelector(friendSelector);

  const [questArray, setQuestArray] = useState([...quests]);
  const [usersArray, setUsersArray] = useState([...usersList]);
  const [searchFriends, setSearchFriends] = useState(false);
  const [searchVal, setSearchVal] = useState('');
  const toggleSwitch = () => setSearchFriends(previousState => !previousState);
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [selectedItem, setSelectedItem] = useState<null | number>(null);

  const keyExtractor = (index: number) => index.toString();

  const renderItem = ({item, index}) => {
    return (
      <TouchableOpacity onPress={() => navigation.navigate('OtherUser', {id: item.id})}>
        <View style={styles.listItems}>
          <Avatar size="large" source={require('../assets/avatar.png')} />
          <Text>{item.userName}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  const onOpenModal = (index: number) => {
    setSelectedItem(index);
    setModalVisible(!modalVisible);
  };

  const Modals = (): JSX.Element => {
    if (selectedItem !== null) {
      const item = usersList[selectedItem];
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
              <Text style={styles.modalText}>{item.userName}</Text>
              <Text>{item.id}</Text>
              <Pressable onPress={() => addAFriend(item.id)}>
                <Text>Add Friend</Text>
              </Pressable>
              <Pressable onPress={() => setModalVisible(!modalVisible)}>
                <Text style={styles.closeButton}>Close</Text>
              </Pressable>
            </View>
          </View>
        </Modal>
      );
    }
  };

  const getQuests = async () => {
    dispatch(
      getAllQuests({
        api: {
          url: 'quests',
        },
      }),
    );
  };

  const getToken = async () => {
    return await AsyncStorage.getItem('token');
  };

  const getAllUsers = async () => {
    dispatch(
      getUsers({
        api: {
          url: 'users',
          headers: {
            Authorization: `Bearer ${await getToken()}`,
          },
        },
      }),
    );
  };
  const addAFriend = async id => {
    dispatch(
      addFriend({
        api: {
          method: 'PUT',
          url: `user/${id}/friendRequest`,
          headers: {
            Authorization: `Bearer ${await getToken()}`,
          },
        },
      }),
    );
  };

  useEffect(() => {
    getQuests();
    getAllUsers();
  }, []);

  const handleSearch = text => {
    setSearchVal(text);
    const re = new RegExp(text, 'i');
    if (searchFriends) {
      setUsersArray(usersList.filter(user => re.test(user.userName)));
    } else {
      setQuestArray(quests.filter(quest => re.test(quest.name)));
    }
  };

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () =>
        searchFriends ? (
          <>
            <Text>Friends</Text>
            <Switch
              trackColor={{false: '#767577', true: '#81b0ff'}}
              thumbColor={searchFriends ? '#f5dd4b' : '#f4f3f4'}
              ios_backgroundColor="#3e3e3e"
              onValueChange={toggleSwitch}
              value={searchFriends}
            />
          </>
        ) : (
          <>
            <Text>Quests</Text>
            <Switch
              trackColor={{false: '#767577', true: '#81b0ff'}}
              thumbColor={searchFriends ? '#f5dd4b' : '#f4f3f4'}
              ios_backgroundColor="#3e3e3e"
              onValueChange={toggleSwitch}
              value={searchFriends}
            />
          </>
        ),
    });
  });

  let renderList;
  if (searchFriends) renderList = searchVal ? usersArray : usersList;
  else renderList = searchVal ? questArray : quests;

  return (
    <View style={{marginTop: 20, flex: 1}}>
      <Input
        label="search"
        onChangeText={text => handleSearch(text)}
        value={searchVal}
      />

      {searchFriends ? (
        <>
          <Text style={styles.title}>All Users</Text>
          <FlatList
            data={renderList}
            numColumns={3}
            renderItem={renderItem}
            keyExtractor={keyExtractor}
          />
          {modalVisible ? <Modals /> : null}
        </>
      ) : (
        <>
          <Text style={styles.title}>All Quests</Text>

          <FlatList
            data={renderList}
            numColumns={3}
            keyExtractor={keyExtractor}
            renderItem={({item}) => {
              return (
                <View style={styles.listItems}>
                  <TouchableOpacity
                    onPress={() =>
                      navigation.navigate('QuestDetailsScreen', {id: item.id})
                    }>
                    <Avatar
                      size="large"
                      source={require('../assets/avatar.png')}
                    />
                    <Text>{item.name}</Text>
                  </TouchableOpacity>
                </View>
              );
            }}
          />
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    alignSelf: 'center',
    fontSize: 22,
  },
  listItems: {
    paddingHorizontal: 25,
    paddingTop: 20,
    alignItems: 'center',
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
    paddingHorizontal: 50,
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
  closeButton: {
    color: 'red',
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },

  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});

export default SearchDetailsScreen;
