import React, {PureComponent} from 'react';
import {TouchableOpacity, StyleSheet, Text} from 'react-native';
//colors
import colors from '../../resource/colors';

/**
 * this button class is re-usable component within app.
 * @class ButtonLogin
 */

/**
 * properties which is used in this component is -
 * @method onPress method is used for onPress button.
 */

/**
 * @event TouchableOpacity
 * @param {String} label name of button
 * @param {Boolean} disabled used for change opacity of button for enable and disable
 */

class ButtonLogin extends PureComponent {
  constructor(props) {
    super(props);
  }
  render() {
    const {label, onPress, disabled} = this.props;
    const containerStyles = [
      styles.container,
      disabled ? styles.containerDisabled : styles.containerEnabled,
    ];
    return (
      <TouchableOpacity
        style={containerStyles}
        onPress={onPress}
        disabled={disabled}>
        <Text style={styles.textStyle}>{label}</Text>
      </TouchableOpacity>
    );
  }
}

let styles = StyleSheet.create({
  container: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.DODGER_BLUE,
    borderRadius: 4,
    paddingVertical: 12,
    marginBottom: 12,
    borderRightWidth: StyleSheet.hairlineWidth,
    borderColor: 'rgba(255,255,255,0.7)',
  },
  containerEnabled: {
    opacity: 1,
  },
  containerDisabled: {
    opacity: 0.3,
  },
  textStyle: {
    color: colors.WHITE,
    textAlign: 'center',
    height: 20,
  },
});

export default ButtonLogin;
