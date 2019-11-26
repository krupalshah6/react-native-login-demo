import React, {PureComponent} from 'react';
import {
  View,
  Image,
  TouchableOpacity,
  ScrollView,
  Text,
  TouchableWithoutFeedback,
} from 'react-native';
import {connect} from 'react-redux';
import NetInfo from '@react-native-community/netinfo';
import {styles} from './styles';
import SideMenu from 'react-native-side-menu';
import MainMenu from '../../components/menu/SideMenu';
import strings from '../../resource/string';
import {icon} from '../../resource/icons';
import AsyncStorage from '@react-native-community/async-storage';
import MyMic from '../../components/mic/myMic';
import AccountSettings from '../../components/DashboardComponents/AccountSettings';
import IntrestedToParticipate from '../../components/DashboardComponents/IntrestedToParticipate';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
class DashBoard extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
      userData: {},
      avatar: [],
      profile: '',
      tabs: [
        {id: 0, value: strings.DASHBOARD_TAB_ONE, isSelected: true},
        {id: 1, value: strings.DASHBOARD_TAB_TWO, isSelected: false},
        {id: 2, value: strings.DASHBOARD_TAB_THREE, isSelected: false},
        {id: 3, value: strings.DASHBOARD_TAB_FOUR, isSelected: false},
      ],
    };
    this.toggleMenu = this.toggleMenu.bind(this);
    this.updateMenuState = this.updateMenuState.bind(this);
    this.handleHome = this.handleHome.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
  }

  // static getDerivedStateFromProps(props, state) {
  //   if (props.avatar !== state.avatar) {
  //     return {
  //       avatar: props.avatar,
  //     };
  //   }
  //   return null;
  // }

  componentDidMount() {
    this._subscription = NetInfo.addEventListener(
      this._handleConnectivityChange,
    );
    this.checkAuth();
  }

  componentWillUnmount() {
    this._subscription = NetInfo.removeEventListener(
      this._handleConnectivityChange,
    );
  }

  componentDidUpdate(prevProps) {
    if (prevProps.avatar !== this.props.avatar) {
      this.checkAuth();
      this.getUserProfile();
    }
  }

  _handleConnectivityChange = state => {
    this.setState({isConnected: state.isConnected}, () => {
      this.checkAuth();
    });
  };

  checkAuth() {
    AsyncStorage.getItem('user').then(data => {
      if (data) {
        this.setState({userData: JSON.parse(data)}, () => {
          this.getUserProfile();
        });
        if (data.token !== '') {
          this.setState({isAuthenticate: true});
        } else {
          this.setState({isAuthenticate: false});
        }
      } else {
        this.setState({isAuthenticate: false});
      }
    });
  }

  getUserProfile = () => {
    const {userData} = this.state;
    const {avatar} = this.props;
    if (userData) {
      avatar.length > 0 &&
        avatar.map(item => {
          if (userData.profile_avtar === item.id) {
            this.setState({profile: item.profile_avtar_url}, () => {
            });
          }
        });
    }
  };

  toggleMenu() {
    this.setState({
      isOpen: !this.state.isOpen,
    });
  }

  updateMenuState(isOpen) {
    this.setState({isOpen});
  }

  handleHome() {
    this.setState({isOpen: false}, () => {
      this.props.navigation.replace('Home');
    });
  }

  handleLogout() {
    AsyncStorage.clear();
    this.setState({isOpen: false}, () => {
      this.props.navigation.replace('Home');
    });
  }

  handleTabNavigation = item => {
    var tabs = [...this.state.tabs];
    tabs.map(data => {
      if (data.id === item.id) {
        data.isSelected = true;
      } else {
        data.isSelected = false;
      }
      return;
    });
    this.setState({tabs: tabs});
  };

  render() {
    const menu = (
      <MainMenu
        navigator={this.props.navigation}
        onPress={this.toggleMenu}
        buttonLabel={strings.HOME}
        onMethodPress={this.handleHome}
        buttonLabelTwo={strings.LOGOUT}
        onMethodPressTwo={this.handleLogout}
      />
    );
    const {profile, userData} = this.state;
    return (
      <SideMenu
        menu={this.state.isOpen && menu}
        isOpen={this.state.isOpen}
        menuPosition="right"
        onChange={isOpen => this.updateMenuState(isOpen)}>
        <View style={styles.container}>
          <View style={styles.rowCenter}>
            <View style={styles.imageView}>
              <TouchableWithoutFeedback
                onPress={() => this.props.navigation.navigate('Home')}>
                <Image
                  style={styles.imageLogo}
                  source={icon.LOGOMAIN}
                  resizeMode="contain"
                />
              </TouchableWithoutFeedback>
            </View>
            <TouchableOpacity
              style={styles.toggleButton}
              onPress={this.toggleMenu}>
              <Image source={icon.TOGGLE} />
            </TouchableOpacity>
          </View>
          <KeyboardAwareScrollView enableOnAndroid={true}>
            <ScrollView>
              <View style={styles.containerView}>
                <View style={styles.profileInfoView}>
                  <View style={styles.profileLogoView}>
                    {profile !== '' ? (
                      <Image
                        style={styles.profileImage}
                        source={{uri: profile}}
                      />
                    ) : (
                      <Image
                        style={styles.defaultImage}
                        source={icon.PROFILE_DEFAULT}
                      />
                    )}
                  </View>
                  <View style={styles.userNameView}>
                    <Text style={styles.fname}>{userData.first_name}</Text>
                    <Text style={styles.lname}>{userData.last_name}</Text>
                  </View>
                </View>
                <View style={styles.dotted} />
                <View style={styles.infoTextView}>
                  <Text style={styles.infoText}>{strings.DASHBOARD_LABEL}</Text>
                </View>
                <View style={styles.tabMainView}>
                  <View style={styles.tabButtonRowView}>
                    <ScrollView
                      horizontal={true}
                      showsHorizontalScrollIndicator={false}>
                      {this.state.tabs.map(item => {
                        return (
                          <TouchableOpacity
                            key={item.id}
                            onPress={() => this.handleTabNavigation(item)}>
                            <View
                              style={[
                                styles.buttonView,
                                item.isSelected
                                  ? styles.bActive
                                  : styles.bInactive,
                              ]}>
                              <Text style={styles.tabButtonText}>
                                {item.value}
                              </Text>
                            </View>
                          </TouchableOpacity>
                        );
                      })}
                    </ScrollView>
                  </View>
                  <View style={styles.tabContentMainView}>
                    {this.state.tabs.map(item => {
                      if (item.id === 0 && item.isSelected === true) {
                        return (
                          <View key={item.id} style={styles.micBoxView}>
                            <MyMic currentTab={item.id} />
                          </View>
                        );
                      } else if (item.id === 1 && item.isSelected === true) {
                        return (
                          <View key={item.id} style={styles.micBoxView}>
                            <MyMic currentTab={item.id} />
                          </View>
                        );
                      } else if (item.id === 2 && item.isSelected === true) {
                        return (
                          <View key={item.id} style={styles.micBoxView}>
                            <AccountSettings avatar={this.state.avatar} />
                          </View>
                        );
                      } else if (item.id === 3 && item.isSelected === true) {
                        return (
                          <View key={item.id} style={styles.micBoxView}>
                            <IntrestedToParticipate />
                          </View>
                        );
                      }
                    })}
                  </View>
                </View>
              </View>
            </ScrollView>
          </KeyboardAwareScrollView>
        </View>
      </SideMenu>
    );
  }
}

const mapStateToProps = state => ({
  avatar: state.basicReducers.avatar,
});
export default connect(
  mapStateToProps,
  null,
)(DashBoard);
