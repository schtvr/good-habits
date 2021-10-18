import React, { useEffect, useState } from 'react';
import {
  ListRenderItem,
  TouchableOpacity,
  Image,
  FlatList,
  ImageSourcePropType,
  ImageBackground,
} from 'react-native';
import {View, ScrollView, StyleSheet, SafeAreaView} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {friendSelector} from '../redux/friendSlice';
import { getQuests } from '../funcs/dispatch/dispatchFuncs'
import { questSelector } from '../redux/questSlice';
import { elementsTheme } from '../styles/react-native-elements-theme-provider';
import {Input, Text, Button, Card, ThemeProvider, Slider} from 'react-native-elements';
import { PrivateValueStore } from '@react-navigation/core';
import {Calendar, CalendarList, Agenda} from 'react-native-calendars';

interface IQuestCreation {
  duration: string
  name: string
  description: string
  category: string
  completionExp: number
  taskCount: number
  taskArr: ITaskCreation[]
} 

interface ITaskCreation {
  name: string
  description: string
  day: number
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
    taskArr: [],
  })

  const [Tasks, setTasks] = useState([]);
  const taskTemplate: ITaskCreation = {
    name: '',
    description: '',
    day: 0, 
  }
  
  const [singleTask, setSingleTask] = useState({...taskTemplate})
  const dispatch = useDispatch();

  useEffect(() => {
  }, []);

  
/*calendaar logic>
//calendar markings Obj: {
  markings{
  [startDate]: {selected: true, marked: true, selectedColor: '#6071d5'}, 
  [endDate]: {selected: true, marked: true, selectedColor: '#6071d5'}, 
  [selectedDates]: shaded
  }
  prev date: prev date
}

on press =>
 delete prev date property
 add new current date property
 set Task date to selected date
 
on crate task button press =>
  push task to quest
  set task date property on markings obj
*/

const addDates = ((duration) => {
  const dur = parseInt(duration)+1;
  let str = '2021-09-' + dur.toString()
  return str;
})


const [calendarMarks, setCalendarMarks] = useState({
  markings: {
    '2021-09-01': {selected: true, selectedColor: '#6071d5'},
  },
  prevDate: ''
}
)

const handleChange = () => {
  setCalendarMarks({
    ...calendarMarks, 
    markings: {
      '2021-09-01': {selected: true, selectedColor: '#6071d5'},
      [addDates(questForm.duration)]: {selected: true, selectedColor: '#6071d5'},
    },
    prevDate: '',
  })
  setQuestCreated(true);
}

const selectDay = (date) => {
  if (calendarMarks.prevDate) delete calendarMarks.markings[calendarMarks.prevDate]; 
  setCalendarMarks({
    ...calendarMarks, 
    markings: {
      '2021-09-01': {selected: true, selectedColor: '#6071d5'},
      [addDates(questForm.duration)]: {selected: true, selectedColor: '#6071d5'},
      [date.dateString]: {selected: true, selectedColor: 'grey'},
     },
    prevDate: date.dateString,
  })
}

  
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
                  leftIcon={{type: 'fontisto', name: 'clock',color: '#6071d5'}}
                  placeholder="duration"
                  keyboardType='numeric'
                  value={questForm.duration}
                  onChangeText={duration => setQuestForm({...questForm, duration})}
                  autoCorrect={false}
                  autoCapitalize="none"
                />
                <Input
                  leftIcon={{type: 'fontisto', name: 'compass',color: '#6071d5'}}
                  placeholder="name"
                  value={questForm.name}
                  onChangeText={name => setQuestForm({...questForm, name})}
                  autoCorrect={false}
                  autoCapitalize="none"
                />
                <Input
                  leftIcon={{type: 'fontisto', name: 'at',color: '#6071d5',}}
                  placeholder="description"
                  value={questForm.description}
                  onChangeText={description => setQuestForm({...questForm, description})}
                  autoCorrect={false}
                  autoCapitalize="none"
                />
                <Input
                  leftIcon={{type: 'fontisto', name: 'map', color: '#6071d5',}}
                  placeholder="category"
                  value={questForm.category}
                  onChangeText={category => setQuestForm({...questForm, category})}
                  autoCorrect={false}
                  autoCapitalize="none"
                />
                <Button
                  title="Next"
                  onPress={() => handleChange()}
                  buttonStyle={styles.btnStyle}
                /> 
              </Card>
            </View>
          ):(
            <ScrollView>
              <Card containerStyle={{marginTop: 50}}>
                <Text h4 h4Style={styles.headerTitle}>
                  Add the Tasks to your Quest!
                </Text>
              </Card>
              <Card>
                <Input
                  leftIcon={{type: 'fontisto', name: 'at',color: '#6071d5'}}
                  placeholder="Task name"
                  value={singleTask.name}
                  onChangeText={name => setSingleTask({...singleTask, name})}
                  autoCorrect={false}
                  autoCapitalize="none"
                />
                <Input
                  leftIcon={{type: 'fontisto', name: 'question',color: '#6071d5'}}
                  placeholder="Description"
                  value={singleTask.description}
                  onChangeText={description => setSingleTask({...singleTask, description})}
                  autoCorrect={false}
                  autoCapitalize="none"
                />
                <Calendar 
                  // Initially visible month. Default = Date()
                  current={'2021-09-01'}
                  // Minimum date that can be selected, dates before minDate will be grayed out. Default = undefined
                  minDate={'2021-09-01'}
                  // Maximum date that can be selected, dates after maxDate will be grayed out. Default = undefined
                  maxDate={`2021-09-${parseInt(questForm.duration) + 1}`}
                  // Handler which gets executed on day press. Default = undefined
                  onDayPress={(day) => {selectDay(day)}}
                  // Handler which gets executed on day long press. Default = undefined
                  // Month format in calendar title. Formatting values: http://arshaw.com/xdate/#Formatting
                  monthFormat={'yyyy MM'}
                  // Handler which gets executed when visible month changes in calendar. Default = undefined
                  onMonthChange={(month) => {console.log('month changed', month)}}
                  // Hide month navigation arrows. Default = false
                  // Replace default arrows with custom ones (direction can be 'left' or 'right')
                  // Do not show days of other months in month page. Default = false
                  hideExtraDays={true}
                  // If hideArrows = false and hideExtraDays = false do not switch month when tapping on greyed out
                  // day from another month that is visible in calendar page. Default = false
                  disableMonthChange={true}
                  // If firstDay=1 week starts from Monday. Note that dayNames and dayNamesShort should still start from Sunday
                  firstDay={1}
                  hideDayNames={true}
                  // Disable all touch events for disabled days. can be override with disableTouchEvent in markedDates
                  disableAllTouchEventsForDisabledDays={true}
                  // Replace default month and year title with custom one. the function receive a date as parameter
                  // Enable the option to swipe between months. Default = false
                  markedDates={calendarMarks.markings}
                />
                
              </Card>
            </ScrollView>
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
