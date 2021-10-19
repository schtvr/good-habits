import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useState } from 'react'
import {
  StyleSheet,
  View,
  Text,
  Dimensions,
  TouchableOpacity,
  ImageBackground,
  Image
} from 'react-native';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import { useDispatch } from 'react-redux';
import { setPfp } from '../redux/userSlice';



const UploadPfp = () => {
  const [photo, setPhoto] = useState('');
  const dispatch = useDispatch();
  const getToken = async () => {
    return await AsyncStorage.getItem('token');
  };
  const updatePfpUrl = async (newPfpUrl) => {
    dispatch(
      setPfp({
        api: {
          url: `setPfp`,
          method: 'POST',
          headers: {
            Authorization: `Bearer ${await getToken()}`,
          },
          body: {
            pfp: newPfpUrl
          }
        },
        
      }),
    );
  };

  const cloudinaryUpload = (photo) => {
    const data = new FormData()
    data.append('file', photo)
    data.append('upload_preset', 'nrk4nxpq')
    data.append("cloud_name", "decom")
    fetch("https://api.cloudinary.com/v1_1/decom/image/upload", {
      method: "post",
      body: data
    }).then(res => res.json()).
      then(data => {
        updatePfpUrl(data.url);
        setPhoto(data.url)
      }).catch(err => {
        console.log("An Error Occured While Uploading",err)
      })
  }
  const selectPhotoTapped = () => {
    const options = {
      mediaType: 'photo',
    };
    launchImageLibrary(options, (response) => {

      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else {
        const assets = response.assets[0];
        const uri = assets.uri;
        const type = assets.type;
        const name = assets.fileName;
        const source = {
          uri,
          type,
          name,
        }
        //setPhoto(source.uri);
        cloudinaryUpload(source);
      }
    });
  }

  return (
    <View style={{flex: 1}}>
      <ImageBackground
        style={{flex: 1}}
        source={require('../assets/mauve-stacked-waves-haikei.png')}
      >
      <View>
        <Image 
          source={{ uri: photo || 'nothing' }} 
          style={styles.profileImage}>
        </Image>
      </View>
      <View style={styles.uploadContainer}>
        <Text style={styles.uploadContainerTitle}>
          Pick your profile picture
        </Text>
        <TouchableOpacity onPress={selectPhotoTapped} style={styles.uploadButton}>
          <Text style={styles.uploadButtonText}>
            Upload
          </Text>
        </TouchableOpacity>
      </View>
      </ImageBackground>
    </View >
  );
};

const styles = StyleSheet.create({
  profileImage: {
    width: 300,
    height: 300,
    alignSelf: 'center',
    borderRadius: 150,
    marginTop: 30,
  },
  uploadContainer: {
    backgroundColor: '#f6f5f8',
    borderTopLeftRadius: 45,
    borderTopRightRadius: 45,
    position: 'absolute',
    bottom: 0,
    width: Dimensions.get('window').width,
    height: 150,
  },
  uploadContainerTitle: {
    alignSelf: 'center',
    fontSize: 25,
    margin: 20,
    fontFamily: 'Roboto'
  },
  uploadButton: {
    borderRadius: 16,
    alignSelf: 'center',
    shadowColor: "#000",
    shadowOffset: {
      width: 7,
      height: 5,
    },
    shadowOpacity: 1.58,
    shadowRadius: 9,
    elevation: 4,
    margin: 10,
    padding: 10,
    backgroundColor: '#6e85ec',
    width: Dimensions.get('window').width - 60,
    alignItems: 'center'
  },
  uploadButtonText: {
    color: '#f6f5f8',
    fontSize: 20,
    fontFamily: 'Roboto'
  }
});
export default UploadPfp;