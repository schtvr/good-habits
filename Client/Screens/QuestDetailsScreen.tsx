import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import QuestDetailCard from '../components/QuestDetailCard';
import QuestCard from '../components/QuestListCard';
import { ThemeProvider } from 'react-native-elements';


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
      <QuestCard
        cardTitle='Tasks to complete quest'
        questList={mockTaskList}
      />

    </View>
  )
}

const styles = StyleSheet.create({})


export default QuestDetailsScreen