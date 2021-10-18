import React, { useEffect} from 'react';
import { StyleSheet, View, ImageBackground } from 'react-native';
import { ThemeProvider } from 'react-native-elements'
import QuestDetailCard from '../components/QuestDetailCard';
import QuestListCard from '../components/QuestListCard';
import FriendListRow from '../components/FriendListRow';
import {useDispatch, useSelector} from 'react-redux';
import { getAllTasks, questSelector } from '../redux/questSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { elementsTheme } from '../styles/react-native-elements-theme-provider';

const QuestDetailsScreen = ({route}) => {
  const dispatch = useDispatch();

  let {tasks} = useSelector(questSelector);
  const {id} = route.params;

  useEffect(() => {
    const getTasks = async () => {
      await getTasksByid();
    };
    getTasks();
  }, []);

  const getToken = async () => {
    return await AsyncStorage.getItem('token');
  };

  const getTasksByid = async () => {
    dispatch(
      getAllTasks({
        api: {
          url: `task/quest/${id}`,
          headers: {
            Authorization: `Bearer ${await getToken()}`,
          },
        },
      }),
    );
  };
  return (
    <View style={{flex: 1}}>
      <ThemeProvider theme={elementsTheme}>
      <ImageBackground
        style={{flex: 1}}
        source={require('../assets/mauve-stacked-waves-haikei.png')}
      >
        <QuestDetailCard id={id} />
        <FriendListRow />
        <QuestListCard questList={tasks} />
        </ImageBackground>
      </ThemeProvider>
    </View>
  );
};

const styles = StyleSheet.create({});

export default QuestDetailsScreen;
