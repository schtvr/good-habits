import React from 'react';
import {StyleSheet, Text, View, Image} from 'react-native';
import {Card, Icon, Button} from 'react-native-elements';
import QuestCard from './QuestListCard';

const QuestDetailCard = () => {

  const isActive = true;

  return (
    <Card>
      <View style={styles.container}>
        <Image style={styles.image} source={require('../assets/avatar.png')} />

        <View style={styles.textArea}>
          <Text style={{fontSize: 18}} >name</Text>
          <Text>Duration: duration  |  EXP: EXP</Text>
          <Text style={{marginBottom: 10}}>description</Text>
        </View>

      </View>

      { isActive ?
        <Button title='Remove from active quests'/>
        : <Button title='Add to active quests'/>
      }
    </Card>
  );
};

export default QuestDetailCard;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
  image: {
    width: 60,
    height: 60,
  },
  textArea: {
    flexDirection: 'column',
    paddingLeft: 15,
  },

});
