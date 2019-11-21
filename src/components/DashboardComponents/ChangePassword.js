import React, {PureComponent} from 'react';
import {View, Text, TextInput, TouchableOpacity} from 'react-native';
import strings from '../../resource/string';
import {
  Collapse,
  CollapseHeader,
  CollapseBody,
} from 'accordion-collapse-react-native';
import {styles} from './changePasswordStyles';
class ChangePassword extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      collapsed: false,
    };
  }
  render() {
    return (
      <View
        style={[
          styles.changePasswordView,
          this.state.collapsed ? styles.isCollapsed : styles.notCollapsed,
        ]}>
        <Collapse
          isCollapsed={this.state.collapsed}
          onToggle={isCollapsed => this.setState({collapsed: isCollapsed})}>
          <CollapseHeader>
            <View style={styles.wrappedView}>
              <View>
                <Text style={styles.chPassText}>{strings.CHANGE_PASSWORD}</Text>
              </View>
              <View style={styles.plusTextView}>
                <Text style={styles.plusText}>
                  {this.state.collapsed ? '-' : '+'}
                </Text>
              </View>
            </View>
          </CollapseHeader>
          <CollapseBody>
            <View style={styles.changePasswordCollapsedView}>
              <View style={styles.oldPasswordView}>
                <TextInput
                  style={styles.oldPasswordInput}
                  textContentType="password"
                  secureTextEntry={true}
                />
                <Text style={styles.labelOldPassword}>
                  {strings.OLD_PASSWORD}
                </Text>
              </View>
              <View style={styles.oldPasswordView}>
                <TextInput
                  style={styles.oldPasswordInput}
                  textContentType="password"
                  secureTextEntry={true}
                />
                <Text style={styles.labelOldPassword}>
                  {strings.NEW_PASSWORD}
                </Text>
              </View>
              <View style={styles.oldPasswordView}>
                <TextInput
                  style={styles.oldPasswordInput}
                  textContentType="password"
                  secureTextEntry={true}
                />
                <Text style={styles.labelOldPassword}>
                  {strings.CONFIRM_PASSWORD}
                </Text>
              </View>
              <View style={styles.saveBtmMainView}>
                <View style={styles.saveBtnView}>
                  <TouchableOpacity>
                    <Text style={styles.saveBtnText}>{strings.SAVE}</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </CollapseBody>
        </Collapse>
      </View>
    );
  }
}
export default ChangePassword;
