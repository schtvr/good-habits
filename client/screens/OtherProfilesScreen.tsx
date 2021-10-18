import React, { useEffect } from 'react';
import {View, StyleSheet, ImageBackground } from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import CompletedStats from '../components/profile/completedStats';
import CuratedTrophies from '../components/profile/curatedTrophies';
import QuestListCard from '../components/QuestListCard';
import ProfileHeader from '../components/profile/profileHeader';
import { questSelector, getAllQuests, getOtherUserActiveQuests, getOtherUserCompletedQuests} from '../redux/questSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getOtherUser, stateSelector } from '../redux/userSlice';
import { addFriend } from '../redux/friendSlice'
import { ThemeProvider, Card, Button } from 'react-native-elements';
import { elementsTheme } from '../styles/react-native-elements-theme-provider';

const OtherProfileScreen = ({route}) => {
  const dispatch = useDispatch();
  const { otherUser } = useSelector(stateSelector);
  const { userName, level } = otherUser;
  const { otherUserQuests, quests } = useSelector(questSelector);
  const { completedQuests, activeQuests } = otherUserQuests;

  const { id } = route.params;
  let scopedCompletedQuests = []
  let scopedActiveQuests = []

  const getToken = async () => {
    return await AsyncStorage.getItem('token');
  };

  const addAFriend = async ()  => {
    dispatch(
      addFriend({
        api: {
          method: 'PUT',
          url: `user/friendRequest/${id}`,
          headers: {
            Authorization: `Bearer ${await getToken()}`,
          },
        },
      }),
    );
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
          url: 'user/'+id,
          headers: {
            Authorization: `Bearer ${await getToken()}`,
          },
        }
      })
    );
    dispatch(
      getOtherUserActiveQuests({
        api: {
          url: 'quest/' + id + '/active',
          headers: {
            Authorization: `Bearer ${await getToken()}`,
          }
        }
      })
    )
    dispatch(
      getOtherUserCompletedQuests({
        api: {
          url: 'quest/' + id + '/completed',
          headers: {
            Authorization: `Bearer ${await getToken()}`,
          }
        }
      })
    )
  }

  const populateQuestDetails = (questList) => {
    return questList.map((passedQuest) => {
      return quests.filter(quest => quest.id === passedQuest.questId)
    })
  }

  useEffect(() => {
    populateOtherUser();
    scopedCompletedQuests = populateQuestDetails(completedQuests);
    scopedActiveQuests = populateQuestDetails(activeQuests);
  }, [])

  return (
    <View style={{flex: 1}}>
      <ImageBackground
        style={{flex: 1}}
        source={require('../assets/mauve-stacked-waves-haikei.png')}
      >
        <ThemeProvider theme={elementsTheme}>
      <Card>
        <ProfileHeader
          userName={userName}/>
        <Button
          title="Send friend request"
          onPress={addAFriend}/>
      </Card>
      <Card>
        <CompletedStats
          level={level}
          howManyCompletedQuestsYouGotLilBoy={completedQuests.length}
        />
        <CuratedTrophies />
      </Card>
      <QuestListCard
        cardTitle={`${userName}'s active quests`}
        questList={scopedActiveQuests}/>
      <QuestListCard
        cardTitle={`${userName}'s previous quests`}
        questList={scopedCompletedQuests}/>
        </ThemeProvider>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  friendBtn: {
    paddingTop: 10
  }
})

export default OtherProfileScreen;