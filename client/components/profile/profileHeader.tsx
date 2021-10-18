import React from 'react';
import { useSelector } from 'react-redux';
import {View, Text, Image, StyleSheet, TouchableOpacity} from 'react-native';
import { useNavigation } from '@react-navigation/core';
import { stateSelector } from '../../redux/userSlice';

const ProfileHeader = ({ user }) => {
  const navigation = useNavigation();
  const profileUrl = user.pfp || 'https://i.imgur.com/1dhHIkV.png';
  const { user: signedInuser } = useSelector(stateSelector);
  
  const navigate = () => {
    if (user.id !== signedInuser.id) return;
    navigation.navigate('Upload Profile Picture')
  }

  return (
    <View style={styles.container}>
      <View style={styles.pfp}>
        <TouchableOpacity onPress={navigate}>
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