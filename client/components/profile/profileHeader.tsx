import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import {View, Text, Image, StyleSheet, TouchableOpacity} from 'react-native';
import { stateSelector } from '../../redux/userSlice';
import CircularProgressBar from './progressCircle';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/core';


const ProfileHeader = props => {
  const { userName} = props
  const navigation = useNavigation();
  const { user } = useSelector(stateSelector);
  const profileUrl = user.pfp || 'https://i.imgur.com/1dhHIkV.png';
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
          { userName }
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