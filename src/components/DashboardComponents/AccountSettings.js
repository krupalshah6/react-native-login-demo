import React, {PureComponent} from 'react';
import {View, StyleSheet} from 'react-native';
import ChangePassword from './ChangePassword';
import UpdateAccountDetails from './UpdateAccountDetails';
class AccountSettings extends PureComponent {
  render() {
    return (
      <View style={styles.container}>
        <ChangePassword />
        <UpdateAccountDetails avatar={this.props.avatar} />
      </View>
    );
  }
}
let styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
export default AccountSettings;
