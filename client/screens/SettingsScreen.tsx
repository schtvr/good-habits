import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import {CheckBox} from 'react-native-elements';
import {useDispatch, useSelector} from 'react-redux';
import {userLogOut} from '../funcs/dispatch/dispatchFuncs';
import {stateSelector} from '../redux/userSlice';

const SettingsScreen = ({navigation}) => {
  const [checked, setChecked] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const {loading} = useSelector(stateSelector);
  const dispatch = useDispatch();
  const logoutUser = async () => {
    await userLogOut(dispatch);
  };
  return (
    <ScrollView>
      {loading ? (
        <View style={styles.loaderContainer}>
          <Text style={styles.loader}>Loading...</Text>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      ) : (
        <>
          <View style={styles.blocks}>
            <Text style={styles.headers}>Account</Text>
            <TouchableOpacity
              onPress={() => navigation.navigate('ProfileSettings')}>
              <Text style={styles.content}>Profile </Text>
              <Text>Edit your profile</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.blocks}>
            <TouchableOpacity onPress={() => logoutUser()}>
              <Text style={styles.content}>Logout</Text>
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
        </>
      )}
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
export default SettingsScreen;
