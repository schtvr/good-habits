import React, { useEffect } from 'react';
import {View, StyleSheet, ImageBackground } from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import { Card } from 'react-native-elements';
import CompletedStats from '../components/profile/completedStats';
import CuratedTrophies from '../components/profile/curatedTrophies';
import QuestListCard from '../components/QuestListCard';
import ProfileHeader from '../components/profile/profileHeader';
import { ThemeProvider } from 'react-native-elements';
import { getActiveQuests, getCompletedQuests, questSelector } from '../redux/questSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { stateSelector } from '../redux/userSlice';
import { elementsTheme }  from '../styles/react-native-elements-theme-provider';




const ProfileScreen = () => {
  const dispatch = useDispatch();
  const { activeQuests, completedQuests } = useSelector(questSelector)
  const {user} = useSelector(stateSelector)

  const getToken = async () => {
    return await AsyncStorage.getItem('token');
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
    populateQuests();
  }, []);

  return (
    <View style={{flex: 1}}>
      <ImageBackground
        style={{flex: 1}}
        source={require('../assets/mauve-stacked-waves-haikei.png')}
      >
        <ThemeProvider theme={elementsTheme}>
          <Card >
            <ProfileHeader
              userName={user.userName}/>
          </Card>
        
          <Card>
            <CompletedStats
              level={user.level}
              howManyCompletedQuestsYouGotLilBoy={completedQuests.length}/>
            <CuratedTrophies />
          </Card>
            <QuestListCard
              cardTitle="Your active quests"
              questList={activeQuests}/>
          <QuestListCard
            cardTitle="Your previous quests"
            questList={completedQuests}/>
          </ThemeProvider>
      </ImageBackground>
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
