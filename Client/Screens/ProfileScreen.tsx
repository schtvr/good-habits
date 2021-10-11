import React from 'react';
import {View, Text, StyleSheet, ProgressBarAndroidBase} from 'react-native';
import CompletedStats from '../components/profile/completedStats';
import CuratedTrophies from '../components/profile/curatedTrophies';
import QuestCard from '../components/QuestListCard';
import ProfileHeader from '../components/profile/profileHeader';

const ProfileScreen = () => {
  return (
    <View>
      <ProfileHeader />
      <CuratedTrophies />
      <CompletedStats />
      <QuestCard
        cardTitle="User's active quests"
        questList={user.activeQuests}/>
      <QuestCard
        cardTitle="User's previous quests"
        questList={user.questHistory}/>
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
  level: number,
  EXP: number,
}



export const user : IUser = {
  userName: 'username go brr',
  profileUrl: 'https://i.imgur.com/1dhHIkV.png',
  completedQuests: 69,
  curatedTrophies: [{
    key: 1,
    icon: './client/assets/icons/athlete-24x24-46391.png',
    name: 'Completed 5k',
  },
  {
    key: 2,
    icon: './client/assets/icons/climb-24x24-46399.png',
    name: 'Went Up Stairs',
  },
  {
    key: 3,
    icon: './client/assets/icons/rest-24x24-46425.png',
    name: 'Took A Nap',
  },
],
  activeQuests: [{
    name: 'Pick nose'
  },
  {
    name: 'Pick friends'
  },
  {
    name: 'Pick friends\' noses'
  },
],
  questHistory: [{
    name: 'touch tips'
  },
  {
    name: 'tip the touches'
  },
  {
    name: 'touch tip touches'
  },
],
  level: 3,
  EXP: 280
}

const styles = StyleSheet.create({
  pfp: {
    flexDirection: 'row'
  }
})

export default ProfileScreen;
