import React, {useState, useEffect} from 'react';
import {StyleSheet, Text, View, Image, Button} from 'react-native';
import {Card} from 'react-native-elements';
import {theme} from '../styles/themeProvider';
import {msToDays} from '../utils';
import {questSelector} from '../redux/questSlice';
import {useSelector} from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useDispatch} from 'react-redux';
import {addQuest, getActiveQuests} from '../redux/questSlice';

const QuestDetailCard = props => {
  const [userToken, setToken] = useState('');
  const dispatch = useDispatch();

  const {id} = props;
  const {color} = theme;
  const [isActive, setIsActive] = useState(true);
  const buttonText = isActive ? 'Add to active quests' : 'Added to quests';

  let {quests, myQuests} = useSelector(questSelector);
  quests = quests.filter(quest => quest.id === id)[0];
  myQuests =
    myQuests.length > 0 ? myQuests.filter(quest => quest.id === id) : [];
  const checkIsActive = () => {
    if (myQuests.length > 0) {
      setIsActive(false);
    }
  };

  const getToken = async () => {
    return await AsyncStorage.getItem('token');
  };

  const addToMyQuests = async () => {
    setIsActive(false);
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

  const getUsersActiveQuests = async () => {
    dispatch(
      getActiveQuests({
        api: {
          url: `quest/getActiveQuests`,
          headers: {
            Authorization: `Bearer ${await getToken()}`,
          },
        },
      }),
    );
  };

  useEffect(() => {
    const getQuestsAndSetIsActive = async () => {
      await getUsersActiveQuests();
      checkIsActive();
    };
    getQuestsAndSetIsActive();
  }, [isActive]);

  const {duration, name, description, category, completionExp} = quests;
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
            Duration: {duration} days | EXP: {completionExp}
          </Text>
          <Card.Divider />
          <Text style={{marginBottom: 10}}>{description}</Text>
        </View>
      </View>
      <Button
        color={color[category]}
        title={buttonText}
        onPress={addToMyQuests}
        disabled={!isActive}
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
