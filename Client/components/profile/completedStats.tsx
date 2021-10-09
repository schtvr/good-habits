import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import { user } from '../../screens/ProfileScreen';
import CircularProgressBar from './progressCircle';


const CompletedStats = () => {

  return (
    <View style={styles.pfp}>
      <Text style={styles.pfp}>Level: </Text>
      <CircularProgressBar
        activeColor="darkviolet"
        passiveColor="darkgrey"
        baseColor="white"
        width={5}
        percent={35}
        radius={15}
        duration={1200}
      >
      <Text style={styles.pfp}>
        {user.level}
      </Text>
      </CircularProgressBar>
      <Text> |  69 completed quests </Text>
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