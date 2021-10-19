import React, { useEffect } from 'react';
import {
  ListRenderItem,
  TouchableOpacity,
  Image,
  FlatList,
  ImageSourcePropType,
} from 'react-native';
import {View, Text, StyleSheet, SafeAreaView} from 'react-native';
import {Card, FAB, Icon} from 'react-native-elements';
import {useDispatch, useSelector} from 'react-redux';
import {friendSelector} from '../redux/friendSlice';
import { getQuests } from '../funcs/dispatch/dispatchFuncs'
import { questSelector } from '../redux/questSlice';

interface IQuest {
  category: string;
  completionExp: number;
  createdAt: string;
  description: string;
  duration: number;
  id: number;
  name: string;
  taskCount: number;
  updatedAt: string;
}


//onPress={() => navigation.navigate('OtherUser', {id: item.id})}


const QuestsScreen = ({navigation}) => {
  
  const {quests} = useSelector(questSelector);
  const dispatch = useDispatch();

  useEffect(() => {
    getQuests(dispatch);
  }, []);
  
  const renderItems: ListRenderItem<IQuest> = ({item, index}) => {
    return (
      <>
        <TouchableOpacity onPress={() => navigation.navigate('QuestDetailsScreen', {id: item.id})}>
          
          <Card containerStyle={{flexDirection: 'row'}}>
            <View style={styles.image}>
              <Image
                resizeMode="cover"
                source={require('../assets/friend1.png')}
              />
              <View style={styles.userInfo}>
                <Text style={styles.title}>{item.name}</Text>
                <Text style={styles.level}>Duration {item.duration} days</Text>
                <Text style={styles.level}>Number of Tasks: {item.taskCount}</Text>
              </View>
            </View>
            <Card.Divider
              color={'black'}
              inset={true}
              insetType={'middle'}
              subHeader={item.description}
              subHeaderStyle={styles.text}
            />
          </Card>
        </TouchableOpacity>
      </>
    );
  };
  
  return (
    <SafeAreaView style={{flex: 1, paddingBottom: 45}}>
       <FAB style={{zIndex: 5}} placement="right" color='#6e85ec'  icon={<Icon size={25} name={"add"} color="white"/>}
        onPress={() => navigation.navigate('Create Quest')}
       />
      <View>
        <Text style={styles.title}>Find new Quests!</Text>
       
        
        <FlatList
          data={quests}
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
});

export default QuestsScreen;
