import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import CircularProgressBar from './progressCircle';

const CompletedStats = (props) => {
  const { exp, howManyCompletedQuestsYouGotLilBoy } = props;

  return (
    <View style={styles.pfp}>
      <Text style={styles.levelText}>Level: </Text>
      <CircularProgressBar
        activeColor="peru"
        passiveColor="darkgrey"
        baseColor="white"
        width={10}
        percent={exp % 100}
        radius={18}
        duration={1200}
      >
      <Text style={styles.pfp}>
        {(Math.round(exp / 100))}
      </Text>
      </CircularProgressBar>
      <Text> |  {howManyCompletedQuestsYouGotLilBoy} completed quests </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  pfp: {
    flexDirection: 'row',
    fontSize: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  levelText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#6071d5'
  }
});

export default CompletedStats;