import React, {PureComponent} from 'react';
import {View, Image, TouchableOpacity, Text} from 'react-native';
import {styles} from './styles';
import {icon} from '../../resource/icons';
import toggleMenu from '../../assets/images/openMic/icon/menu-white.png';
import strings from '../../resource/string';
//sidemenu
import SideMenu from 'react-native-side-menu';
//menu
import MainMenu from '../../components/menu/SideMenu';
import AsyncStorage from '@react-native-community/async-storage';
import {ScrollView} from 'react-native-gesture-handler';
import ParticipateModal from './ParticipateModal';

class MicDetailsScreen extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
      showModal: false,
    };
    this.toggleMenu = this.toggleMenu.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
    this.handleSignup = this.handleSignup.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
    this.handleDashboard = this.handleDashboard.bind(this);
    this.handleHome = this.handleHome.bind(this);
    this.handleToggleModal = this.handleToggleModal.bind(this);
  }

  componentDidMount() {
    this.checkAuth();
  }

  checkAuth() {
    AsyncStorage.getItem('user').then(data => {
      if (data) {
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
  toggleMenu() {
    this.setState({
      isOpen: !this.state.isOpen,
    });
  }

  updateMenuState(isOpen) {
    this.setState({isOpen});
  }

  handleLogin() {
    this.props.navigation.replace('LOGIN');
  }

  handleLogout() {
    this.setState({isAuthenticate: false});
    AsyncStorage.clear();
  }

  handleSignup() {
    this.props.navigation.replace('SIGNUP');
  }

  handleDashboard() {
    this.props.navigation.replace('DashBoard');
  }

  handleHome() {
    this.props.navigation.replace('Home');
  }

  handleToggleModal() {
    this.setState({showModal: !this.state.showModal});
  }

  render() {
    var menu;
    if (this.state.isAuthenticate === false) {
      menu = (
        <MainMenu
          navigator={this.props.navigation}
          onPress={this.toggleMenu}
          buttonLabel={strings.LOGIN}
          onMethodPress={this.handleLogin}
          onMethodPressTwo={this.handleSignup}
          buttonLabelTwo={strings.SIGNUP}
          buttonLabelHome={strings.HOME}
          onHomePress={this.handleHome}
        />
      );
    } else {
      menu = (
        <MainMenu
          navigator={this.props.navigation}
          onPress={this.toggleMenu}
          buttonLabelTwo={strings.LOGOUT}
          onMethodPressTwo={this.handleLogout}
          onMethodPress={this.handleDashboard}
          buttonLabel={strings.DASHBOARD}
        />
      );
    }
    const item = {
      id: 0,
      name: 'Comedy open Mic',
      time: '04:20 PM',
      day: 'Saturday',
      venue: 'Mickey Cafe',
      region: 'Bridgeport Gloucester',
      address: '1232- Fashion street',
      about:
        'This mic is for open to all. Main purpose of this mic is entertainment of the people.',
      icon: icon.MIC,
    };
    return (
      <SideMenu
        menu={this.state.isOpen && menu}
        isOpen={this.state.isOpen}
        menuPosition="right"
        onChange={isOpen => this.updateMenuState(isOpen)}>
        <View style={styles.container}>
          <View style={styles.rowCenter}>
            <View style={styles.imageView}>
              <Image
                style={styles.imageLogo}
                source={icon.LOGOMAIN}
                resizeMode="contain"
              />
            </View>
            <TouchableOpacity
              style={styles.toggleButton}
              onPress={this.toggleMenu}>
              <Image source={toggleMenu} />
            </TouchableOpacity>
          </View>
          <ScrollView>
            <View style={styles.micFirstView}>
              <View style={styles.micSecondView}>
                <View style={styles.micImageView}>
                  <Image
                    style={styles.micImage}
                    source={icon.MIC}
                    resizeMode="contain"
                  />
                </View>
              </View>
              <Text style={styles.micNameText}>{item.name}</Text>
              <View style={styles.timeView}>
                <Image style={styles.clockIcon} source={icon.ICON_CLOCK} />
                <Text>{item.time}, </Text>
                <Text>{item.day}</Text>
              </View>
              <View style={styles.timeView}>
                <Image style={styles.clockIcon} source={icon.ICON_LOCATION} />
                <Text>{item.venue}, </Text>
                <Text>{item.region}</Text>
              </View>
              <View style={styles.addressView}>
                <Text style={styles.addressText}>{item.address},</Text>
              </View>
              <View style={styles.timeView}>
                <Image
                  style={styles.clockIcon}
                  source={icon.ICON_CONTACT_BLACK}
                />
                <Text>{strings.MIC_CONTACT}</Text>
              </View>
              <View style={styles.addressView}>
                <Text style={styles.aboutMicText}>8866225367</Text>
                <Text style={styles.aboutMicText}>
                  krupal.citrusbug@gmail.com
                </Text>
              </View>
              <View style={styles.timeView}>
                <Image style={styles.clockIcon} source={icon.ICON_BEER} />
                <Text>No Drink Minimum</Text>
              </View>
              <View style={styles.timeView}>
                <Image style={styles.clockIcon} source={icon.ICON_PAYMENT} />
                <Text>PAID, $20</Text>
              </View>
              <View style={styles.timeView}>
                <Image style={styles.clockIcon} source={icon.ICON_MIC} />
                <Text>Best About The Mic</Text>
              </View>
              <View style={styles.addressView}>
                <Text style={styles.aboutMicText}>{item.about}</Text>
              </View>
              <View style={styles.requestBtnView}>
                <View style={styles.requestBtn}>
                  <TouchableOpacity onPress={this.handleToggleModal}>
                    <Text style={styles.requestBtnText}>
                      {strings.BTN_REQUEST_TO_PARTICIPATE}
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </ScrollView>
        </View>
        <ParticipateModal
          modalVisible={this.state.showModal}
          toggleModal={this.handleToggleModal}
        />
      </SideMenu>
    );
  }
}

export default MicDetailsScreen;
