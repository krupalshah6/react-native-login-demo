import React from 'react';
import {View, StyleSheet, Text, TouchableOpacity} from 'react-native';
import colors from '../../resource/colors';

export default function MainMenu({
  onPress,
  onMethodPress,
  buttonLabel,
  onMethodPressTwo,
  buttonLabelTwo,
  onHomePress,
  buttonLabelHome,
}) {
  return (
    <View style={style.container}>
      <TouchableOpacity style={style.close} onPress={onPress}>
        <Text style={style.closeText}>X</Text>
      </TouchableOpacity>
      <View style={style.buttonView}>
        {buttonLabelHome !== '' && (
          <TouchableOpacity style={style.logout} onPress={onHomePress}>
            <Text style={style.logoutText}>{buttonLabelHome}</Text>
          </TouchableOpacity>
        )}
        {buttonLabel !== '' && (
          <TouchableOpacity style={style.logout} onPress={onMethodPress}>
            <Text style={style.logoutText}>{buttonLabel}</Text>
          </TouchableOpacity>
        )}
        {buttonLabelTwo !== '' && (
          <TouchableOpacity style={style.logout} onPress={onMethodPressTwo}>
            <Text style={style.logoutText}>{buttonLabelTwo}</Text>
          </TouchableOpacity>
        )}
      </View>
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
  buttonView: {
    marginTop: 50,
  },
  logoutText: {
    color: colors.LOGOUT,
    fontSize: 20,
  },
  logout: {
    flexDirection: 'row',
    marginTop: 10,
    marginStart: '10%',
  },
});
