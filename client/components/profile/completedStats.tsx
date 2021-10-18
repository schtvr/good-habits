import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import CircularProgressBar from './progressCircle';


const CompletedStats = (props) => {
  const { exp, howManyCompletedQuestsYouGotLilBoy } = props;

  console.log(exp);

  return (
    <View style={styles.pfp}>
      <Text style={styles.pfp}>Level: </Text>
      <CircularProgressBar
        activeColor="#2d3c8f"
        passiveColor="darkgrey"
        baseColor="white"
        width={5}
        percent={exp % 100}
        radius={15}
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
})

export default CompletedStats;