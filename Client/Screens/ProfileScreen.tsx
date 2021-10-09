import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import CompletedStats from '../components/profile/completedStats';
import ProfileHeader from '../components/profile/profileHeader';

const ProfileScreen = () => {
  return (
    <View>
      <ProfileHeader />
      <CompletedStats />
    </View>
  );
};

interface IUser {
  userName: string,
  profileUrl: string,
  completedQuests: number,
  curatedTrophies: any[],
  activeQuests: any[],
  questHistory: any[],
}



export const user : IUser = {
  userName: 'username go brr',
  profileUrl: 'https://i.imgur.com/1dhHIkV.png',
  completedQuests: 69,
  curatedTrophies: [1,2,3],
  activeQuests: [,11,112,1123],
  questHistory: [1,4,9,16],
}

const styles = StyleSheet.create({
  pfp: {
    flexDirection: 'row'
  }
})

export default ProfileScreen;
