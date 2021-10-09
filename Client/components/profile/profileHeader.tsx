import React from 'react';
import {View, Image, StyleSheet} from 'react-native';
import { user } from '../../screens/ProfileScreen';


const ProfileHeader = () => {

  console.log('user', user.profileUrl)

  return (
    <View style={styles.container}>
      <Image
        style={styles.image}
        source={{
          uri: user.profileUrl
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 50,
  },
  image: {
    width: 50,
    height: 50,
  },
  logo: {
    width: 66,
    height: 58,
  },
});

export default ProfileHeader;