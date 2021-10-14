import React, { useEffect } from 'react';
import {View, Text, StyleSheet } from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import CompletedStats from '../components/profile/completedStats';
import CuratedTrophies from '../components/profile/curatedTrophies';
import QuestListCard from '../components/QuestListCard';
import ProfileHeader from '../components/profile/profileHeader';
import { getActiveQuests, getCompletedQuests, questSelector , getAllQuests} from '../redux/questSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';



const ProfileScreen = () => {
  const dispatch = useDispatch();
  const { activeQuests, quests } = useSelector(questSelector)

  const getToken = async () => {
    return await AsyncStorage.getItem('token');
  };
  const getQuests = async () => {
    dispatch(
      getAllQuests({
        api: {
          url: 'quests',
        },
      }),
    );
  };
  const populateQuests = async () => {
    dispatch(
      getActiveQuests({
        api: {
          url: 'quest/getActiveQuests',
          headers: {
            Authorization: `Bearer ${await getToken()}`,
          },
        },
      }),
    );
    dispatch(
      getCompletedQuests({
        api: {
          url: 'quest/completed',
          headers: {
            Authorization: `Bearer ${await getToken()}`,
          },
        },
      }),
    )
  };




  useEffect(() => {
    getQuests();
    populateQuests();
    const doShit = async () => {
      console.log('Done with do shit', quests);
      const activeQuestDetails = activeQuests.map((activeQuest) => {
        return quests.filter((quest) => quest.id === activeQuest.questId);
      });
      console.log('ALl the quests', activeQuestDetails);
    }
    doShit();

  }, [quests]);

  return (
    <View>
      <ProfileHeader />
      <CuratedTrophies />
      <CompletedStats />
      <QuestListCard
        cardTitle="Your active quests"
        questList={activeQuests}/>
      <QuestListCard
        cardTitle="Your previous quests"
        questList={user.questHistory}/>
    </View>
  );
};

interface IUser {
  userName: string,
  profileUrl: string,
  completedQuests: number,
  curatedTrophies: any[],
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
  level: 3,
  EXP: 280
}

const styles = StyleSheet.create({
  pfp: {
    flexDirection: 'row'
  }
})

export default ProfileScreen;
