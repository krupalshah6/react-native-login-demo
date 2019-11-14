import React from 'react';
import {View, StyleSheet, Text, TouchableOpacity} from 'react-native';
import colors from '../../resource/colors';

export default function MainMenu({onPress, onMethodPress, buttonLabel}) {
  return (
    <View style={style.container}>
      <TouchableOpacity style={style.close} onPress={onPress}>
        <Text style={style.closeText}>X</Text>
      </TouchableOpacity>
      <TouchableOpacity style={style.logout} onPress={onMethodPress}>
        <Text style={style.logoutText}>{buttonLabel}</Text>
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
