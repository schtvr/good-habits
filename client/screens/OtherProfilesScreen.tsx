import React, {useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  ActivityIndicator,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import CompletedStats from '../components/profile/completedStats';
import CuratedTrophies from '../components/profile/curatedTrophies';
import QuestListCard from '../components/QuestListCard';
import ProfileHeader from '../components/profile/profileHeader';
import {
  getAllQuests,
} from '../redux/questSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {getOtherUser, stateSelector} from '../redux/userSlice';
import {addFriend} from '../redux/friendSlice';
import {ThemeProvider, Card, Button} from 'react-native-elements';
import {elementsTheme} from '../styles/react-native-elements-theme-provider';

const OtherProfileScreen = ({route}) => {
  const dispatch = useDispatch();
  const { otherUser, loading } = useSelector(stateSelector);

  const { id } = route.params;
  const getToken = async () => {
    return await AsyncStorage.getItem('token');
  };

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
      getAllQuests({
        api: {
          url: 'quests',
        },
      }),
    );
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
  }

  useEffect(() => {
    populateOtherUser();
  }, [])

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
        source={require('../assets/mauve-stacked-waves-haikei.png')}
      >
      <ThemeProvider theme={elementsTheme}>
      <Card>
        <ProfileHeader
          user={otherUser}/>
        <Button
          title="Send friend request"
          onPress={addAFriend}/>
      </Card>
      <Card>
        <CompletedStats
          exp={otherUser.exp}
          howManyCompletedQuestsYouGotLilBoy={otherUser.complQuests?.length}
        />
        <View style={styles.padder}></View>
        <CuratedTrophies recentAchievements={otherUser.recentAchievements} />
      </Card>
      <QuestListCard
        cardTitle={`${otherUser.userName}'s active quests`}
        questList={otherUser.quests}/>
      <QuestListCard
        cardTitle={`${otherUser.userName}'s previous quests`}
        questList={otherUser.complQuests}/>
        </ThemeProvider>
      </ImageBackground>
    )}
    </View>
  );
};

const styles = StyleSheet.create({
  friendBtn: {
    paddingTop: 10
  },
  padder: {
    marginTop: 8 
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
