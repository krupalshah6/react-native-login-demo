import React, {PureComponent} from 'react';
import {TextInput, StyleSheet, View, Text} from 'react-native';
//color
import colors from '../../resource/colors';

/**
 * this class is re-usable component within app for text input field.
 * @class FormTypeText
 */
class FormTypeText extends PureComponent {
  TextInputRef = React.createRef();
  /**
   * focus method for handling keyboard event.
   * @method focus method is used for handle current focus.
   */
  focus = () => {
    if (this.TextInputRef.current) {
      this.TextInputRef.current.focus();
    }
  };
  /**
   * props which is used in this component
   * @event TextInput
   * @param {Object} style style which is define to override custom style using props.
   * @param {String} error error to display for text field using props,
   * @param {Object} otherProps all different props to set into TextInput.
   */
  render() {
    const {error, style, ...otherProps} = this.props;
    return (
      <View style={[styles.container, style]}>
        <TextInput
          ref={this.TextInputRef}
          selectionColor={colors.DODGER_BLUE}
          style={styles.TextInput}
          {...otherProps}
        />
        <Text style={styles.errorText}>{error || ''}</Text>
      </View>
    );
  }
}

let styles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },
  TextInput: {
    height: 40,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: colors.SILVER,
  },
  errorText: {
    color: colors.TORCH_RED,
    height: 20,
  },
});

export default FormTypeText;
