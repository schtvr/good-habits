import React, {useEffect, useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Card, Avatar } from 'react-native-elements'
import { getToken } from '../funcs/dispatch/dispatchFuncs';
import Config from 'react-native-config';

const FriendListRow = ({questId}) => {
  const populateFriendsLists = () => {
    const [activeFriendList, setActiveFriendList] = useState([]);

    useEffect(() => {
      (async () => {
        const res = await fetch(`${Config.LOCALURL}/friendsOnQuest/${questId}`, {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${await getToken()}`
          }
        });
        const whatever = await res.json();
        setActiveFriendList(whatever.data);
      })();
    }, []);
    

    if (activeFriendList.length < 1) return;
    return (
      <Card>
        { activeFriendList.length > 0 ? renderFriendsList(activeFriendList) : '' }
      </Card>
    )
  }

  const renderFriendsList = (friends: any[]) => {
    return (
      <View>
          <Text style={{fontWeight: 'bold'}}>Friends currently this quest:</Text>
          <View style={styles.daddyBezos}>
          {friends.map(friend => {
            return <Avatar 
              size='large' 
              key={`daddyBezos${friend.id}`} 
              rounded 
              source={{ uri: friend.pfp}}
            />
          })}
          </View>
      </View>
    )
  }

  return (
    <View>
      {populateFriendsLists()}
    </View>
  )
}

export default FriendListRow

const styles = StyleSheet.create({
  daddyBezos: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 10 
  }
})
