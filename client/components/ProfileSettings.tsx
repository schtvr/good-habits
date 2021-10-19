import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  ImageBackground,
} from 'react-native';
import {Overlay, Button, Input, ThemeProvider} from 'react-native-elements';
import {useSelector} from 'react-redux';
import {stateSelector} from '../redux/userSlice';
import {elementsTheme} from '../styles/react-native-elements-theme-provider';

const ProfileSettings = () => {
  const [visible, setVisible] = useState(false);
  const [show, setShow] = useState(false);
  const [open, setOpen] = useState(false);

  const toggleOverlay = () => {
    setVisible(!visible);
  };
  const toggleOverlay2 = () => {
    setShow(!show);
  };
  const toggleOverlay3 = () => {
    setOpen(!open);
  };

  const {user} = useSelector(stateSelector);
  console.log('USER', user);
  return (
    <ImageBackground
      style={{flex: 1}}
      source={require('../assets/mauve-stacked-waves-haikei.png')}>
      <ThemeProvider theme={elementsTheme}>
        <View>
          <View style={styles.blocks}>
            <TouchableOpacity onPress={toggleOverlay}>
              <Text style={styles.headers}>Display Name</Text>
              <Text style={styles.content}>username...</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.blocks}>
            <TouchableOpacity onPress={toggleOverlay2}>
              <Text style={styles.headers}>Change password</Text>
              <Text>Password....</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.blocks}>
            <TouchableOpacity onPress={toggleOverlay3}>
              <Text style={styles.headers}>Change Profile Picture</Text>
              <Image style={styles.image} source={{uri: user.pfp}} />
            </TouchableOpacity>
          </View>
          {/* Overlay for username */}
          <Overlay
            isVisible={visible}
            onBackdropPress={toggleOverlay}
            overlayStyle={{height: 200, width: 300}}>
            <Text style={styles.content}>Change username</Text>
            <View
              style={{
                alignItems: 'center',
                borderColor: 'black',
                borderWidth: 1,
                flex: 1,
                justifyContent: 'flex-end',
              }}>
              <Input />
              <Button
                title="Save"
                buttonStyle={{
                  width: 100,
                  borderRadius: 10,
                  backgroundColor: '#383be0',
                }}
              />
              <Button
                title="cancel"
                type="clear"
                buttonStyle={{width: 100, borderRadius: 10}}
                titleStyle={{color: '#383be0'}}
                onPress={toggleOverlay}
              />
            </View>
          </Overlay>
          {/* OverLay for password */}
          <Overlay
            isVisible={show}
            onBackdropPress={toggleOverlay2}
            overlayStyle={{height: 200, width: 300}}>
            <Text style={styles.content}>Change password</Text>
            <View
              style={{
                alignItems: 'center',
                borderColor: 'black',
                borderWidth: 1,
                flex: 1,
                justifyContent: 'flex-end',
              }}>
              <Input />
              <Button
                title="Save"
                buttonStyle={{
                  width: 100,
                  borderRadius: 10,
                  backgroundColor: '#383be0',
                }}
              />
              <Button
                title="cancel"
                type="clear"
                buttonStyle={{width: 100, borderRadius: 10}}
                titleStyle={{color: '#383be0'}}
                onPress={toggleOverlay2}
              />
            </View>
          </Overlay>
          {/* Overlay for Profile Picture */}
          <Overlay
            isVisible={open}
            onBackdropPress={toggleOverlay3}
            overlayStyle={{height: 250, width: 300}}>
            <Text style={styles.content}>Change profile picture</Text>
            <View
              style={{
                alignItems: 'center',
                borderColor: 'black',
                borderWidth: 1,
                flex: 1,
                justifyContent: 'flex-end',
              }}>
              <Button
                title="Upload"
                buttonStyle={{
                  marginBottom: 55,
                  marginLeft: 200,
                  borderRadius: 10,
                  backgroundColor: '#383be0',
                }}
                // type="clear"
              />
              <Button
                title="Save"
                buttonStyle={{
                  width: 100,
                  borderRadius: 10,
                  backgroundColor: '#383be0',
                }}
              />
              <Button
                title="cancel"
                type="clear"
                buttonStyle={{width: 100, borderRadius: 10}}
                titleStyle={{color: '#383be0'}}
                onPress={toggleOverlay3}
              />
            </View>
          </Overlay>
        </View>
      </ThemeProvider>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  headers: {
    fontSize: 22,
    fontWeight: 'bold',
  },
  content: {
    fontSize: 16,
  },
  blocks: {
    paddingVertical: 10,
    paddingLeft: 20,
  },
  image: {
    height: 60,
    width: 60,
    borderRadius: 50,
  },
});

export default ProfileSettings;
