import React, {PureComponent} from 'react';
import {View, Text, TextInput, TouchableOpacity, Image} from 'react-native';
import strings from '../../resource/string';
import {
  Collapse,
  CollapseHeader,
  CollapseBody,
} from 'accordion-collapse-react-native';
import {styles} from './changePasswordStyles';
import {icon} from '../../resource/icons';
class UpdateAccountDetails extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      collapsed: false,
    };
  }
  render() {
    console.log('avatar', this.props.avatar);
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
                <Text style={styles.chPassText}>
                  {strings.UPDATE_ACCOUNT_DETAILS}
                </Text>
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
              <View style={styles.selectAvatarView}>
                <View>
                  <Text style={styles.selectAvatarText}>Select Avatar</Text>
                </View>
                <View style={styles.avatarMainView}>
                  {this.props.avatar.length > 0 &&
                    this.props.avatar.map((data, index) => {
                      return (
                        <Image
                          style={styles.avatarImageStyle}
                          source={{uri: data.profile_avtar}}
                          resizeMode="contain"
                        />
                      );
                    })}
                </View>
              </View>
              <View style={styles.oldPasswordView}>
                <TextInput style={styles.oldPasswordInput} />
                <Text style={styles.labelOldPassword}>{strings.FIRSTNAME}</Text>
              </View>
              <View style={styles.oldPasswordView}>
                <TextInput style={styles.oldPasswordInput} />
                <Text style={styles.labelOldPassword}>{strings.LASTNAME}</Text>
              </View>
              <View style={styles.oldPasswordView}>
                <TextInput style={styles.oldPasswordInput} />
                <Text style={styles.labelOldPassword}>{strings.CONTACTNO}</Text>
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
export default UpdateAccountDetails;
