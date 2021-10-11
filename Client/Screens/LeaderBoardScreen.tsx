import React, {useState} from 'react';
import {View, Text, StyleSheet, Switch} from 'react-native';
import { DataTable } from 'react-native-paper';

const friends = [
  {
    id: 1,
    name: 'Sean',
    playerLvl: 5,
  },
  {id: 2, name: 'Steve', playerLvl: 6},
  {
    id: 3,
    name: 'Juan',
    playerLvl: 7,
  },
];

const globalPlayers = [
  {
    id: 1,
    name: 'DogshitTunic',
    playerLvl: 798
  },
  {id: 2, name: 'SteveRodgers', playerLvl: 654},
  {
    id: 3,
    name: 'JuanValdez',
    playerLvl: 1056,
  },
];

const LeaderBoardScreen = () => {
  const [isGlobal, setIsGlobal] = useState(true);
  const toggleSwitch = () => setIsGlobal(previousState => !previousState);

  const makeList = (players) => {
    return players.sort((b, a) => a.playerLvl - b.playerLvl).slice(0, 3);
  }

  const playerList = isGlobal ? makeList([...globalPlayers]) : makeList([...friends]);

  return (
    <View style={styles.body}>
      <View style={styles.titleContainer}>
        {(isGlobal)
          ? <Text style={styles.title}>Global Leaderboard</Text>
          : <Text style={styles.title}>Friends Leaderboard</Text>
        }
        <Switch style={styles.switch}
          trackColor={{ false: "#00d9ff", true: "#029400" }}
          thumbColor={isGlobal ? "#016300" : "#0085b5"}
          onValueChange={toggleSwitch}
          value={isGlobal}
        />
      </View>
      <View style={styles.tableContainer}>
        <DataTable>
          <DataTable.Header>
              <DataTable.Title>Position</DataTable.Title>
              <DataTable.Title>Id</DataTable.Title>
              <DataTable.Title>User</DataTable.Title>
              <DataTable.Title numeric>Lvl</DataTable.Title>
          </DataTable.Header>

          {playerList.map((player, index) => 
          {
            return (
            <DataTable.Row key={player.id}>
              <DataTable.Cell>{index+1}</DataTable.Cell>
              <DataTable.Cell>{player.id}</DataTable.Cell>
              <DataTable.Cell>{player.name}</DataTable.Cell>
              <DataTable.Cell numeric>{player.playerLvl}</DataTable.Cell>
            </DataTable.Row>)
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
