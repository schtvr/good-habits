import React from 'react';
import {View, Text, StyleSheet, ScrollView} from 'react-native';
import {Card, ListItem, Button, Icon} from 'react-native-elements';

const QuestListCard = props => {
  const { cardTitle, questList } = props;

  return (
    <View style={{overflow: 'visible'}}>
      <Card>
        <Text style={styles.header}>{cardTitle}: </Text>
        <Card.Divider />

        { questList?.length < 1
          ? <Text>Nothing to display... yet!</Text>
          : questList?.map((quest, i) => {
            return (
              <View key={i} style={styles.activeQuestList}>
                <Text style={styles.name}>{quest.name}</Text>
              </View>
            );
        })}
      </Card>
    </View>
  );
};

const styles = StyleSheet.create({
  activeQuestList: {},
  name: {
    flexDirection: 'row',
    fontSize: 15,
  },
  header: {
    fontSize: 18,
    color: 'peru'
  }
});

export default QuestListCard;

