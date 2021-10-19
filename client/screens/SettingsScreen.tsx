import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  ImageBackground,
} from 'react-native';
import {CheckBox, ThemeProvider} from 'react-native-elements';
import {useDispatch, useSelector} from 'react-redux';
import {userLogOut} from '../funcs/dispatch/dispatchFuncs';
import {clearError, stateSelector} from '../redux/userSlice';
import {elementsTheme} from '../styles/react-native-elements-theme-provider';

const SettingsScreen = ({navigation}) => {
  const [checked, setChecked] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const {loading} = useSelector(stateSelector);
  const dispatch = useDispatch();
  const logoutUser = async () => {
    await userLogOut(dispatch);
    dispatch(clearError());
  };
  return (
    <View style={{flex: 1}}>
      {loading ? (
        <View style={styles.loaderContainer}>
          <Text style={styles.loader}>Loading...</Text>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      ) : (
        <>
          <ImageBackground
            style={{flex: 1}}
            source={require('../assets/mauve-stacked-waves-haikei.png')}
            resizeMode="stretch">
            <ThemeProvider theme={elementsTheme}>
              <View style={styles.blocks}>
                <Text style={styles.headers}>Account</Text>
                <TouchableOpacity
                  onPress={() => navigation.navigate('ProfileSettings')}>
                  <Text style={styles.content}>Profile </Text>
                  <Text style={styles.text}>Edit your profile</Text>
                </TouchableOpacity>
              </View>
              <View style={styles.blocks}>
                <TouchableOpacity onPress={() => logoutUser()}>
                  <Text style={styles.content}>Logout</Text>
                  <Text style={styles.text}>Log out of your account</Text>
                </TouchableOpacity>
              </View>
              <View style={styles.blocks}>
                <Text style={styles.headers}>App Setings</Text>
                <Text style={styles.content}>Language</Text>
                <TouchableOpacity>
                  <Text style={styles.text}>English</Text>
                </TouchableOpacity>
              </View>
              <View style={styles.blocks}>
                <Text style={styles.content}>Theme</Text>
                <TouchableOpacity>
                  <Text style={styles.text}>Dark</Text>
                </TouchableOpacity>
              </View>
              <View style={styles.blocks}>
                <Text style={styles.content}>Activate Reminder</Text>
                <Text style={styles.text}>Remind you to log in</Text>

                <View style={{position: 'absolute', right: 0, top: 10}}>
                  <CheckBox
                    onPress={() => setChecked(!checked)}
                    checked={checked}
                  />
                </View>
              </View>
              <View style={styles.blocks}>
                <Text style={styles.content}>Push Notifications</Text>

                <Text style={styles.text}>Use Push Notifications</Text>
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
                  <Text style={styles.text}>Delete Account </Text>
                </TouchableOpacity>
              </View>
            </ThemeProvider>
          </ImageBackground>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  headers: {
    fontSize: 22,
    fontWeight: 'bold',
    paddingBottom: 10,
    color: 'black',
  },
  content: {
    fontSize: 20,
    fontWeight: 'bold',

    color: 'black',
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
  text: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});
export default SettingsScreen;
