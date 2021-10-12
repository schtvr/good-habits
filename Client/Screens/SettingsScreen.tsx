import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {CheckBox} from 'react-native-elements';

const SettingsScreen = ({navigation}) => {
  const [checked, setChecked] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  return (
    <ScrollView>
      <View style={styles.blocks}>
        <Text style={styles.headers}>Account</Text>
        <Text style={styles.content}>Profile </Text>
        <TouchableOpacity
          onPress={() => navigation.navigate('ProfileSettings')}>
          <Text>Edit your profile</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.blocks}>
        <Text style={styles.content}>Logout</Text>
        <TouchableOpacity onPress={() => console.log('Log Out')}>
          <Text>Log out of your account</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.blocks}>
        <Text style={styles.headers}>App Setings</Text>
        <Text style={styles.content}>Language</Text>
        <TouchableOpacity>
          <Text>English</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.blocks}>
        <Text style={styles.content}>Theme</Text>
        <TouchableOpacity>
          <Text>Dark</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.blocks}>
        <Text style={styles.content}>Activate Reminder</Text>
        <Text>Remind you to log in</Text>

        <View style={{position: 'absolute', right: 0, top: 10}}>
          <CheckBox
            onPress={() => setChecked(!checked)}
            title="Click Here"
            checked={checked}
          />
        </View>
      </View>
      <View style={styles.blocks}>
        <Text style={styles.content}>Push Notifications</Text>

        <Text>Use Push Notifications</Text>
        <View style={{position: 'absolute', right: 0, top: 10}}>
          <CheckBox
            onPress={() => setIsChecked(!isChecked)}
            title="Click Here"
            checked={isChecked}
          />
        </View>
      </View>
      <View style={styles.blocks}>
        <Text style={styles.headers}>Danger Zone</Text>
        <TouchableOpacity onPress={() => console.log('Deleted')}>
          <Text>Delete Account </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  headers: {
    fontSize: 22,
    fontWeight: 'bold',
    paddingBottom: 10,
  },
  content: {
    fontSize: 20,
  },
  blocks: {
    paddingVertical: 10,
    paddingLeft: 20,
  },
});
export default SettingsScreen;
