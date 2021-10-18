import React, {useState, useEffect} from 'react';
import {StyleSheet, View, ActivityIndicator, Text} from 'react-native';
import QuestDetailCard from '../components/QuestDetailCard';
import QuestListCard from '../components/QuestListCard';
import FriendListRow from '../components/FriendListRow';
import {useDispatch, useSelector} from 'react-redux';
import {getAllTasks, questSelector, questSlice} from '../redux/questSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {stateSelector} from '../redux/userSlice';

const QuestDetailsScreen = ({route}) => {
  const dispatch = useDispatch();

  let {tasks} = useSelector(questSelector);
  const {loading} = useSelector(stateSelector);
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
      {loading ? (
        <View style={styles.loaderContainer}>
          <Text style={styles.loader}>Loading...</Text>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      ) : (
        <>
          <QuestDetailCard id={id} />
          <FriendListRow />
          <QuestListCard questList={tasks} />
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  loaderContainer: {
    marginTop: 100,
  },
  loader: {
    alignSelf: 'center',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
  },
});

export default QuestDetailsScreen;
