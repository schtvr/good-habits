import React from 'react';
import {FlatList, ImageSourcePropType} from 'react-native';
import {ListRenderItem, TouchableOpacity, Image} from 'react-native';
import {View, Text, StyleSheet, ScrollView, SafeAreaView} from 'react-native';

import {Card, ListItem, Button, Icon} from 'react-native-elements';

const friends = [
  {
    id: 1,
    name: 'Sean',
    completedQuests: [
      {
        name: 'drink water',
        EXP: 50,
      },
      {
        name: 'couch to 5k',
        EXP: 150,
      },
    ],
    activeQuests: ['Improve posture'],
    url: require('../assets/friend1.png'),
    level: 5,
  },
  {
    id: 2,
    name: 'Steve',
    completedQuests: [
      {
        name: 'drink water',
        EXP: 50,
      },
      {
        name: 'Improve posture',
        EXP: 100,
      },
    ],
    activeQuests: ['Couch to 5k'],
    url: require('../assets/friend1.png'),
    level: 5,
  },
  {
    id: 3,
    name: 'Juan',
    completedQuests: [
      {
        name: 'drink water',
        EXP: 50,
      },
      {
        name: 'Improve posture',
        EXP: 100,
      },
    ],
    activeQuests: ['Couch to 5k'],
    url: require('../assets/friend1.png'),
    level: 5,
  },
  {
    id: 4,
    name: 'Juan',
    completedQuests: [
      {
        name: 'drink water',
        EXP: 50,
      },
      {
        name: 'Improve posture',
        EXP: 100,
      },
    ],
    activeQuests: ['Couch to 5k'],
    url: require('../assets/friend1.png'),
    level: 5,
  },
  {
    id: 5,
    name: 'Juan',
    completedQuests: [
      {
        name: 'drink water',
        EXP: 50,
      },
      {
        name: 'Improve posture',
        EXP: 100,
      },
    ],
    activeQuests: ['Couch to 5k'],
    url: require('../assets/friend1.png'),
    level: 5,
  },
  {
    id: 6,
    name: 'Juan',
    completedQuests: [
      {
        name: 'drink water',
        EXP: 50,
      },
      {
        name: 'Improve posture',
        EXP: 100,
      },
    ],
    activeQuests: ['Couch to 5k'],
    url: require('../assets/friend1.png'),
    level: 5,
  },
  {
    id: 7,
    name: 'Juan',
    completedQuests: [
      {
        name: 'drink water',
        EXP: 50,
      },
      {
        name: 'Improve posture',
        EXP: 100,
      },
    ],
    activeQuests: ['Couch to 5k'],
    url: require('../assets/friend1.png'),
    level: 5,
  },
];
interface IFriends {
  id: number;
  name: string;
  completedQuests: [];
  activeQuests: [];
  url: ImageSourcePropType;
  level: number;
}
const renderItems: ListRenderItem<IFriends> = ({item, index}) => {
  return (
    <>
      <TouchableOpacity>
        <Card>
          <Card.Title style={styles.text}>{item.name}</Card.Title>
          <Card.Divider
            color={'black'}
            inset={true}
            insetType={'middle'}
            subHeader={`Current Quest: ${item.activeQuests}`}
            subHeaderStyle={styles.text}
          />
          <View style={{flexDirection: 'column'}}>
            <Image
              resizeMode="cover"
              source={require('../assets/friend1.png')}
            />
            <Text>Lvl {item.level}</Text>
          </View>
          <View style={{position: 'absolute', left: 100, top: 60}}>
            <Text style={{paddingLeft: 10}}></Text>
            <Text style={styles.text}>Completed Quests: </Text>
            {item.completedQuests.map((quest, index) => {
              return (
                <Text style={styles.questName} key={index}>
                  {quest.name}
                </Text>
              );
            })}
          </View>
        </Card>
      </TouchableOpacity>
    </>
  );
};

const SocialScreen = () => {
  return (
    <SafeAreaView style={{flex: 1, paddingBottom: 45}}>
      <View>
        <Text style={styles.title}>All Friends!</Text>
        <FlatList
          data={friends}
          keyExtractor={item => item.id.toString()}
          renderItem={renderItems}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  title: {
    alignSelf: 'center',
    fontWeight: 'bold',
    fontSize: 24,
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  questName: {
    fontSize: 16,
  },
});

export default SocialScreen;
