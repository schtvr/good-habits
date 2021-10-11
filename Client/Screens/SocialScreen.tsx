import React from 'react';
import {FlatList, ImageSourcePropType} from 'react-native';
import {ListRenderItem, TouchableOpacity, Image} from 'react-native';
import {View, Text, StyleSheet} from 'react-native';

import {Card, ListItem, Button, Icon} from 'react-native-elements';

const friends = [
  {
    id: 1,
    name: 'Sean',
    completedQuests: ['drink water'],
    activeQuests: ['Improve posture', 'Couch to 5k'],
    url: require('../assets/friend1.png'),
  },
  {
    id: 2,
    name: 'Steve',
    completedQuests: ['drink water', 'Improve posture'],
    activeQuests: ['Couch to 5k'],
    url: require('../assets/friend1.png'),
  },
  {
    id: 3,
    name: 'Juan',
    completedQuests: ['drink water', 'Improve posture'],
    activeQuests: ['Couch to 5k'],
    url: require('../assets/friend1.png'),
  },
  {
    id: 4,
    name: 'Juan',
    completedQuests: ['drink water', 'Improve posture'],
    activeQuests: ['Couch to 5k'],
    url: require('../assets/friend1.png'),
  },
  {
    id: 5,
    name: 'Juan',
    completedQuests: ['drink water', 'Improve posture'],
    activeQuests: ['Couch to 5k'],
    url: require('../assets/friend1.png'),
  },
  {
    id: 6,
    name: 'Juan',
    completedQuests: ['drink water', 'Improve posture'],
    activeQuests: ['Couch to 5k'],
    url: require('../assets/friend1.png'),
  },
  {
    id: 7,
    name: 'Juan',
    completedQuests: ['drink water', 'Improve posture'],
    activeQuests: ['Couch to 5k'],
    url: require('../assets/friend1.png'),
  },
];
interface IFriends {
  id: number;
  name: string;
  completedQuests: [];
  activeQuests: [];
  url: ImageSourcePropType;
}
const renderItems: ListRenderItem<IFriends> = ({item, index}) => {
  return (
    <>
      <TouchableOpacity>
        <Card>
          <Card.Title>CARD WITH DIVIDER</Card.Title>
          <Card.Divider />

          <View key={index}>
            <Image
              style={styles.image}
              resizeMode="cover"
              source={require('../assets/friend1.png')}
            />
            <Card.Divider />

            <Text>{item.name}</Text>
          </View>
        </Card>
      </TouchableOpacity>
    </>
  );
};

const SocialScreen = () => {
  return (
    <View>
      <Text style={styles.title}>All Friends!</Text>

      <FlatList
        data={friends}
        keyExtractor={item => item.id.toString()}
        renderItem={renderItems}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    alignSelf: 'center',
    fontWeight: 'bold',
    fontSize: 24,
  },
  image: {},
});

export default SocialScreen;
