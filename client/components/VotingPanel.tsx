import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialIcons';
import { sendVote } from '../funcs/dispatch/dispatchFuncs';

const VotingPanel = ({quest, vote, score}) => {
  const dispatch = useDispatch()
  const [flag, setFlag] = useState(0);


  const handleVote = (vote, questId) => {
    if (flag === vote)  return
    sendVote(dispatch, vote, questId);
    setFlag(vote)
  }

  return (
    <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
      <TouchableOpacity onPress={() => vote(1, quest.id)}>
        <MaterialCommunityIcons
          style={styles.icons}
          name="thumb-up"
          size={26}
        />
      </TouchableOpacity>
      <Text>Current score: {score}</Text>
      <TouchableOpacity onPress={() => vote(-1, quest.id)}>
        <MaterialCommunityIcons
          style={styles.icons}
          name="thumb-down"
          size={26}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  icons: {
    margin: 10,
  },
});

export default VotingPanel;
