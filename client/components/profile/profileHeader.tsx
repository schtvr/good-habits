import React from 'react';
import {View, Text, Image, StyleSheet, TouchableOpacity} from 'react-native';
import { useNavigation } from '@react-navigation/core';


const ProfileHeader = ({ user }) => {
  const navigation = useNavigation();
  const profileUrl = user.pfp || 'https://i.imgur.com/1dhHIkV.png';
  console.log(user.pfp);
  return (
    <View style={styles.container}>
      <View style={styles.pfp}>
        <TouchableOpacity onPress={() => navigation.navigate('Upload Profile Picture')}>
          <Image
            style={styles.image}
            source={{ uri: profileUrl }}
          />
        </TouchableOpacity>
        <Text style={styles.userName}>
          { user.userName }
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 10,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  pfp: {
    alignItems: 'center'
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 40,
    paddingBottom: 30,
  },
  userName: {
    fontSize: 20,
    paddingBottom: 15,
  },
});

export default ProfileHeader;