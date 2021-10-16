import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import {Input, Text, Button, Card, ThemeProvider} from 'react-native-elements';
import {useDispatch} from 'react-redux';
import {register} from '../redux/userSlice';
import {elementsTheme} from '../styles/react-native-elements-theme-provider';

const RegisterPage = ({navigation}): JSX.Element => {
  const dispatch = useDispatch();
  const [userState, setUserState] = useState({
    firstName: '',
    lastName: '',
    userName: '',
    email: '',
    password: '',
  });

  const registerUser = async () => {
    dispatch(
      register({
        api: {
          url: 'user',
          method: 'POST',
          body: {...userState},
        },
      }),
    );
  };

  return (
    <View style={styles.container}>
      <ImageBackground
        style={{flex: 1}}
        source={require('../assets/mauve-stacked-waves-haikei.png')}>

        <ThemeProvider theme={elementsTheme}>
          <Card containerStyle={{marginTop: 50}}>
            <Text h4 h4Style={styles.headerTitle}>
              Register
            </Text>
          </Card>
          <Card>

            <Input
              leftIcon={{type: 'fontisto', name: 'person',color: '#6071d5'}}
              placeholder="username"
              value={userState.userName}
              onChangeText={userName => setUserState({...userState, userName})}
              autoCorrect={false}
              autoCapitalize="none"
            />
            <Input
              leftIcon={{type: 'fontisto', name: 'at',color: '#6071d5'}}
              placeholder="email address"
              value={userState.email}
              onChangeText={email => setUserState({...userState, email})}
              autoCorrect={false}
              autoCapitalize="none"
            />
            <Input
              leftIcon={{type: 'fontisto', name: 'unlocked',color: '#6071d5',}}
              placeholder="password"
              value={userState.password}
              onChangeText={password => setUserState({...userState, password})}
              autoCorrect={false}
              autoCapitalize="none"
              secureTextEntry
            />
            <Button
              title="Register"
              onPress={() => registerUser()}
              buttonStyle={styles.btnStyle}
            />
            <TouchableOpacity onPress={() => navigation.navigate('signIn')}>
              <Text style={styles.link}>
                Already have an account? Go to sign in
              </Text>
            </TouchableOpacity>
          </Card>
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

export default RegisterPage;
