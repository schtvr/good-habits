import React from 'react';
import { StyleSheet, View } from 'react-native';
import QuestDetailCard from '../components/QuestDetailCard';
import QuestListCard from '../components/QuestListCard';
import FriendListRow from '../components/FriendListRow';


const QuestDetailsScreen = () => {
  const mockTaskList = [{
    name: 'touch tips'
  },
  {
    name: 'tip the touches'
  },
  {
    name: 'touch tip touches'
  }];

  return (
    <View>
      <QuestDetailCard />
      <FriendListRow />
      <QuestListCard
        cardTitle='Tasks to complete quest:'
        questList={mockTaskList}
      />

    </View>
  )
}

const styles = StyleSheet.create({})


export default QuestDetailsScreen