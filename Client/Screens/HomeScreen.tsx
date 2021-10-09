import React from 'react';
import {Text, View, Button, StyleSheet, Image, ScrollView} from 'react-native';
import {LinearProgress} from 'react-native-elements';

import CarouselComponent from '../components/CarouselComponent';

import Accordian from '../components/Accordian';

const quests = [
  {
    id: 1,
    duration: 350000,
    name: 'Improve posture',
    description: 'Correct your posture for 1 week',
    category: 'health',
    missedCheckin: false,
    completionEXP: 50,
  },
  {
    id: 2,
    duration: 7900000,
    name: 'couch to 5k',
    description: 'Run 5k within the time limit',
    category: 'fitness',
    missedCheckin: false,
    completionEXP: 150,
  },
];

const friends = [
  {
    id: 1,
    name: 'Sean',
    activeQuests: 'Improve posture',
  },
  {
    id: 2,
    name: 'Steve',
    activeQuests: 'Couch to 5k',
  },
  {
    id: 3,
    name: 'Juan',
    activeQuests: 'Couch to 5k',
  },
];

const HomeScreen = ({navigation}) => {
  return (
    <View style={styles.body}>
      <ScrollView style={{flex: 1}}>
        <Button
          title="Achievements"
          onPress={() => navigation.navigate('Achievements')}
        />
        <View style={styles.header}>
          <Image source={require('../assets/avatar.png')} />
          <Text style={styles.level}>Lvl 1</Text>
          <LinearProgress
            style={styles.progressBar}
            color="yellow"
            value={0.5}
            variant={'determinate'}
          />
          <Text style={styles.EXP}>50/100 EXP</Text>
        </View>
        <View style={styles.container}>
          <Text style={styles.activeQuests}>Active Quests</Text>
          {renderAccordians()}
        </View>
        <Text style={styles.activeFriends}>Active Friends</Text>
        <CarouselComponent data={friends} />
      </ScrollView>
    </View>
  );
};

const renderAccordians = () => {
  const items = [];
  for (let item of quests) {
    items.push(
      <Accordian
        key={item.id}
        title={item.name}
        data={item.description}
        btnText="completed"
        btnText2="upload"
      />,
    );
  }
  return items;
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 50,
    backgroundColor: '#001845',
    paddingHorizontal: 10,
    paddingBottom: 20,
  },
  body: {
    flex: 1,
    backgroundColor: '#001845',
  },
  activeQuests: {
    alignSelf: 'center',
    paddingBottom: 20,
    fontSize: 22,
    color: '#979dac',
  },
  progressBar: {
    width: '50%',
    alignSelf: 'center',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    borderBottomColor: '#979dac',
    borderWidth: 2,
    paddingTop: 10,
  },
  EXP: {
    position: 'absolute',
    bottom: 0,
    right: 50,
    color: '#979dac',
  },
  level: {
    position: 'absolute',
    bottom: 0,
    color: '#979dac',
    left: 100,
  },
  carousel: {
    borderWidth: 1,
    borderColor: '#979dac',
  },
  activeFriends: {
    color: '#979dac',
    fontSize: 16,
    fontWeight: 'bold',
    paddingLeft: 25,
    paddingBottom: 10,
  },
  friendList: {
    alignContent: 'center',
  },
  friendButtons: {
    alignItems: 'flex-end',
  },
});

export default HomeScreen;
