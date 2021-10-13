import React from 'react';
import {StyleSheet, Text, View, Image, Button} from 'react-native';
import {Card} from 'react-native-elements';
import {theme} from '../styles/themeProvider';
import {msToDays} from '../utils';

const QuestDetailCard = () => {
  const {color} = theme;
  const isActive = false;
  const buttonText = isActive
    ? 'Remove from active quests'
    : 'Add to active quests';

  const quest = {
    duration: 1000 * 60 * 60 * 24 * 14,
    name: 'Couch to 5K',
    description:
      'Get your lazy booty off of the sofa and kick it into high gear! This quest guides you through the process of building your endurance with a final goal of running a 5K.',
    category: 'mental',
    completionExp: '50',
  };
  const {duration, name, description, category, completionExp} = quest;

  return (
    <Card>
      <View style={styles.container}>
        <Image
          style={styles.image}
          source={require('../assets/activity.png')}
        />

        <View style={styles.textArea}>
          <Text
            style={{fontSize: 18, fontWeight: 'bold', color: color[category]}}>
            {name}
          </Text>
          <Text>
            Duration: {msToDays(duration)} days | EXP: {completionExp}
          </Text>
          <Card.Divider />
          <Text style={{marginBottom: 10}}>{description}</Text>
        </View>
      </View>

      <Button
        color={color[category]}
        title={buttonText}
        onPress={() => console.log('add/remove pressed')}
      />
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
    alignSelf: 'center',
  },
  textArea: {
    flexDirection: 'column',
    paddingLeft: 15,
    flex: 1,
  },
  button: {
    color: '#A73630',
  },
});
