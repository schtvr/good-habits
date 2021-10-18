import React, { useEffect, useState } from 'react';
import {
  ListRenderItem,
  TouchableOpacity,
  Image,
  FlatList,
  ImageSourcePropType,
  ImageBackground,
} from 'react-native';
import {View, StyleSheet, SafeAreaView} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {friendSelector} from '../redux/friendSlice';
import { getQuests } from '../funcs/dispatch/dispatchFuncs'
import { questSelector } from '../redux/questSlice';
import { elementsTheme } from '../styles/react-native-elements-theme-provider';
import {Input, Text, Button, Card, ThemeProvider} from 'react-native-elements';

interface IQuestCreation {
  duration: string;
  name: string;
  description: string;
  category: string;
  completionExp: number;
  taskCount: number;
} 


const CreateAQuestScreen = ({navigation}) => {
  const [questCreated, setQuestCreated] = useState(false);
  const [questForm, setQuestForm] = useState({
    duration: '',
    name: '',
    description: '',
    category: '',
    completionExp: 0,
    taskCount: 0,
  })
  const {quests} = useSelector(questSelector);
  const dispatch = useDispatch();

  useEffect(() => {
    getQuests(dispatch);
  }, []);

  
  return (
    <View style={styles.container}>
      <ImageBackground
        style={{flex: 1}}
        source={require('../assets/mauve-stacked-waves-haikei.png')}>

        <ThemeProvider theme={elementsTheme}>
          {!questCreated ? (
            <View>
              <Card containerStyle={{marginTop: 50}}>
                <Text h4 h4Style={styles.headerTitle}>
                  Create a new Quest!
                </Text>
              </Card>
              <Card>
                <Input
                  leftIcon={{type: 'fontisto', name: 'person',color: '#6071d5'}}
                  placeholder="duration"
                  value={questForm.duration}
                  onChangeText={duration => setQuestForm({...questForm, duration})}
                  autoCorrect={false}
                  autoCapitalize="none"
                />
                <Input
                  leftIcon={{type: 'fontisto', name: 'at',color: '#6071d5'}}
                  placeholder="name"
                  value={questForm.name}
                  onChangeText={name => setQuestForm({...questForm, name})}
                  autoCorrect={false}
                  autoCapitalize="none"
                />
                <Input
                  leftIcon={{type: 'fontisto', name: 'unlocked',color: '#6071d5',}}
                  placeholder="description"
                  value={questForm.description}
                  onChangeText={description => setQuestForm({...questForm, description})}
                  autoCorrect={false}
                  autoCapitalize="none"
                />
                <Input
                  leftIcon={{type: 'fontisto', name: 'unlocked',color: '#6071d5',}}
                  placeholder="category"
                  value={questForm.category}
                  onChangeText={category => setQuestForm({...questForm, category})}
                  autoCorrect={false}
                  autoCapitalize="none"
                />
                <Input
                  leftIcon={{type: 'fontisto', name: 'unlocked',color: '#6071d5',}}
                  placeholder="category"
                  value={questForm.category}
                  onChangeText={category => setQuestForm({...questForm, category})}
                  autoCorrect={false}
                  autoCapitalize="none"
                />
                <Button
                  title="Next"
                  onPress={() => setQuestCreated(true)}
                  buttonStyle={styles.btnStyle}
                /> 
              </Card>
            </View>
          ):(
            <Card containerStyle={{marginTop: 50}}>
              <Text h4 h4Style={styles.headerTitle}>
                Add the Tasks to your Quest!
              </Text>
            </Card>
          )}
        </ThemeProvider>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  bg: {
    flex: 1,
  },
  headerTitle: {
    alignSelf: 'center',
    color: '#2d3c8f',
  },
  link: {
    color: '#2d3c8f',
    fontWeight: 'bold',
    alignSelf: 'center',
    marginTop: 10,
  },
  btnStyle: {
    width: 150,
    alignSelf: 'center',
  },
  test: {
    flex: 1,
  },
});

export default CreateAQuestScreen;
