import React, {useState} from 'react';
import {View, StyleSheet, TouchableOpacity} from 'react-native';
import {Input, Text, Button} from 'react-native-elements';
import {useDispatch, useSelector} from 'react-redux';
import {register, stateSelector} from '../redux/userSlice';

// /user - post: create user
// /user - get: get user by id (from JWT payload)
const RegisterPage = ({navigation}): JSX.Element => {
  const [userState, setUserState] = useState({
    firstName: '',
    lastName: '',
    userName: '',
    email: '',
    password: '',
  });

  const dispatch = useDispatch();

  const registerUser = async () => {
    console.log('Registering in-----------------------------------');
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
      <Text h3 h3Style={styles.headerTitle}>
        Register
      </Text>
      <Input
        leftIcon={{type: 'font-awesome', name: 'user'}}
        label="Firstname"
        placeholder="John"
        value={userState.firstName}
        onChangeText={firstName => setUserState({...userState, firstName})}
        autoCapitalize="none"
        autoCorrect={false}
      />

      <Input
        leftIcon={{type: 'font-awesome', name: 'user'}}
        label="Lastname"
        placeholder="Doe"
        value={userState.lastName}
        onChangeText={lastName => setUserState({...userState, lastName})}
        autoCorrect={false}
        autoCapitalize="none"
      />
      <Input
        leftIcon={{type: 'font-awesome', name: 'id-badge'}}
        label="Username"
        placeholder="DogShitTunic"
        value={userState.userName}
        onChangeText={userName => setUserState({...userState, userName})}
        autoCorrect={false}
        autoCapitalize="none"
      />
      <Input
        leftIcon={{type: 'font-awesome', name: 'envelope'}}
        label="Email"
        placeholder="example@gmail.com"
        value={userState.email}
        onChangeText={email => setUserState({...userState, email})}
        autoCorrect={false}
        autoCapitalize="none"
      />
      <Input
        leftIcon={{type: 'font-awesome', name: 'lock'}}
        label="Password"
        placeholder="password.."
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
        <Text style={styles.link}>Already have an account? Go to sign in</Text>
      </TouchableOpacity>
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
    marginBottom: 40,
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

export default RegisterPage;
