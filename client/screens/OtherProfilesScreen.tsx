import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  ActivityIndicator,
  ScrollView,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import CompletedStats from '../components/profile/completedStats';
import CuratedTrophies from '../components/profile/curatedTrophies';
import QuestListCard from '../components/QuestListCard';
import ProfileHeader from '../components/profile/profileHeader';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {getOtherUser, stateSelector} from '../redux/userSlice';
import { friendSelector } from '../redux/friendSlice';
import {addFriend} from '../redux/friendSlice';
import {ThemeProvider, Card, Button} from 'react-native-elements';
import {elementsTheme} from '../styles/react-native-elements-theme-provider';

const OtherProfileScreen = ({route, navigation}) => {
  const dispatch = useDispatch();
  const {otherUser, loading} = useSelector(stateSelector);
  const { myFriends } = useSelector(friendSelector);
  const [isFriend, setIsFriend] = useState(true);
  console.log(myFriends);

  const {id, title} = route.params;
  const getToken = async () => {
    return await AsyncStorage.getItem('token');
  };
  
  useEffect(() => {
    for (const friend of myFriends) {
      if (friend.id === id) {
        setIsFriend(false);
      }
    }
  }, []);

  const addAFriend = async () => {
    dispatch(
      addFriend({
        api: {
          method: 'PUT',
          url: `user/friendRequest/${id}`,
          headers: {
            Authorization: `Bearer ${await getToken()}`,
          },
        },
      }),
    );
  };

  const populateOtherUser = async () => {
    dispatch(
      getOtherUser({
        api: {
          url: 'user/' + id,
          headers: {
            Authorization: `Bearer ${await getToken()}`,
          },
        },
      }),
    );
  };

  useEffect(() => {
    populateOtherUser();
    navigation.setOptions({title});
  }, []);

  return (
    <View style={{flex: 1}}>
      {loading ? (
        <View style={styles.loaderContainer}>
          <Text style={styles.loader}>Loading...</Text>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      ) : (
        <ImageBackground
          style={{flex: 1}}
          source={require('../assets/mauve-stacked-waves-haikei.png')}>
          <ScrollView>
            <ThemeProvider theme={elementsTheme}>
              <Card>
                <ProfileHeader user={otherUser} />
                <Button 
                title={ isFriend 
                  ? "Send friend request" 
                  : `${otherUser.userName} is already your friend!`
                }
                onPress={addAFriend}
                disabled={!isFriend}/>
              </Card>
              <Card>
                <CompletedStats
                  exp={otherUser.exp}
                  howManyCompletedQuestsYouGotLilBoy={
                    otherUser.complQuests?.length
                  }
                />
                <View style={styles.padder}></View>
                <CuratedTrophies
                  recentAchievements={otherUser.recentAchievements}
                />
              </Card>
              <QuestListCard
                cardTitle={`${otherUser.userName}'s active quests`}
                questList={otherUser.quests}
              />
              <QuestListCard
                cardTitle={`${otherUser.userName}'s previous quests`}
                questList={otherUser.complQuests}
              />
            </ThemeProvider>
          </ScrollView>
        </ImageBackground>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  friendBtn: {
    paddingTop: 10,
  },
  padder: {
    marginTop: 8,
  },
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

export default OtherProfileScreen;
