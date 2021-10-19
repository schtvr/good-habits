import React from 'react';
import {Image, Text, View, StyleSheet} from 'react-native';
import {LinearProgress} from 'react-native-elements';

const HomeHeader = props => {
  const {user} = props;
  const profileUrl = user.pfp || 'https://i.imgur.com/1dhHIkV.png';
  return (
    <View style={{flexDirection: 'row'}}>
      <Image source={{uri: profileUrl}} style={styles.imageStyle} />
      <View style={styles.container}>
        <Text style={styles.userName}>{user.userName} </Text>

        <View style={styles.headerText}>
          <View>
            <Text style={styles.exp}>Level: {Math.floor(user.exp / 100)}</Text>
          </View>
          <View>
            <Text style={styles.exp}>{user.exp % 100}/100 EXP</Text>
          </View>
        </View>

        <LinearProgress
          style={styles.progressBar}
          color="#2d3c8f"
          value={(user.exp % 100) / 100}
          variant={'determinate'}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  progressBar: {
    height: 12,
  },
  container: {
    flexDirection: 'column',
    flex: 1,
  },
  headerText: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  imageStyle: {
    marginRight: 12,
    height: 80,
    width: 80,
    borderRadius: 50,
  },
  userName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  exp: {
    marginTop: 15,
    fontWeight: 'bold',
  },
});

export default HomeHeader;
