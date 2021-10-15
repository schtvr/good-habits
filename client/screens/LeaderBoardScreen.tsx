import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, Switch} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {DataTable} from 'react-native-paper';
import {
  stateSelector,
  getAllRanking,
  getFriendRanking,
} from '../redux/userSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';

const friends = [
  {
    id: 1,
    userName: 'Sean',
    level: 5,
  },
  {id: 2, userName: 'Steve', level: 6},
  {
    id: 3,
    userName: 'Juan',
    level: 7,
  },
];

const LeaderBoardScreen = () => {
  const [isGlobal, setIsGlobal] = useState(true);
  const toggleSwitch = () => setIsGlobal(previousState => !previousState);
  const {globalRankings} = useSelector(stateSelector);
  const dispatch = useDispatch();
  const getToken = async () => {
    return await AsyncStorage.getItem('token');
  };

  const getGlobalRankings = async () => {
    dispatch(
      getAllRanking({
        api: {
          url: 'leaderboards',
          headers: {
            Authorization: `Bearer ${await getToken()}`,
          },
        },
      }),
    );
  };

  useEffect(() => {
    getGlobalRankings();
  }, []);

  const makeList = players => {
    return players.sort((b, a) => a.level - b.level).slice(0, 10);
  };

  const playerList = isGlobal
    ? makeList([...globalRankings])
    : makeList([...friends]);

  return (
    <View style={styles.body}>
      <View style={styles.titleContainer}>
        {isGlobal ? (
          <Text style={styles.title}>Global Leaderboard</Text>
        ) : (
          <Text style={styles.title}>Friends Leaderboard</Text>
        )}
        <Switch
          style={styles.switch}
          trackColor={{false: '#00d9ff', true: '#029400'}}
          thumbColor={isGlobal ? '#016300' : '#0085b5'}
          onValueChange={toggleSwitch}
          value={isGlobal}
        />
      </View>
      <View style={styles.tableContainer}>
        <DataTable>
          <DataTable.Header>
            <DataTable.Title>Position</DataTable.Title>
            <DataTable.Title>User</DataTable.Title>
            <DataTable.Title numeric>Exp</DataTable.Title>
          </DataTable.Header>

          {playerList.map((player, index) => {
            return (
              <DataTable.Row key={player.id}>
                <DataTable.Cell>{index + 1}</DataTable.Cell>
                <DataTable.Cell>{player.userName}</DataTable.Cell>
                <DataTable.Cell numeric>{player.exp}</DataTable.Cell>
              </DataTable.Row>
            );
          })}
        </DataTable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  body: {
    flex: 1,
    backgroundColor: '#001845',
    color: 'white',
  },
  title: {
    alignSelf: 'center',
    paddingBottom: 20,
    fontSize: 22,
    color: '#979dac',
  },
  titleContainer: {
    flexDirection: 'column',
    paddingTop: 20,
  },
  tableContainer: {
    paddingHorizontal: 20,
    backgroundColor: '#e0e0e0',
    margin: 20,
  },
  switch: {
    alignSelf: 'center',
    justifyCenter: 'center',
  },
});

export default LeaderBoardScreen;
