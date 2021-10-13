import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Switch,
  Image,
  ScrollView,
} from 'react-native';
import {IQuest} from '../interfaces/interfaces';
import {
  Card,
  ListItem,
  Button,
  Icon,
  Avatar,
  Input,
} from 'react-native-elements';
import {Item} from 'react-native-paper/lib/typescript/components/List/List';

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

const quests: IQuest = [
  {
    id: 1,
    duration: 7,
    name: 'posture check',
    description: 'correct your posture for 1 week',
    category: 'health',
    completionExp: 50,
  },
  {
    id: 2,
    duration: 7,
    name: 'posture check',
    description: 'correct your posture for 1 week',
    category: 'health',
    completionExp: 50,
  },
  {
    id: 3,
    duration: 7,
    name: 'posture check',
    description: 'correct your posture for 1 week',
    category: 'health',
    completionExp: 50,
  },
  {
    id: 4,
    duration: 7,
    name: 'posture check',
    description: 'correct your posture for 1 week',
    category: 'health',
    completionExp: 50,
  },
  {
    id: 5,
    duration: 7,
    name: 'posture check',
    description: 'correct your posture for 1 week',
    category: 'health',
    completionExp: 50,
  },
  {
    id: 6,
    duration: 7,
    name: 'posture check',
    description: 'correct your posture for 1 week',
    category: 'health',
    completionExp: 50,
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
