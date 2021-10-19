import React from 'react';
import {Image, Text, View, StyleSheet} from 'react-native';
import {LinearProgress} from 'react-native-elements';

const HomeHeader = props => {
  const {user} = props;
  const profileUrl = user.pfp || 'https://i.imgur.com/1dhHIkV.png';

  return (
    <View style={{flexDirection: 'row'}}>
      <Image source={{uri: profileUrl}} style={{marginRight: 12}} />
      <View style={{flexDirection: 'column', flex: 1}}>
        <Text style={{fontSize: 18, alignSelf: 'center'}}>
          {user.userName}{' '}
        </Text>

        <View style={styles.headerText}>
          <View>
            <Text>Level: {Math.floor(user.exp / 100)}</Text>
          </View>
          <View>
            <Text>{user.exp % 100}/100 EXP</Text>
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
  headerText: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

export default HomeHeader;
