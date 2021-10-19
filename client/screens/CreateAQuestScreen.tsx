import React, {useEffect, useState} from 'react';
import {View, ScrollView, StyleSheet, ImageBackground, Keyboard} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {friendSelector} from '../redux/friendSlice';
import {getQuests} from '../funcs/dispatch/dispatchFuncs';
import {questSelector} from '../redux/questSlice';
import {elementsTheme} from '../styles/react-native-elements-theme-provider';
import {
  Input,
  Text,
  Button,
  Card,
  ThemeProvider,
  Slider,
} from 'react-native-elements';
import {PrivateValueStore} from '@react-navigation/core';
import {Calendar, CalendarList, Agenda} from 'react-native-calendars';
import {sendNewQuest} from '../funcs/dispatch/dispatchFuncs';
import {stateSelector} from '../redux/userSlice';
import DropDownPicker from 'react-native-dropdown-picker';
import QuestsScreen from './QuestsScreen';

interface IQuestCreation {
  duration: string;
  name: string;
  description: string;
  category: string;
  completionExp: number;
  taskCount: number;
  tasks: [];
  author: string;
}

interface ITaskCreation {
  name: string;
  description: string;
  day: number;
}

const CreateAQuestScreen = ({navigation}) => {
  const dispatch = useDispatch();
  const [questCreated, setQuestCreated] = useState(false);
  const {user} = useSelector(stateSelector);


  const taskTemplate: ITaskCreation = {
    name: '',
    description: '',
    day: 0,
  };

  const [tasks, setTasks] = useState({
    '99': {
      name: 'Please select a day',
      description: '',
      day: 99,
    },
  });

  const addDates = duration => {
    let num = parseInt(duration) + 1;
    let dur = num.toString();
    if (num < 10) {
      dur = `0${num}`;
    }
    let str = '2021-11-' + dur;
    return str;
  };

  const [calendarMarks, setCalendarMarks] = useState({
    markings: {
      '2021-11-01': {selected: true, selectedColor: '#6071d5'},
    },
    prevDate: '',
  });

  const [selectedDay, setSelectedDay] = useState('99');

  const handleChange = () => {
    setCalendarMarks({
      ...calendarMarks,
      markings: {
        '2021-11-01': {selected: true, selectedColor: '#6071d5'},
        [addDates(questForm.duration)]: {
          selected: true,
          selectedColor: '#6071d5',
        },
      },
      prevDate: '',
    });
    setQuestCreated(true);
  };

  const submitQuest = async () => {
    delete tasks['99'];
    const questToCreate = {
      ...questForm,
      taskCount: Object.keys(tasks).length,
      tasks: Object.values(tasks),
    };
    await sendNewQuest(dispatch, questToCreate);
    await getQuests(dispatch);
    navigation.navigate('Quests');
  };

  const selectDay = date => {
    setSelectedDay(date.day);

    setCalendarMarks({
      ...calendarMarks,
      markings: {
        ...calendarMarks.markings,
        [calendarMarks.prevDate]: {
          ...calendarMarks.markings[calendarMarks.prevDate],
          selected: false,
        },
        '2021-11-01': {
          ...calendarMarks.markings['2021-11-01'],
          selected: true,
          selectedColor: '#6071d5',
        },
        [addDates(questForm.duration)]: {
          ...calendarMarks.markings[addDates(questForm.duration)],
          selected: true,
          selectedColor: '#6071d5',
        },
        [date.dateString]: {
          ...calendarMarks.markings[date.dateString],
          selected: true,
          selectedColor: 'grey',
        },
      },
      prevDate: date.dateString,
    });
  };

  const addADot = () => {
    setCalendarMarks({
      ...calendarMarks,
      markings: {
        ...calendarMarks.markings,
        [addDates(parseInt(selectedDay) - 1)]: {
          selected: true,
          marked: true,
          markedColor: 'red',
          selectedColor: 'grey',
        },
      },
    });
  };

  const [open, setOpen] = useState(false);
  const [value, setValue] = useState('');
  const [items, setItems] = useState([
    {label: 'Health', value: 'Health'},
    {label: 'Mental', value: 'Mental'},
    {label: 'Spiritual', value: 'Spiritual'},
    {label: 'Financial', value: 'Financial'},
    {label: 'Misc.', value: 'Misc.'},
  ]);

  const [questForm, setQuestForm] = useState({
    duration: '',
    name: '',
    description: '',
    category: value,
    completionExp: 0,
    taskCount: 0,
    author: user.userName,
  });

  return (
    <View style={styles.container}>
      <ImageBackground
        style={{flex: 1}}
        source={require('../assets/mauve-stacked-waves-haikei.png')}>
        <ThemeProvider theme={elementsTheme}>
          {!questCreated ? (
            <View>
              <Card>
                <Text h4 h4Style={styles.headerTitle}>
                  Create a new Quest!
                </Text>
              </Card>
              <Card>
                <Input
                  leftIcon={{type: 'fontisto', name: 'clock', color: '#6071d5'}}
                  placeholder="duration"
                  keyboardType="numeric"
                  value={questForm.duration}
                  onChangeText={duration =>
                    setQuestForm({...questForm, duration})
                  }
                  autoCorrect={false}
                  autoCapitalize="none"
                />
                <Input
                  leftIcon={{
                    type: 'fontisto',
                    name: 'compass',
                    color: '#6071d5',
                  }}
                  placeholder="name"
                  value={questForm.name}
                  onChangeText={name => setQuestForm({...questForm, name})}
                  autoCorrect={false}
                  autoCapitalize="none"
                />
                <Input
                  leftIcon={{type: 'fontisto', name: 'at', color: '#6071d5'}}
                  placeholder="description"
                  value={questForm.description}
                  onChangeText={description =>
                    setQuestForm({...questForm, description})
                  }
                  autoCorrect={false}
                  autoCapitalize="none"
                />
                <DropDownPicker
                  open={open}
                  value={value}
                  items={items}
                  setOpen={setOpen}
                  onPress={() => Keyboard.dismiss()}
                  setValue={setValue}
                  setItems={setItems}
                  onChangeValue={() => setQuestForm({...questForm, category: value})}
                />
                <Button
                  title="Next"
                  onPress={() => handleChange()}
                  buttonStyle={styles.btnStyle}
                />
              </Card>
            </View>
          ) : (
            <ScrollView>
              <Card>
                <Text h4 h4Style={styles.headerTitle}>
                  Add the Tasks to your Quest!
                </Text>
              </Card>
              <Card>
                <Input
                  leftIcon={{type: 'fontisto', name: 'at', color: '#6071d5'}}
                  placeholder="Task name"
                  value={tasks[selectedDay]?.name}
                  onChangeText={name => {
                    if (tasks[selectedDay]?.description) addADot();
                    setTasks({
                      ...tasks,
                      [selectedDay]: {
                        ...tasks[selectedDay],
                        name,
                        day: selectedDay,
                      },
                    });
                  }}
                  autoCorrect={false}
                  autoCapitalize="none"
                />
                <Input
                  leftIcon={{
                    type: 'fontisto',
                    name: 'question',
                    color: '#6071d5',
                  }}
                  placeholder="Description"
                  value={tasks[selectedDay]?.description}
                  onChangeText={description => {
                    if (tasks[selectedDay]?.name) addADot();
                    setTasks({
                      ...tasks,
                      [selectedDay]: {
                        ...tasks[selectedDay],
                        description,
                        day: selectedDay,
                      },
                    });
                  }}
                  autoCorrect={false}
                  autoCapitalize="none"
                />
                <Calendar
                  // Initially visible month. Default = Date()
                  current={'2021-11-01'}
                  // Minimum date that can be selected, dates before minDate will be grayed out. Default = undefined
                  minDate={'2021-11-01'}
                  // Maximum date that can be selected, dates after maxDate will be grayed out. Default = undefined
                  maxDate={addDates(questForm.duration)}
                  // Handler which gets executed on day press. Default = undefined
                  onDayPress={day => {
                    selectDay(day);
                  }}
                  // Handler which gets executed on day long press. Default = undefined
                  // Month format in calendar title. Formatting values: http://arshaw.com/xdate/#Formatting
                  monthFormat={''}
                  // Handler which gets executed when visible month changes in calendar. Default = undefined
                  // onMonthChange={(month) => {console.log('month changed', month)}}
                  // Hide month navigation arrows. Default = false
                  // Replace default arrows with custom ones (direction can be 'left' or 'right')
                  // Do not show days of other months in month page. Default = false
                  hideExtraDays={true}
                  hideArrows={true}
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
                <Button
                  title="Create Quest"
                  onPress={submitQuest}
                  buttonStyle={styles.btnStyle}
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
    marginTop: 10,
    alignSelf: 'center',
  },
  test: {
    flex: 1,
  },
});

export default CreateAQuestScreen;
