import React, {useState, useEffect} from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import {Input, Text, Button, Card, ThemeProvider} from 'react-native-elements';
import {useDispatch} from 'react-redux';
import {register} from '../redux/userSlice';
import elementsTheme from '../styles/react-native-elements-theme-provider';

const RegisterPage = ({navigation}): JSX.Element => {
  const initialColorsState = {color1: '#9957D1', color2: '#556EF5'};
  const dispatch = useDispatch();
  const [colors, setColors] = useState(initialColorsState);
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

  const image = { uri: '../assets/stacked-waves-haikei.svg'}
  return (
    <View style={styles.container}>
      <ImageBackground
        style={{flex: 1}}
        source={require('../assets/stacked-waves-haikei.png')}>
        {/* <LinearGradient colors={[colors.color1, colors.color2]} style={styles.test}/> */}

        <ThemeProvider theme={elementsTheme}>
          <Card>
            <Text h4 h4Style={styles.headerTitle}>
              Register
            </Text>
          </Card>
          <Card>
            {/* <Input
            leftIcon={{type: 'feather', name: 'user'}}
            placeholder="first name"
            value={userState.firstName}
            onChangeText={firstName => setUserState({...userState, firstName})}
            autoCapitalize="none"
            autoCorrect={false}
          />
          <Input
            leftIcon={{type: 'entypo', name: 'user'}}
            placeholder="surname"
            value={userState.lastName}
            onChangeText={lastName => setUserState({...userState, lastName})}
            autoCorrect={false}
            autoCapitalize="none"
          /> */}
            <Input
              leftIcon={{type: 'fontisto', name: 'person',color: '#d6685d'}}
              placeholder="username"
              value={userState.userName}
              onChangeText={userName => setUserState({...userState, userName})}
              autoCorrect={false}
              autoCapitalize="none"
            />
            <Input
              leftIcon={{type: 'fontisto', name: 'at',color: '#d6685d'}}
              placeholder="email address"
              value={userState.email}
              onChangeText={email => setUserState({...userState, email})}
              autoCorrect={false}
              autoCapitalize="none"
            />
            <Input
              leftIcon={{type: 'fontisto', name: 'unlocked',color: '#d6685d',}}
              placeholder="password"
              value={userState.password}
              onChangeText={password => setUserState({...userState, password})}
              autoCorrect={false}
              autoCapitalize="none"
              secureTextEntry
            />
            <Button
              // ViewComponent={LinearGradient}
              // linearGradientProps={{    colors: ['red', 'pink'],    start: { x: 0, y: 0.5 },    end: { x: 1, y: 0.5 },  }}
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
    // backgroundColor: '#eee',
  },
  bg: {
    flex: 1,
  },
  headerTitle: {
    alignSelf: 'center',
    color: '#602a25',
  },
  link: {
    color: '#602a25',
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
