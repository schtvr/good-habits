import React, {useState} from 'react';
import {View, Text, StyleSheet, FlatList, Image} from 'react-native';
import {Card, Button} from 'react-native-elements';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/core';
import ButtonComponent from './ButtonComponent';

const OtherQuest = ({quests, id, title}) => {
  const dispatch = useDispatch();

  const navigation = useNavigation();
  const [boolean, setBoolean] = useState(false);

  const filteredQuests = quests.filter(quest => quest.id === id)[0];
  const category = filteredQuests.category;
  const otherQuests = quests.filter(
    quest => quest.category === category && quest.name !== title,
  );

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
    <>
      {otherQuests.length > 0 ? (
        <>
          <Text style={styles.text}>Other quests in this category</Text>
          <FlatList
            data={otherQuests}
            keyExtractor={item => item.id.toString()}
            renderItem={({item}) => {
              return (
                <Card>
                  <View style={styles.container}>
                    {setImage()}
                    <View style={styles.textArea}>
                      <Text
                        style={{
                          fontSize: 18,
                          fontWeight: 'bold',
                        }}>
                        {item.name}
                      </Text>
                      {item.author === 'FATJORTS' ? (
                        <Text>Official Quest</Text>
                      ) : (
                        <Text>Created By: {item.author}</Text>
                      )}
                      <Text>
                        Duration: {item.duration} days | EXP:{' '}
                        {item.completionExp}
                      </Text>
                      <Card.Divider />
                      <Text style={{marginBottom: 10}}>{item.description}</Text>
                    </View>
                  </View>
                  <ButtonComponent item={item} />
                </Card>
              );
            }}
          />
        </>
      ) : null}
    </>
  );
};

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
  text: {
    fontSize: 24,
    alignSelf: 'center',
    fontWeight: 'bold',
    paddingVertical: 10,
  },
  quests: {
    fontSize: 20,
    alignSelf: 'center',
    fontWeight: 'bold',
    // paddingVertical: 10,
  },
  link: {
    fontSize: 18,
    alignSelf: 'center',
    fontWeight: 'bold',
    paddingTop: 10,
    color: 'blue',
  },
});

export default OtherQuest;
