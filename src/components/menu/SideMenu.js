import React from 'react';
import {View, StyleSheet, Image, Text, TouchableOpacity} from 'react-native';
import colors from '../../resource/colors';
import strings from '../../resource/string';

export default function MainMenu({onPress, isLogout, isSignUp, isLogin}) {
  return (
    <View style={style.container}>
      <TouchableOpacity style={style.close} onPress={onPress}>
        <Text style={style.closeText}>X</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={style.logout}
        onPress={!isSignUp ? isLogout : isLogin}>
        <Text style={style.logoutText}>
          {isSignUp ? strings.LOGIN : strings.LOGOUT}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

let style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.DARKGRAY,
  },
  close: {
    position: 'absolute',
    right: 10,
    top: 10,
    padding: 10,
  },
  closeText: {
    color: colors.WHITE,
    fontSize: 20,
  },
  logoutText: {
    color: colors.LOGOUT,
    fontSize: 20,
  },
  logout: {
    flexDirection: 'row',
    marginTop: 60,
    marginStart: '10%',
  },
});
