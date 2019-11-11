import React, {PureComponent} from 'react';
import {TextInput, StyleSheet, View, Text} from 'react-native';
//color
import colors from '../resource/colors';

class FormTypeText extends PureComponent {
  TextInputRef = React.createRef();

  focus = () => {
    if (this.TextInputRef.current) {
      this.TextInputRef.current.focus();
    }
  };
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
