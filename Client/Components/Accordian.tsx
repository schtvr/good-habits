import React, {useState} from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  LayoutAnimation,
  Platform,
  UIManager,
} from 'react-native';
import {Button} from 'react-native-elements';

if (Platform.OS === 'android') {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

interface IProps {
  title: string;
  data: any;
  btnText: string;
  btnText2: string;
  date: string;
}

const Accordian = ({
  title,
  data,
  btnText,
  btnText2,
  date,
}: IProps): JSX.Element => {
  const [expanded, setExpanded] = useState<boolean>(false);

  const toggleExpand = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setExpanded(!expanded);
  };

  return (
    <View>
      <TouchableOpacity style={styles.row} onPress={() => toggleExpand()}>
        <Text style={styles.title}>{title}</Text>
        <View>
          {expanded ? (
            <Text style={styles.accoridianBtn}>-</Text>
          ) : (
            <Text style={styles.accoridianBtn}>+</Text>
          )}
        </View>
      </TouchableOpacity>
      <View style={styles.parentHeader} />
      {expanded && (
        <View style={styles.child}>
          <View style={{flexDirection: 'column'}}>
            <Text style={styles.content}>{data}</Text>
            <Text style={styles.date}>Completion Date: {date}</Text>
          </View>

          {btnText ? (
            <View style={styles.friendButtons}>
              <Button
                title={btnText}
                buttonStyle={styles.btn}
                onPress={() => console.log('hi')}
              />
              <Button
                title={btnText2}
                // type="outline"
                buttonStyle={styles.btn}
                onPress={() => console.log('hi')}
              />
            </View>
          ) : null}
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
    backgroundColor: '#5c677d',
  },
  parentHeader: {
    height: 1,
    color: 'white',
    width: '100%',
  },
  child: {
    flexDirection: 'row',
    backgroundColor: '#7d8597',
    padding: 16,
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
    width: 100,
  },
  content: {
    fontSize: 18,
    fontWeight: 'bold',
    flexWrap: 'wrap',
    maxWidth: 200,
    color: '#001233',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#001233',
  },
  accoridianBtn: {
    fontSize: 20,
    color: 'white',
  },
  date: {
    paddingTop: 20,
  },
});

export default Accordian;
