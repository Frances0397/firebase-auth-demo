import React, { Children, useState } from 'react';
import { StyleSheet, Text, View, Image, useWindowDimensions } from 'react-native';
import { ListItem, Avatar } from 'react-native-elements';
import { Input, Switch } from '@rneui/themed';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useTheme } from '@react-navigation/native';

//Firebase shit
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { signInWithEmailAndPassword } from "firebase/auth";
import { GoogleSignIn } from 'expo-google-app-auth';

// import { ThemeContext } from '../App';
import LoginButtonsGroup from './fragments/loginButtons';

export default function App({ navigation }) {
  const { width, height } = useWindowDimensions()
  const [isRevealPwd, setIsRevealPwd] = useState(false);
  const [toggle, setToggle] = useState(false);
  const colors = useTheme().colors;

  //Firebase shit
  console.log(process.env.REACT_APP_API_KEY);

  const firebaseConfig = {
    apiKey: process.env.API_KEY,
    authDomain: process.env.AUTH_DOMAIN,
    projectId: process.env.PROJECT_ID,
    storageBucket: process.env.STORAGE_BUCKET,
    messagingSenderId: process.env.MESSAGING_SENDER_ID,
    appId: process.env.APP_ID,
    measurementId: process.env.MEASUREMENT_ID
  };


  initializeApp(firebaseConfig);
  const auth = getAuth();


  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // const handleLogon = () => {
  //   alert("Logon pressed");
  // }

  const handleLogon = async () => {
    console.log("handle logon");
    console.log(email);
    console.log(password);
    signInWithEmailAndPassword(auth, email, password)
      .then(() => console.log("User logged in succesfully!"))
      .catch((error) => console.error(error));

  };

  const handleSignup = async () => {
    try {
      await firebase.auth().createUserWithEmailAndPassword(email, password);
      console.log('User registered successfully!');
    } catch (error) {
      console.error('Signup error:', error.message);
    }
  };

  const handleLogout = async () => {
    try {
      await firebase.auth().signOut();
      console.log('User logged out successfully!');
    } catch (error) {
      console.error('Logout error:', error.message);
    }
  };

  const signInWithGoogleAsync = async () => {
    try {
      const result = await GoogleSignIn.logInAsync({
        androidClientId: null, // Set to null for web
        iosClientId: null, // Set to null for web
        webClientId: 'YOUR_WEB_CLIENT_ID', // Add your web client ID here
        scopes: ['profile', 'email'],
      });

      if (result.type === 'success') {
        console.log('Google Sign-In successful:', result.user);
        // You can now use the result.user object or perform Firebase authentication
      } else {
        console.log('Google Sign-In canceled or failed:', result);
      }
    } catch (error) {
      console.error('Error during Google Sign-In:', error);
    }
  };

  // const { theme, setTheme } = React.useContext(ThemeContext)
  // const changeTheme = () => {
  //   if (theme === 'light') {
  //     setToggle(!toggle);
  //     setTheme('dark');
  //   } else {
  //     setToggle(!toggle);
  //     setTheme('light');
  //   }
  // }
  return (
    <View style={{ flexDirection: 'row', height: '100%', flex: 1 }}>
      <View style={styles.cont1}>
        <ListItem containerStyle={styles.avatar}>
          <Avatar
            size={40}
            rounded
            source={{ uri: require("./assets/favicon.png") }} />
          <ListItem.Content>
            <ListItem.Title style={{ fontSize: 20, color: colors.text }}>Task Master</ListItem.Title>
          </ListItem.Content>
        </ListItem>
        <Text style={{
          fontSize: 35,
          marginTop: '15%',
          marginLeft: '20%',
          color: colors.text
        }}>Welcome Back</Text>
        <Text style={{
          marginTop: '3%',
          marginLeft: '21%',
          color: colors.text
        }}>We are happy to have you back!</Text>
        <View style={styles.cont2}>
          <Input
            style={{ color: colors.text }}
            placeholder='Email'
            onChangeText={setEmail} />
          <Input
            style={{ color: colors.text }}
            secureTextEntry={isRevealPwd ? false : true}
            placeholder='Password'
            onChangeText={setPassword}
            rightIcon={
              <Ionicons
                name={isRevealPwd ? 'eye-off' : 'eye'}
                size={20}
                style={{ paddingLeft: 7, color: colors.text }}
                onPress={isRevealPwd ?
                  () => setIsRevealPwd(false) :
                  () => setIsRevealPwd(true)} />}
          />
          <LoginButtonsGroup handleLogon={handleLogon} handleGoogleSignIn={signInWithGoogleAsync} />
        </View>
        <View style={{ flexDirection: 'row' }}>
          {/* <Switch
            style={{
              marginLeft: '18%',
              marginBottom: '5%',
              alignSelf: 'baseline'
            }}
            onValueChange={changeTheme}
            value={toggle} /> */}
          <Text
            style={{ color: colors.text, marginLeft: 10 }}
          >{toggle ? 'Light Mode' : 'Dark Mode'}</Text>
        </View>
      </View>
      <View style={{ alignSelf: 'center', flex: 2, height: height / 1.1, marginRight: '1%' }}>
        <Image source={require('./assets/Frame.png')} style={{
          alignSelf: 'center',
          height: '90%',
          width: '60%',
          resizeMode: 'stretch',
          flex: 1
        }} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  cont1: {
    height: '100%',
    width: '80%',
    flex: 1,
    flexDirection: 'column',
  },
  cont2: {
    flex: 1,
    height: '100%',
    width: '100%',
    marginTop: '10%',
    marginLeft: '18%'
  },
  text1: {
    fontSize: 35,
    marginTop: '15%',
    marginLeft: '20%'
  },
  avatar: {
    // verticalAlign: 'top',
    // backgroundColor: 'trans',
    // marginRight: '30%',
    // marginLeft: '15%'
  }
});
