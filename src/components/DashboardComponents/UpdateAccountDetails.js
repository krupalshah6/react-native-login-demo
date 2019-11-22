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
import AsyncStorage from '@react-native-community/async-storage';
import {connect} from 'react-redux';
class UpdateAccountDetails extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      collapsed: false,
      avatar: [],
      userData: {},
    };
  }

  componentDidMount() {
    const {avatar} = this.props;
    let avatarUpdated = [...this.state.avatar];
    AsyncStorage.getItem('user').then(data => {
      if (data) {
        this.setState({userData: JSON.parse(data)}, () => {
          avatar.length > 0 &&
            avatar.map((item, index) => {
              if (item.id === this.state.userData.profile_avtar) {
                avatarUpdated.push({
                  profile_avtar: item.profile_avtar,
                  id: item.id,
                  isSelected: true,
                });
              } else {
                avatarUpdated.push({
                  profile_avtar: item.profile_avtar,
                  id: item.id,
                  isSelected: false,
                });
              }
              return;
            });
          this.setState({avatar: avatarUpdated});
        });
      }
    });
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
                <View style={{justifyContent: 'center', alignItems: 'center'}}>
                  <View style={styles.avatarMainView}>
                    {this.state.avatar.length > 0 &&
                      this.state.avatar.map((data, index) => {
                        return (
                          <TouchableOpacity key={index}>
                            <View style={styles.selectedAvatarMainView}>
                              <Image
                                style={styles.avatarImageStyle}
                                source={{uri: data.profile_avtar}}
                                resizeMode="contain"
                              />
                              {data.isSelected && (
                                <View style={styles.selectedAvatarView}>
                                  <Image
                                    style={styles.selectedAvatarImage}
                                    source={icon.BORDER_AVATAR_IMAGE}
                                  />
                                </View>
                              )}
                            </View>
                          </TouchableOpacity>
                        );
                      })}
                  </View>
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

const mapStateToProps = state => ({
  avatar: state.basicReducers.avatar,
});
export default connect(
  mapStateToProps,
  null,
)(UpdateAccountDetails);
