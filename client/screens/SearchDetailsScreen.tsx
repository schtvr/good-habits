import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Switch,
  TouchableOpacity,
} from 'react-native';
import {Avatar, Input} from 'react-native-elements';
import {useDispatch, useSelector} from 'react-redux';
import { questSelector} from '../redux/questSlice';
import {stateSelector} from '../redux/userSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getAllUsers, getQuests } from '../funcs/dispatch/dispatchFuncs';

const SearchDetailsScreen = ({navigation}) => {
  const dispatch = useDispatch();
  let {quests} = useSelector(questSelector);
  let {usersList} = useSelector(stateSelector);

  const [questArray, setQuestArray] = useState([...quests]);
  const [usersArray, setUsersArray] = useState([...usersList]);
  const [searchFriends, setSearchFriends] = useState(true);
  const [searchVal, setSearchVal] = useState('');
  const toggleSwitch = () => setSearchFriends(previousState => !previousState);

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

  useEffect(() => {
    getQuests(dispatch);
    getAllUsers(dispatch);
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
            keyExtractor={(item) => item.id}
          />
        </>
      ) : (
        <>
          <Text style={styles.title}>All Quests</Text>

          <FlatList
            data={renderList}
            numColumns={3}
            keyExtractor={(item) => item.id}
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
