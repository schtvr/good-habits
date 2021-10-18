import React, {useState, useEffect} from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  LayoutAnimation,
  Platform,
  UIManager,
} from 'react-native';
import { Button } from 'react-native-elements';
import { useSelector, useDispatch } from 'react-redux';
import {questSelector} from '../redux/questSlice';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialIcons';
import { sendTaskComplete, achievementSelector } from '../redux/achievementSlice'
import AsyncStorage from '@react-native-async-storage/async-storage';

if (Platform.OS === 'android') {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

interface IProps {
  id: number,
  title: string,
  index: number,
  length: number,
}

const Accordian = ({ id, title, index, length }: IProps): JSX.Element => {
  const dispatch = useDispatch();
  const [expanded, setExpanded] = useState<boolean>(false);
  const [taskToDo, setTaskToDo] = useState<boolean>(false);
  const [taskList, setTaskList] = useState([]);
  const [completed, setCompleted] = useState<boolean>(false);

  const {activeTasks} = useSelector(questSelector);
  const { completedTasks } = useSelector(achievementSelector);
  const { update } = useSelector(achievementSelector);

  useEffect(() => {
    const res = activeTasks.filter((task) => (
      task.questId === id
    ));
    if (res.length !== 0) setTaskToDo(true);
    setTaskList(res);
    for (const taskL of taskList) {
      for (const taskC of completedTasks) {
        if (taskC.taskId === taskL.id) {
          setCompleted(true);
        }
      }
    }
  }, [activeTasks, completedTasks, completed]);

  const getToken = async () => {
    return await AsyncStorage.getItem('token');
  };

  const completeTask = async (taskId) => {
    // send request and get update back
    // dispatch (update exp ---> update.gainexp)
    dispatch(
      sendTaskComplete({
        api: {
          url: `task/${taskId}`,
          method: 'POST',
          headers: {
            Authorization: `Bearer ${await getToken()}`,
          },
        },
      }),
    );
  };

  const toggleExpand = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setExpanded(!expanded);
    console.log('INDEX CHECK',  index)
  };

  const accordianParent = () => {

    const parentBorderHandler = () => {
      if (length === 1) return {...styles.row, borderRadius: 12}
      if (length === 2) {
        if (index === 0) return {...styles.row, borderTopLeftRadius: 12, borderTopRightRadius: 12}
        return {...styles.row, borderBottomLeftRadius: 12, borderBottomRightRadius: 12}
      }
      if (index === 0) return {...styles.row, borderTopLeftRadius: 12, borderTopRightRadius: 12}
      if (index === length - 1) return {...styles.row, borderBottomLeftRadius: 12, borderBottomRightRadius: 12}
      return {...styles.row}
    }

    return(
    <TouchableOpacity style={parentBorderHandler()} onPress={() => toggleExpand()}>
        <Text style={styles.title}>{title}</Text>
        {taskToDo && !completed && <MaterialCommunityIcons name='priority-high' size={30} style={styles.notification} />}
        <View>
          {expanded ? (
            <Text style={styles.accoridianBtn}>-</Text>
          ) : (
            <Text style={styles.accoridianBtn}>+</Text>
          )}
        </View>
      </TouchableOpacity>
      )
  }

  return (
    <View>
      {accordianParent()}

      <View style={styles.parentHeader} />
      {expanded && (
        <View style={styles.child}>
          <View style={{flexDirection: 'column'}}>
            {taskToDo && taskList.map(task => (
              <View key={task.id}>
                <Text style={styles.content}>{task.name}</Text>
                <Text style={styles.description}>{task.description}</Text>
                <Button
                  title={completed ? 'Completed' : 'Complete'}
                  buttonStyle={styles.btn}
                  titleStyle={{color: '#6071d5'}}
                  onPress={() => completeTask(task.id)}
                  disabled={completed}
                />
              </View>
            ))}
            {!taskToDo &&
              <Text style={styles.content}>No tasks for today!</Text>
            }
          </View>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: 56,
    paddingLeft: 25,
    paddingRight: 18,
    alignItems: 'center',
    backgroundColor: '#2d3c8f',

  },
  parentHeader: {
    height: 1,
    color: 'white',
    width: '100%',
  },
  child: {
    flexDirection: 'row',
    backgroundColor: '#6071d5',
    padding: 16,
    marginLeft: 12,
    marginRight: 12,
    borderBottomColor: '#ddd',
    borderBottomWidth: 2,
  },
  friendList: {
    alignContent: 'center',
  },
  friendButtons: {
    alignItems: 'flex-end',
    width: 150,
  },
  btn: {
    marginBottom: 10,
    marginTop: 10,
    width: 100,
    backgroundColor: '#ddd',
    borderWidth: 4,
    borderColor: '#2d3c8f',

  },
  content: {
    fontSize: 18,
    fontWeight: 'bold',
    flexWrap: 'wrap',
    maxWidth: 450,
    color: '#ddd',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ddd',
  },
  accoridianBtn: {
    fontSize: 20,
    color: 'white',
    alignSelf: 'flex-end'
  },
  notification: {
    color: 'peru',
    position: 'absolute',
    right: 30,
  },
  description: {
    fontSize: 16,
    paddingTop: 20,
  },

});

export default Accordian;
