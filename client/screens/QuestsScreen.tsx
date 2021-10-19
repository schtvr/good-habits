import React, { useEffect } from 'react';
import {
  ListRenderItem,
  TouchableOpacity,
  Image,
  FlatList,
  ImageSourcePropType,
} from 'react-native';
import {View, Text, StyleSheet, SafeAreaView, ImageBackground} from 'react-native';
import {Card, FAB, Icon, ThemeProvider} from 'react-native-elements';
import {useDispatch, useSelector} from 'react-redux';
import {friendSelector} from '../redux/friendSlice';
import { getQuests } from '../funcs/dispatch/dispatchFuncs'
import { questSelector } from '../redux/questSlice';
import { useIsFocused } from '@react-navigation/core';
import { elementsTheme } from '../styles/react-native-elements-theme-provider'
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

const QuestsScreen = ({navigation}) => {
  const isFocused = useIsFocused();
  useEffect(() => {
    getQuests(dispatch);
  }, [isFocused]);

  const {quests} = useSelector(questSelector);
  const dispatch = useDispatch();



  const renderItems: ListRenderItem<IQuest> = ({item, index}) => {
    console.log('ITEM', item)
    return (
    <>
      <TouchableOpacity onPress={() => navigation.navigate('QuestDetailsScreen', {id: item.id})}>
        <QuestDetailCard id={item.id} />
      </TouchableOpacity>
     </>
    )
  };

  return (
    <ThemeProvider theme={elementsTheme}>
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
});

export default QuestsScreen;
