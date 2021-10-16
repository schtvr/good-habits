import React, {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {signIn, stateSelector} from '../redux/userSlice';
import {View, StyleSheet, TouchableOpacity, ImageBackground} from 'react-native';
import {Input, Text, Button, Card, ThemeProvider} from 'react-native-elements';
import messaging from '@react-native-firebase/messaging';
import {elementsTheme} from '../styles/react-native-elements-theme-provider';


const LoginScreen = ({navigation}): JSX.Element => {
  const [userState, setUserState] = useState({
    emailOrUserName: '',
    password: '',
  });
  const [loginError, setLoginError] = useState('');
  const state = useSelector(stateSelector);

  const dispatch = useDispatch();
  const signInUser = async () => {
    const userId = await messaging().getToken();
    console.log('DAGVYDSAGYDSAYA HUYG',userId);
    dispatch(
      signIn({
        api: {
          method: 'POST',
          url: 'login',
          body: {...userState, firebaseId: userId},
        },
      }),
    );
    setLoginError(state.error);
  };

  return (
    <View style={styles.container}>
      <ImageBackground
        style={{flex: 1}}
        source={require('../assets/mauve-stacked-waves-haikei.png')}>

      <ThemeProvider theme={elementsTheme}>
        <Card containerStyle={{marginTop: 50}}>
          <Text h4 h4Style={styles.headerTitle}>
            Sign In
          </Text>
        </Card>
        <Card>
          <Text h3 h3Style={styles.headerTitle}>
            {loginError}
          </Text>
          <Input
            leftIcon={{type: 'fontisto', name: 'person',color: '#6071d5'}}
            placeholder="Username"
            value={userState.emailOrUserName}
            onChangeText={emailOrUserName => setUserState({...userState, emailOrUserName})}
            autoCapitalize="none"
            autoCorrect={false}
          />
          <Input
            leftIcon={{type: 'fontisto', name: 'unlocked',color: '#6071d5',}}
            placeholder="Password"
            value={userState.password}
            onChangeText={password => setUserState({...userState, password})}
            autoCorrect={false}
            autoCapitalize="none"
            secureTextEntry
          />
          <Button
            title="Sign In"
            onPress={() => signInUser()}
            buttonStyle={styles.btnStyle}
          />
          <TouchableOpacity onPress={() => navigation.navigate('Register')}>
            <Text style={styles.link}>Don't have an account? Go to register!</Text>
          </TouchableOpacity>
        </Card>
      </ThemeProvider>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#dbeaff',
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

export default LoginScreen;
