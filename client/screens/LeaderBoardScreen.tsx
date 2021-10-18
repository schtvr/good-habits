import React, {useState, useEffect} from 'react';
import { View, Text, StyleSheet, Switch, ImageBackground } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { DataTable, Provider as PaperProvider} from 'react-native-paper';
import {
  stateSelector,
  getAllRanking,
  getFriendRanking,
} from '../redux/userSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Card, ThemeProvider } from 'react-native-elements'
import { elementsTheme } from '../styles/react-native-elements-theme-provider';

const LeaderBoardScreen = () => {
  const [isGlobal, setIsGlobal] = useState(true);
  const toggleSwitch = () => setIsGlobal(previousState => !previousState);
  const {globalRankings, friendRankings} = useSelector(stateSelector);
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
  const getFriendRankings = async () => {
    dispatch(
      getFriendRanking({
        api: {
          url: 'leaderboards/friends',
          headers: {
            Authorization: `Bearer ${await getToken()}`,
          },
        },
      }),
    );
  };

  useEffect(() => {
    getGlobalRankings();
    getFriendRankings();
  }, []);

  const makeList = players => {
    return players.sort((b, a) => a.level - b.level).slice(0, 10);
  };

  const playerList = isGlobal
    ? makeList([...globalRankings])
    : makeList([...friendRankings]);

  return (
    <View style={styles.body}>
      <ImageBackground
        style={{flex: 1}}
        source={require('../assets/mauve-stacked-waves-haikei.png')}
      >
        <ThemeProvider theme={elementsTheme}>
          <Card>
            <View style={styles.titleContainer}>
              {isGlobal ? (
                <Text style={styles.title}>Global Leaderboard</Text>
              ) : (
                <Text style={styles.title}>Friends Leaderboard</Text>
              )}
              <Switch
                style={styles.switch}
                trackColor={{false: '#6071d5', true: '#6071d5'}}
                thumbColor={isGlobal ? '#2d3c8f' : '#2d3c8f'}
                onValueChange={toggleSwitch}
                value={isGlobal}
              />
            </View>
          </Card>
          <View style={styles.tableContainer}>
            <Card>
              <DataTable style={{ borderRadius: 12}}>
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
            </Card>
          </View>
        </ThemeProvider>
      </ImageBackground>
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
    fontSize: 22,
    color: '#111',
  },
  titleContainer: {
    flexDirection: 'column',
  },
  tableContainer: {
    paddingHorizontal: 0,
  },
  switch: {
    alignSelf: 'center',
    justifyCenter: 'center',
  },
});

export default LeaderBoardScreen;
