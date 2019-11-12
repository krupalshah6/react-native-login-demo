import React, {PureComponent} from 'react';
import {View, StyleSheet} from 'react-native';
import {BarIndicator} from 'react-native-indicators';
import colors from '../../resource/colors';

class MainLoader extends PureComponent {
  render() {
    return (
      <View style={styles.container}>
        <BarIndicator color={colors.DODGER_BLUE} count={5} />
      </View>
    );
  }
}
let styles = StyleSheet.create({
  container: {
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
  },
});
export default MainLoader;
