import React from 'react';
import {Text, View, Button, StyleSheet, Image} from 'react-native';
import {LinearProgress} from 'react-native-elements';
import Accordian from '../Components/Accordian';

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

const HomeScreen = () => {
  return (
    <View style={styles.body}>
      <View style={styles.header}>
        <Image style={styles.avatar} source={require('../assets/avatar.png')} />
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
    </View>
  );
};

const renderAccordians = () => {
  const items = [];
  for (let item of quests) {
    items.push(<Accordian title={item.name} data={item.description} />);
  }
  return items;
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
    backgroundColor: '#35374a',
    paddingHorizontal: 10,
  },
  body: {
    flex: 1,
    backgroundColor: '#35374a',
  },
  activeQuests: {
    alignSelf: 'center',
    paddingBottom: 20,
    fontSize: 22,
    color: 'white',
  },
  progressBar: {
    width: '50%',
    alignSelf: 'center',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    borderBottomColor: 'black',
    borderWidth: 1,
    paddingTop: 20,
  },
  EXP: {
    position: 'absolute',
    bottom: 0,
    right: 50,
    color: 'white',
  },
  level: {
    position: 'absolute',
    bottom: 0,
    color: 'white',
    left: 100,
  },
  avatar: {
    // marginTop: 20,
  },
});

export default HomeScreen;
