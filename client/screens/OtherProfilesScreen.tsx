import React, { useEffect } from 'react';
import {View, StyleSheet } from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import CompletedStats from '../components/profile/completedStats';
import CuratedTrophies from '../components/profile/curatedTrophies';
import QuestListCard from '../components/QuestListCard';
import ProfileHeader from '../components/profile/profileHeader';
import { questSelector, getOtherUserActiveQuests, getOtherUserCompletedQuests} from '../redux/questSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getOtherUser, stateSelector } from '../redux/userSlice';

const OtherProfileScreen = () => {
  const dispatch = useDispatch();
  const { otherUser } = useSelector(stateSelector);
  const { userName, level } = otherUser;
  const { otherUserQuests } = useSelector(questSelector);
  const { completedQuests, activeQuests } = otherUserQuests;
  const otherUserId = 3;

  const getToken = async () => {
    return await AsyncStorage.getItem('token');
  };
  const populateOtherUser = async () => {
    dispatch(
      getOtherUser({
        api: {
          url: 'user/'+otherUserId,
          headers: {
            Authorization: `Bearer ${await getToken()}`,
          },
        }
      })
    );
    dispatch(
      getOtherUserActiveQuests({
        api: {
          url: 'quest/' + otherUserId + '/active',
          headers: {
            Authorization: `Bearer ${await getToken()}`,
          }
        }
      })
    )
    dispatch(
      getOtherUserCompletedQuests({
        api: {
          url: 'quest/' + otherUserId + '/completed',
          headers: {
            Authorization: `Bearer ${await getToken()}`,
          }
        }
      })
    )
  }

  useEffect(() => {
    populateOtherUser();
  }, [])

  console.log('OTHER USER QUESTS', activeQuests)

  return (
    <View>
      <ProfileHeader
        userName={userName}/>
      <CuratedTrophies />
      <CompletedStats
        level={level}
        howManyCompletedQuestsYouGotLilBoy={completedQuests.length}
      />
      <QuestListCard
        cardTitle={`${userName}'s active quests`}
        questList={activeQuests}/>
      <QuestListCard
        cardTitle={`${userName}'s previous quests`}
        questList={completedQuests}/>
    </View>
  );
}

export default OtherProfileScreen;