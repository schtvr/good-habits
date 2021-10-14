import React from 'react';
import {View, Text, StyleSheet, ScrollView} from 'react-native';
import {Card, ListItem, Button, Icon} from 'react-native-elements';

const QuestListCard = props => {
  const {questList} = props;
  // console.log('questcard', questList);

  return (
    <ScrollView>
      <Card>
        <Text>Task List: </Text>
        <Card.Divider />

        {questList.map((quest, i) => {
          return (
            <View key={i} style={styles.activeQuestList}>
              <Text style={styles.name}>{quest.name}</Text>
              <Text>{quest.description}</Text>
            </View>
          );
        })}
      </Card>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  activeQuestList: {},
  name: {
    flexDirection: 'row',
  },
});

export default QuestListCard;
/*

    <Image
      style={styles.image}
      resizeMode="cover"
      source={{ uri: quest.avatar }}
    />
*/
