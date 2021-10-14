import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Switch,
  TouchableOpacity,
} from 'react-native';
import {IQuest} from '../interfaces/interfaces';
import {Avatar, Input} from 'react-native-elements';
import {useDispatch, useSelector} from 'react-redux';
import {getAllQuests, questSelector} from '../redux/questSlice';
import {getUsers, stateSelector} from '../redux/userSlice';
import {useNavigation} from '@react-navigation/core';
import AsyncStorage from '@react-native-async-storage/async-storage';

const keyExtractor = (item, index) => index.toString();

const renderItem = ({item}) => {
  return (
    <View style={styles.listItems}>
      <Avatar size="large" source={require('../assets/avatar.png')} />
      <Text>{item.userName}</Text>
    </View>
  );
};

const SearchDetailsScreen = ({navigation}) => {
  const dispatch = useDispatch();
  let {quests} = useSelector(questSelector);
  let {usersList} = useSelector(stateSelector);
  
  const [questArray, setQuestArray] = useState([...quests]);
  const [usersArray, setUsersArray] = useState([...usersList]);
  const [searchFriends, setSearchFriends] = useState(true);
  const [searchVal, setSearchVal] = useState(''); 
  const toggleSwitch = () => setSearchFriends(previousState => !previousState);

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

  useEffect(() => {
    getQuests();
    getAllUsers();
  }, []);

  const handleSearch = (text) => {
    setSearchVal(text);
    const re = new RegExp(text, 'i');
    if (searchFriends) {
      setUsersArray(
        usersList.filter((user) => re.test(user.userName))
        );
    } else {
      setQuestArray(
        quests.filter((quest) => re.test(quest.name))
        );
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

  return (
    <View style={{marginTop: 20, flex: 1}}>
      <Input 
        label="search" 
        onChangeText={(text) => handleSearch(text)}
        value={searchVal}
      />
      
      {searchFriends ? (
        <>
          <Text style={styles.title}>All Users</Text>
          <FlatList
            data={usersArray}
            numColumns={3}
            renderItem={renderItem}
            keyExtractor={keyExtractor}
          />
        </>
      ) : (
        <>
          <Text style={styles.title}>All Quests</Text>

          <FlatList
            data={questArray}
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
});

export default SearchDetailsScreen;
