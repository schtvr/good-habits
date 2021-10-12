import React, {useState} from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {Overlay, Button} from 'react-native-elements';

const ProfileSettings = () => {
  const [visible, setVisible] = useState(false);

  const toggleOverlay = () => {
    setVisible(!visible);
  };

  return (
    <View>
      <View style={styles.blocks}>
        <Text style={styles.headers}>Display Name</Text>
        <TouchableOpacity onPress={toggleOverlay}>
          <Text style={styles.content}>username...</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.blocks}>
        <Text style={styles.headers}>Change password</Text>
        <TouchableOpacity>
          <Text>Password....</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.blocks}>
        <TouchableOpacity>
          <Text style={styles.headers}>About</Text>
        </TouchableOpacity>
        <Text>About msg</Text>
      </View>

      <Overlay
        isVisible={visible}
        onBackdropPress={toggleOverlay}
        overlayStyle={{height: 200, width: 300}}>
        <Text>Hello from Overlay!</Text>
        <View
          style={{
            alignItems: 'center',
            borderColor: 'black',
            borderWidth: 1,
            flex: 1,
            justifyContent: 'flex-end',
          }}>
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
    </View>
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
});

export default ProfileSettings;
