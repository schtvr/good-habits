import React, {useState} from 'react';
import {View, Text, StyleSheet, Switch} from 'react-native';

const friends = [
  {
    id: 1,
    name: 'Sean',
    playerLvl: 'Improve posture',
  },
  {id: 2, name: 'Steve', playerLvl: 'Couch to 5k'},
  {
    id: 3,
    name: 'Juan',
    playerLvl: 'Couch to 5k',
  },
];

const globalPlayers = [
  {
    id: 1,
    name: 'Sean',
    playerLvl: 'Improve posture',
  },
  {id: 2, name: 'Steve', playerLvl: 'Couch to 5k'},
  {
    id: 3,
    name: 'Juan',
    playerLvl: 'Couch to 5k',
  },
];

const LeaderBoardScreen = () => {
  const [isGlobal, setIsGlobal] = useState(true);
  const toggleSwitch = () => setIsGlobal(previousState => !previousState);
  return (
    <View style={styles.body}>
      <View style={styles.titleContainer}>
        <Switch
          trackColor={{ false: "#00d9ff", true: "#029400" }}
          thumbColor={isGlobal ? "#016300" : "#0085b5"}
          onValueChange={toggleSwitch}
          value={isGlobal}
        />
        {(isGlobal)
          ? <Text style={styles.title}>Global Leaderboard</Text>
          : <Text style={styles.title}>Friends Leaderboard</Text>
        }
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  body: {
    flex: 1,
    backgroundColor: '#001845',
    color: 'white',
  },
  title: {
    alignSelf: 'center',
    paddingBottom: 20,
    fontSize: 22,
    color: '#979dac',
  },
  titleContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingTop: 20
  }
});

export default LeaderBoardScreen;
