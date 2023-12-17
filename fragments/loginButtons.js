import React from "react";
import { GoogleLoginButton } from 'react-social-login-buttons';
import { Button } from '@rneui/themed';
import { Text, View } from 'react-native';
import { useTheme } from '@react-navigation/native';


export default function LoginButtonsGroup({ handleLogon, handleGoogleSignIn }) {
  const colors = useTheme().colors;
  return (
    <View style={{ paddingTop: '20%' }}>
      <GoogleLoginButton
        align='center'
        style={{
          width: parent, fontSize: parent,
          // backgroundColor: theme
        }}
        onClick={handleGoogleSignIn} />
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <View style={{ flex: 1, height: 1, backgroundColor: colors.text }} />
        <View>
          <Text style={{ width: 50, textAlign: 'center', color: colors.text }}>or</Text>
        </View>
        <View style={{ flex: 1, height: 1, backgroundColor: colors.text }} />
      </View>
      <Button
        onPress={handleLogon}
        title="Login"
        buttonStyle={{
          backgroundColor: 'rgba(78, 116, 289, 1)',
          borderRadius: 3,
        }}
        containerStyle={{
          marginLeft: 4,
          marginRight: 3.5,
          width: parent,
          marginVertical: 10,
        }}
      />
    </View>
  )
}