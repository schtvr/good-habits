import React from 'react';
import {FlatList, ImageSourcePropType} from 'react-native';
import {ListRenderItem, TouchableOpacity, Image} from 'react-native';
import {View, Text, StyleSheet, SafeAreaView} from 'react-native';
import {Card} from 'react-native-elements';
import {useSelector} from 'react-redux';
import {friendSelector} from '../redux/friendSlice';

interface IFriends {
  id: number
  name: string
  completedQuests: []
  activeQuests: []
  quests: []
  url: ImageSourcePropType
  level: number
}

const renderItems: ListRenderItem<IFriends> = ({item, index}) => {
  console.log('BIG ITEM TIME', item);
  // console.log('ITEM', item.id);
  return (
    <>
      <TouchableOpacity>
        <Card>
          <Card.Title style={styles.text}>{item.userName}</Card.Title>
          <Card.Divider
            color={'black'}
            inset={true}
            insetType={'middle'}
            subHeader={`Current Quest: ${item.activeQuests.length > 0 ? 
            item.quests[0].description : 'Not on any quests!'}`}
            subHeaderStyle={styles.text}
          />
          <View style={{flexDirection: 'column'}}>
            <Image
              resizeMode="cover"
              source={require('../assets/friend1.png')}
            />
            <Text>Lvl {Math.floor(item.exp / 100)}</Text>
          </View>
          <View style={{position: 'absolute', left: 100, top: 60}}>
            <Text style={{paddingLeft: 10}}></Text>
            <Text style={styles.text}>Completed Quests: </Text>
          </View>
        </Card>
      </TouchableOpacity>
    </>
  );
};

const SocialScreen = () => {
  const {myFriends, allFriends} = useSelector(friendSelector);

  return (
    <SafeAreaView style={{flex: 1, paddingBottom: 45}}>
      <View>
        <Text style={styles.title}>All Friends!</Text>
        <FlatList
          data={myFriends}
          keyExtractor={item => item.id.toString()}
          renderItem={renderItems}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  title: {
    alignSelf: 'center',
    fontWeight: 'bold',
    fontSize: 24,
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  questName: {
    fontSize: 16,
  },
});

export default SocialScreen;
