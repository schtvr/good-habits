import React, {useState} from 'react';
import {View, StyleSheet, Button} from 'react-native';
import {Input, Text} from 'react-native-elements';

const LoginScreen = (): JSX.Element => {
  const [userState, setUserState] = useState({
    userNameOrEmail: '',
    password: '',
  });
  return (
    <View style={styles.container}>
      <Text h3 h3Style={styles.headerTitle}>
        Sign In
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
      <Button title="Sign In" onPress={() => console.log('hello')} />
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
});

export default LoginScreen;
