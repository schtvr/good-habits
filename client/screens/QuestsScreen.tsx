import React, {useEffect, useState} from 'react';
import {
  ListRenderItem,
  TouchableOpacity,
  Image,
  FlatList,
  ImageSourcePropType,
} from 'react-native';
<<<<<<< HEAD
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ImageBackground,
  Switch,
} from 'react-native';
import {Card, FAB, Icon, ThemeProvider} from 'react-native-elements';
import {useDispatch, useSelector} from 'react-redux';
import {friendSelector} from '../redux/friendSlice';
import {getQuests} from '../funcs/dispatch/dispatchFuncs';
import {questSelector} from '../redux/questSlice';
import {useIsFocused} from '@react-navigation/core';
import {elementsTheme} from '../styles/react-native-elements-theme-provider';
=======
import {View, Text, StyleSheet, SafeAreaView, ImageBackground} from 'react-native';
import {Card, FAB, Icon, ThemeProvider} from 'react-native-elements';
import {useDispatch, useSelector} from 'react-redux';
import {friendSelector} from '../redux/friendSlice';
import { getQuests } from '../funcs/dispatch/dispatchFuncs'
import { questSelector } from '../redux/questSlice';
import { useIsFocused } from '@react-navigation/core';
import { elementsTheme } from '../styles/react-native-elements-theme-provider'
>>>>>>> 671f78135590e7518ec7174fa5c5bb088f6e1a8c
import QuestDetailCard from '../components/QuestDetailCard';

interface IQuest {
  category: string;
  completionExp: number;
  createdAt: string;
  description: string;
  duration: number;
  id: number;
  name: string;
  taskCount: number;
  updatedAt: string;
}
//'FATJORTS'

const QuestsScreen = ({navigation}) => {
  const isFocused = useIsFocused();
  const dispatch = useDispatch();
  useEffect(() => {
    getQuests(dispatch);
  }, [isFocused]);

  const {quests} = useSelector(questSelector);
  const [isUser, setIsUser] = useState(false);

  const userQuests = quests.filter(quest => quest.author !== 'FATJORTS');
  const templateQuests = quests.filter(quest => quest.author === 'FATJORTS');
  const renderQuests = isUser ? userQuests : templateQuests;

<<<<<<< HEAD
=======


>>>>>>> 671f78135590e7518ec7174fa5c5bb088f6e1a8c
  const renderItems: ListRenderItem<IQuest> = ({item, index}) => {
    console.log('ITEM', item)
    return (
<<<<<<< HEAD
      <>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate('QuestDetailsScreen', {id: item.id})
          }>
          <QuestDetailCard id={item.id}/>
        </TouchableOpacity>
      </>
    );
=======
    <>
      <TouchableOpacity onPress={() => navigation.navigate('QuestDetailsScreen', {id: item.id})}>
        <QuestDetailCard id={item.id} />
      </TouchableOpacity>
     </>
    )
>>>>>>> 671f78135590e7518ec7174fa5c5bb088f6e1a8c
  };

  return (
    <ThemeProvider theme={elementsTheme}>
<<<<<<< HEAD
      <ImageBackground
        style={{flex: 1}}
        source={require('../assets/mauve-stacked-waves-haikei.png')}>
        <SafeAreaView style={{flex: 1}}>
          <FAB
            style={{zIndex: 5}}
            placement="right"
            color={'peru'}
            icon={<Icon size={25} name={'add'} color="white" />}
            onPress={() => navigation.navigate('Create Quest')}
          />
          <View>
            <View style={styles.toggleBox}>
              <Text> Built-In Quests </Text>
              <Switch
                trackColor={{false: 'yellow', true: '#81b0ff'}}
                thumbColor={isUser ? '#2d3c8f' : 'peru'}
                ios_backgroundColor="#3e3e3e"
                onValueChange={() => setIsUser(!isUser)}
                value={isUser}
              />
              <Text>Community Quests </Text>
            </View>
            <FlatList
              data={renderQuests}
              keyExtractor={item => item.id.toString()}
              renderItem={renderItems}
            />
          </View>
        </SafeAreaView>
=======
       <ImageBackground
        style={{flex: 1}}
        source={require('../assets/mauve-stacked-waves-haikei.png')}>
      <SafeAreaView style={{flex: 1}}>
         <FAB style={{zIndex: 5}} placement="right" color={'peru'}  icon={<Icon size={25} name={"add"} color="white"/>}
          onPress={() => navigation.navigate('Create Quest')}
         />
        <View>


          <FlatList
            data={quests}
            keyExtractor={item => item.id.toString()}
            renderItem={renderItems}
          />
        </View>
      </SafeAreaView>
>>>>>>> 671f78135590e7518ec7174fa5c5bb088f6e1a8c
      </ImageBackground>
    </ThemeProvider>
  );
};

const styles = StyleSheet.create({
  title: {
    fontWeight: 'bold',
    fontSize: 22,
  },
  addFriend: {
    fontSize: 22,
    alignSelf: 'center',
    fontWeight: 'bold',
    paddingTop: 20,
  },
  text: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  questName: {
    fontSize: 16,
  },
  level: {
    fontSize: 16,
    paddingLeft: 10,
  },
  image: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  userInfo: {
    flexDirection: 'column',
    marginLeft: 20,
    marginBottom: 10,
  },
  link: {
    color: 'blue',
    alignSelf: 'center',
    paddingTop: 20,
    fontSize: 16,
  },
  toggleBox: {
    flexDirection: 'row',
    height: 20,
    justifyContent: 'center',
    marginTop: 10,

  }
});

export default QuestsScreen;
