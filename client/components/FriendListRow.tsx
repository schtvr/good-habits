import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Card } from 'react-native-elements'

const FriendListRow = () => {

  const populateFriendsLists = () => {
    const activeFriendList = [];
    const historyFriendList = [];

    // check thru friends' active quests and history
    // or some api thing idk
    
    activeFriendList.push('Spike','Jet','Faye');
    historyFriendList.push('Ed','Ein');

    if (activeFriendList.length < 1 && historyFriendList.length < 1) return;
    return (
      <Card>
        { activeFriendList.length > 0 ? renderFriendsList(activeFriendList, true) : '' }
        <Card.Divider style={{paddingTop: 15}}/>
        { historyFriendList.length > 0 ? renderFriendsList(historyFriendList, false) : '' }
      </Card>
    )
  }

  const renderFriendsArray = (friends: string[]) => {
    if (friends.length === 1) return friends[0];
    if (friends.length === 2) return `${friends[0]} and ${friends[1]}`
    friends[friends.length-1] = `and ${friends[friends.length-1]}`
    return friends.join(', ')
  }

  const renderFriendsList = (friends: any[], isCurrent: boolean) => {
    return (
      <View>
          <Text>Friends { isCurrent ? 'currently on' : 'who\'ve completed' } this quest:</Text>
          <Text>{ renderFriendsArray(friends) }</Text>
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

const styles = StyleSheet.create({})
