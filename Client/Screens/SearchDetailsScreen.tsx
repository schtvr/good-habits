import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, FlatList, Switch} from 'react-native';
import {IQuest} from '../interfaces/interfaces';
import {Avatar, Input} from 'react-native-elements';
import {useDispatch, useSelector} from 'react-redux';
import {getAllQuests, questSelector, questSlice} from '../redux/questSlice';

const list = [
  {
    name: 'Amy Farha',

    subtitle: 'Vice President',
  },
  {
    name: 'Chris Jackson',

    subtitle: 'Vice Chairman',
  },
];
const keyExtractor = (item, index) => index.toString();

const renderItem = ({item}) => (
  <View style={styles.listItems}>
    <Avatar size="large" source={require('../assets/avatar.png')} />
    <Text>{item.name}</Text>
  </View>
);

const SearchDetailsScreen = ({navigation}) => {
  const [searchFriends, setSearchFriends] = useState(true);
  const toggleSwitch = () => setSearchFriends(previousState => !previousState);
  const dispatch = useDispatch();
  const {quests} = useSelector(questSelector);

  const getQuests = async () => {
    dispatch(
      getAllQuests({
        api: {
          url: 'quests',
        },
      }),
    );
  };

  useEffect(() => {
    getQuests();
  }, []);
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
      <Input label="search" />
      {searchFriends ? (
        <>
          <Text style={styles.title}>All Freinds</Text>
          <FlatList
            data={list}
            numColumns={3}
            renderItem={renderItem}
            keyExtractor={keyExtractor}
          />
        </>
      ) : (
        <>
          <Text style={styles.title}>All Quests</Text>

          <FlatList
            data={quests}
            numColumns={3}
            renderItem={renderItem}
            keyExtractor={keyExtractor}
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
