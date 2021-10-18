import React from 'react';
import {
  ListRenderItem,
  TouchableOpacity,
  Image,
  FlatList,
  ImageSourcePropType,
} from 'react-native';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ImageBackground,
  ActivityIndicator,
} from 'react-native';
import {Card, ThemeProvider} from 'react-native-elements';
import {useSelector} from 'react-redux';
import {friendSelector} from '../redux/friendSlice';
import {stateSelector} from '../redux/userSlice';
import {elementsTheme} from '../styles/react-native-elements-theme-provider';

interface IFriends {
  id: number;
  name: string;
  completedQuests: [];
  activeQuests: [];
  quests: [];
  url: ImageSourcePropType;
  level: number;
}

const renderItems: ListRenderItem<IFriends> = ({item, index}) => {
  return (
    <>
      <TouchableOpacity>
        <Card containerStyle={{flexDirection: 'row'}}>
          <View style={styles.image}>
            <Image
              resizeMode="cover"
              source={require('../assets/friend1.png')}
            />
            <View style={styles.userInfo}>
              <Text style={styles.title}>{item.userName}</Text>
              <Text style={styles.level}>Lvl {Math.floor(item.exp / 100)}</Text>
            </View>
          </View>
          <Card.Divider
            color={'black'}
            inset={true}
            insetType={'middle'}
            subHeader={`Current Quest: ${
              item.activeQuests.length > 0
                ? item.quests[0].description
                : 'Not on any quests!'
            }`}
            subHeaderStyle={styles.text}
          />
        </Card>
      </TouchableOpacity>
    </>
  );
};

const SocialScreen = ({navigation}) => {
  const {myFriends, allFriends} = useSelector(friendSelector);
  const {loading} = useSelector(stateSelector);

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
          resizeMode="stretch">
          <ThemeProvider theme={elementsTheme}>
            {myFriends.length > 0 ? (
              <View>
                <Text style={styles.title}>All Friends!</Text>
                <FlatList
                  data={myFriends}
                  keyExtractor={item => item.id.toString()}
                  renderItem={renderItems}
                />
              </View>
            ) : (
              <>
                <Text style={styles.addFriend}>
                  Try sending a friend request!
                </Text>
                <TouchableOpacity onPress={() => navigation.navigate('Search')}>
                  <Text style={styles.link}>Go to friend page!</Text>
                </TouchableOpacity>
              </>
            )}
          </ThemeProvider>
        </ImageBackground>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    alignSelf: 'center',
    fontWeight: 'bold',
    fontSize: 22,
  },
  addFriend: {
    fontSize: 22,
    alignSelf: 'center',
    fontWeight: 'bold',
    paddingTop: 20,
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  questName: {
    fontSize: 16,
  },
  level: {
    fontSize: 16,
    fontWeight: 'bold',
    paddingLeft: 10,
    paddingTop: 10,
  },
  image: {
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
  },
  userInfo: {
    flexDirection: 'column',
    marginLeft: 20,
    marginBottom: 10,
  },
  link: {
    color: 'blue',
    alignSelf: 'center',
    paddingTop: 20,
    fontSize: 16,
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

export default SocialScreen;
