import React, {useEffect, useState} from 'react';

import {StyleSheet, Text, View, Image} from 'react-native';
import {Card, Button} from 'react-native-elements';
import theme from '../styles/themeProvider';
import {questSelector} from '../redux/questSlice';
import {useSelector} from 'react-redux';
import {useDispatch} from 'react-redux';
import {getUsersActiveQuests, getToken} from '../funcs/dispatch/dispatchFuncs';
import {addQuest} from '../redux/questSlice';
import VotingPanel from './VotingPanel';

const QuestDetailCard = props => {
  let {quests, activeQuests} = useSelector(questSelector);
  const dispatch = useDispatch();
  const {id} = props;
  const {color} = theme;
  
  const [votes, setVotes] = useState(quests.score);
  quests = quests.filter(quest => quest.id === id)[0];
  activeQuests.length > 0
  ? (activeQuests = activeQuests.filter(quest => quest.id === id))
  : [];
  
  const addToMyQuests = async () => {
    dispatch(
      addQuest({
        api: {
          url: `quest/start/${id}`,
          method: 'POST',
          headers: {
            Authorization: `Bearer ${await getToken()}`,
          },
        },
      }),
      );
    };
    useEffect(() => {
      const getQuestsAndSetIsActive = async () => {
        await getUsersActiveQuests(dispatch);
      };
      getQuestsAndSetIsActive();
    }, []);
    
  const {duration, name, description, category, completionExp, score} = quests;
  const setImage = () => {
    if (category === 'Health')
      return <Image source={require('../assets/heart.png')} />;
    if (category === 'Spiritual')
      return <Image source={require('../assets/spiritual.png')} />;
    if (category === 'Mental')
      return <Image source={require('../assets/mental.png')} />;
    if (category === 'Financial')
      return <Image source={require('../assets/financial.png')} />;
  };
  return (
    <Card>
      <View style={styles.container}>
        {setImage()}

        <View style={styles.textArea}>
          <Text
            style={{fontSize: 18, fontWeight: 'bold', color: color[category]}}>
            {name}
          </Text>
          {quests.author !== 'FATJORTS' && <Text>Created by {quests.author} </Text>}
          <Text>
            Duration: {duration} days | EXP: { votes >= 20 ? 100 : completionExp}
          </Text>
          <Card.Divider />
          <Text style={{marginBottom: 10}}>{description}</Text>
        </View>
      </View>
      {activeQuests.length > 0 ? (
        <Button
          title="Added to quests"
          disabled={true}
          onPress={() => console.log('no good')}
        />
      ) : (
        <Button title="Add to active quests" onPress={addToMyQuests} />
      )}
      {quests.author !== 'FATJORTS' && <View><Card.Divider /><VotingPanel quest={quests} score={votes} vote={setVotes}/></View>}
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
