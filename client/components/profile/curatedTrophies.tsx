import React from 'react';
import {View, Text, Image, StyleSheet} from 'react-native';

const CuratedTrophies = ({ recentAchievements }) => {

  if (!recentAchievements) return <></>;
  const trophyList = () => {
    let imagePath = require('../../assets/icons/athlete-24x24-46391.png');

    return recentAchievements.map(achievement => {
      return (
        <View key={achievement.id} style={styles.trophy}>
          <Image style={styles.trophyImage} source={imagePath} />
          <Text style={styles.trophyName}>{achievement.name}</Text>
        </View>
      );
    });
  };

  return <View style={styles.container}>{trophyList()}</View>;
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  trophy: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
    textAlign: 'center',
    alignItems: 'center',
  },
  trophyImage: {
    width: 36,
    height: 36,
  },
  trophyName: {
    fontSize: 12,
    width: 64,
    height: 40,
    flexWrap: 'wrap',
  },
});

export default CuratedTrophies;
