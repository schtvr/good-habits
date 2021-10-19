import React, { useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  ActivityIndicator,
  TouchableOpacity,
  ScrollView
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
import CuratedTrophies from '../components/profile/curatedTrophies';
import { useNavigation } from '@react-navigation/native';

const ProfileScreen = () => {
  const dispatch = useDispatch();
  const { otherUser, loading, user } = useSelector(stateSelector);
  const navigation = useNavigation();

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
            <ScrollView>
          <ThemeProvider theme={elementsTheme}>
            <Card>
              <ProfileHeader user={otherUser} />
            </Card>

            <Card>
              <CompletedStats
                exp={otherUser.exp}
                howManyCompletedQuestsYouGotLilBoy={otherUser.complQuests?.length}
              />
              <View style={styles.padder}></View>
              <CuratedTrophies recentAchievements={otherUser.recentAchievements} />
              <TouchableOpacity onPress={() => navigation.navigate('Achievements')}>
                <Text style={styles.linkText}>Go to achievements</Text>
              </TouchableOpacity>
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
      </ScrollView>
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
  padder: {
    marginTop: 8
  },
  loader: {
    alignSelf: 'center',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  linkText: {
    alignSelf: 'center',
    color: '#2d3c8f',
    marginTop: 5
  },
});

export default ProfileScreen;
