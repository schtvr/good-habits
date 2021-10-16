import React, {useState, useEffect} from 'react';
import {StyleSheet, View} from 'react-native';
import QuestDetailCard from '../components/QuestDetailCard';
import QuestListCard from '../components/QuestListCard';
import FriendListRow from '../components/FriendListRow';
import {useDispatch, useSelector} from 'react-redux';
import {getAllTasks, questSelector, questSlice} from '../redux/questSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';

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
    <View>
      <QuestDetailCard id={id} />
      <FriendListRow />
      <QuestListCard questList={tasks} />
    </View>
  );
};

const styles = StyleSheet.create({});

export default QuestDetailsScreen;
