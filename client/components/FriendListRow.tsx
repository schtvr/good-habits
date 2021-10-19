import React, {useEffect, useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Card, Avatar } from 'react-native-elements'
import { getToken } from '../funcs/dispatch/dispatchFuncs';
import { LOCALURL } from 'react-native-dotenv';

//const LOCALURL = 'http://192.168.0.11:3001';

const FriendListRow = ({questId}) => {
  
  // quest id
  // send request to 
  // /friendsOnQuest/:questId  -> send jwt

  const populateFriendsLists = () => {
    const [activeFriendList, setActiveFriendList] = useState([]);

    // check thru friends' active quests and history
    // or some api thing idk
    useEffect(() => {
      (async () => {
        const res = await fetch(`${LOCALURL}/friendsOnQuest/${questId}`, {
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

  const renderFriendsArray = (friends: any[]) => {
    console.log('FRIENDS LOG', friends[0]);
    if (friends.length === 1) return friends[0].userName;
    if (friends.length === 2) return `${friends[0].userName} and ${friends[1].userName}`
    friends[friends.length-1].userName = `and ${friends[friends.length-1].userName}`
    return friends.join(', ')
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
