import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { Card } from 'react-native-elements'

const QuestCard = (props) => {
  const { cardTitle, questList } = props

  return (
    <View>
      <Card>
        <Card.Title>{cardTitle}</Card.Title>
        <Card.Divider/>

        { questList.map((quest, i) => {
          return (
            <View key={i} style={styles.activeQuestList}>
              <Text style={styles.name}>{quest.name}</Text>
            </View>
            );
        })}
      </Card>
    </View>
  )
}

const styles = StyleSheet.create({
  activeQuestList: {
  },
  name: {
    flexDirection: 'row'
  },
})

export default QuestCard;