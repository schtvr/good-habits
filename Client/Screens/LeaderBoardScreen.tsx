import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

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
  return (
    <View>
      <Text>This is the LeaderboardScreen screen. TEST1</Text>
    </View>
  );
};

export default LeaderBoardScreen;
