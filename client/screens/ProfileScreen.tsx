import React, { useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  ActivityIndicator,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { Card } from 'react-native-elements';
import CompletedStats from '../components/profile/completedStats';
import QuestListCard from '../components/QuestListCard';
import ProfileHeader from '../components/profile/profileHeader';
import { ThemeProvider } from 'react-native-elements';
import { getOtherUser, stateSelector } from '../redux/userSlice';
import { elementsTheme } from '../styles/react-native-elements-theme-provider';
import { getToken } from '../funcs/dispatch/dispatchFuncs';

const ProfileScreen = () => {
  const dispatch = useDispatch();
  const { otherUser, loading, user } = useSelector(stateSelector);
<<<<<<< HEAD
<<<<<<< HEAD
=======
  console.log('USER HERE', user);
>>>>>>> aa5d4cbf0b4ce981127dd3c066d0d362b84eac53
=======
>>>>>>> 6ec1d86afc3493509bbf62a57b974b3e5d0d0a74

  useEffect(() => {
    (async () => {
      dispatch(
        getOtherUser({
          api: {
            url: 'user/' + user.id,
            headers: {
              Authorization: `Bearer ${await getToken()}`,
            },
          },
        }),
      );
    })();
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
          <ThemeProvider theme={elementsTheme}>
            <Card>
              <ProfileHeader user={otherUser} />
            </Card>

            <Card>
              <CompletedStats
                exp={otherUser.exp}
                howManyCompletedQuestsYouGotLilBoy={otherUser.complQuests?.length}
              />
            </Card>
            <QuestListCard
              cardTitle="Your active quests"
              questList={otherUser.quests}
            />
            <QuestListCard
              cardTitle="Your previous quests"
              questList={otherUser.complQuests}
            />
          </ThemeProvider>
        </ImageBackground>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  pfp: {
    flexDirection: 'row',
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

export default ProfileScreen;
