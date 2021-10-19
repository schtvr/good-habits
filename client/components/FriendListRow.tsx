import React, {useEffect, useState } from 'react'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import { Card, Avatar } from 'react-native-elements'
import { getToken } from '../funcs/dispatch/dispatchFuncs';
import Config from 'react-native-config';
import { useNavigation } from '@react-navigation/core';
import { useIsFocused } from '@react-navigation/core';

const FriendListRow = ({questId}) => {
  const [activeFriendList, setActiveFriendList] = useState([]);
  const navigation = useNavigation();
  const isFocused = useIsFocused()
    
  useEffect(() => {
    (async () => {
      const res = await fetch(`${Config.LOCALURL}/friendsOnQuest/${questId}`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${await getToken()}`
        }
      });
      const whatever = await res.json();
      console.log('FRIENDS ON QUEST DATA', whatever);
      setActiveFriendList(whatever.data);
    })();
  }, [isFocused]);
  
  if (activeFriendList.length === 0) return (
    <Card>
      <Text>No friends currently on this quest!</Text>
    </Card>
  );
  return (
    <View>
      <Card>
      <View>
        <Text style={{fontWeight: 'bold'}}>Friends currently on this quest:</Text>
        <View style={styles.daddyBezos}>
         {activeFriendList.map(friend => {
            return <View key={`daddyBezos${friend.id}`} style={styles.bezosBois}>
              <TouchableOpacity
                 onPress={() => navigation.navigate('OtherUser', {id: friend.id})}>
                <Avatar 
                  size='large' 
                  rounded 
                  source={{ uri: friend.pfp}}
                />
              </TouchableOpacity>
            </View>
          })}
          </View>
      </View>
      </Card>
    </View>
  );
};

export default FriendListRow

const styles = StyleSheet.create({
  daddyBezos: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginTop: 10 
  },
  bezosBois: {
  }
})
