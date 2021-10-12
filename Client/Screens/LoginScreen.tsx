import React, {useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { signIn, stateSelector } from '../redux/userSlice'


const mockLogin = {
  userNameOrEmail: 'testerman',
    password: 'testerman',
}

import {View, StyleSheet, TouchableOpacity} from 'react-native';
import {Input, Text, Button} from 'react-native-elements';

const LoginScreen = ({navigation}): JSX.Element => {
  const [userState, setUserState] = useState({
    userNameOrEmail: '',
    password: '',
  });
  const [loginError, setLoginError] = useState('');
  const state = useSelector(stateSelector);

  const dispatch = useDispatch();

  const signInUser = async () => {
    console.log(userState);
    // const res = await UserService.signIn(userState);
    // if (res.error) {
    //   setServerRes(res.error);
    //   return;
    // }
    // await AsyncStorage.setItem('token', res.token);
    if (userState.userNameOrEmail==mockLogin.userNameOrEmail) {
      console.log('logged in', state)
      return dispatch(signIn({
        type: 'FETCH',
        api: {
          url: '/users'
        }
      }
      ));
    }
    setLoginError('Wrong username or password');
  } 

  return (
    <View style={styles.container}>
      <Text h3 h3Style={styles.headerTitle}>
        Sign In
      </Text>
      <Text h3 h3Style={styles.headerTitle}>
        {loginError}
      </Text>
      <Input
        leftIcon={{type: 'font-awesome', name: 'user'}}
        label="Username or Email"
        placeholder="John Doe"
        value={userState.userNameOrEmail}
        onChangeText={userNameOrEmail =>
          setUserState({...userState, userNameOrEmail})
        }
        autoCapitalize="none"
        autoCorrect={false}
      />

      <Input
        leftIcon={{type: 'font-awesome', name: 'lock'}}
        label="Password"
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
        <Text style={styles.link}>Dont have an account? Go to register!</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 50,
    backgroundColor: '#dbeaff',
    flex: 1,
  },
  headerTitle: {
    alignSelf: 'center',
    marginBottom: 50,
    borderBottomColor: 'black',
    borderBottomWidth: 1,
  },
  link: {
    color: '#2e7eff',
    alignSelf: 'center',
    marginTop: 10,
  },
  btnStyle: {
    width: 150,
    alignSelf: 'center',
  },
});

export default LoginScreen;
