import React, { useEffect } from 'react';
import {View, Button, StyleSheet } from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import CompletedStats from '../components/profile/completedStats';
import CuratedTrophies from '../components/profile/curatedTrophies';
import QuestListCard from '../components/QuestListCard';
import ProfileHeader from '../components/profile/profileHeader';
import { questSelector, getAllQuests, getOtherUserActiveQuests, getOtherUserCompletedQuests} from '../redux/questSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getOtherUser, stateSelector } from '../redux/userSlice';

const OtherProfileScreen = () => {
  const dispatch = useDispatch();
  const { otherUser } = useSelector(stateSelector);
  const { userName, level } = otherUser;
  const { otherUserQuests, quests } = useSelector(questSelector);
  const { completedQuests, activeQuests } = otherUserQuests;
  const otherUserId = 3;
  let scopedCompletedQuests = []
  let scopedActiveQuests = []

  const getToken = async () => {
    return await AsyncStorage.getItem('token');
  };
  const populateOtherUser = async () => {
    dispatch(
      getAllQuests({
        api: {
          url: 'quests',
        },
      }),
    );
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

  const populateQuestDetails = (questList) => {
    console.log('1st pass', questList)
    return questList.map((passedQuest) => {
      return quests.filter(quest => quest.id === passedQuest.questId)
    })
  }

  useEffect(() => {
    populateOtherUser();
    scopedCompletedQuests = populateQuestDetails(completedQuests);
    console.log(scopedCompletedQuests)
    scopedActiveQuests = populateQuestDetails(activeQuests);
  }, [])

  console.log('QUESTS', activeQuests)

  return (
    <View>
      <ProfileHeader
        userName={userName}/>
      <CuratedTrophies />
      <CompletedStats
        level={level}
        howManyCompletedQuestsYouGotLilBoy={completedQuests.length}
      />
      <View style={{paddingTop: 10}} />
      <Button
        title="add friend"
        onPress={() => console.log('add me bb')}/>
      <QuestListCard
        cardTitle={`${userName}'s active quests`}
        questList={scopedActiveQuests}/>
      <QuestListCard
        cardTitle={`${userName}'s previous quests`}
        questList={scopedCompletedQuests}/>
    </View>
  );
}

const styles = StyleSheet.create({
  friendBtn: {
    paddingTop: 10
  }
})

export default OtherProfileScreen;