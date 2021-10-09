import React, {useState} from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  LayoutAnimation,
  Platform,
  UIManager,
  Button,
} from 'react-native';

if (Platform.OS === 'android') {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

const Accordian = ({title, data}) => {
  const [expanded, setExpanded] = useState(false);

  const toggleExpand = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setExpanded(!expanded);
  };

  return (
    <View>
      <TouchableOpacity style={styles.row} onPress={() => toggleExpand()}>
        <Text>{title}</Text>
        <View>{expanded ? <Text>+</Text> : <Text>-</Text>}</View>
      </TouchableOpacity>
      <View style={styles.parentHeader} />
      {expanded && (
        <View style={styles.child}>
          <Text>{data}</Text>
          <TouchableOpacity>
            <Text>Fulfilled</Text>
          </TouchableOpacity>
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
    backgroundColor: 'grey',
  },
  parentHeader: {
    height: 1,
    color: 'white',
    width: '100%',
  },
  child: {
    backgroundColor: 'lightgray',
    padding: 16,
  },
});

export default Accordian;
