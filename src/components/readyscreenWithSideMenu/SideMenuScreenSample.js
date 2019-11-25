import React, {PureComponent} from 'react';
import {View, StyleSheet, Image, TouchableOpacity} from 'react-native';
import {
  widthPercentageToDP,
  heightPercentageToDP,
} from 'react-native-responsive-screen';
import colors from '../../resource/colors';
import {icon} from '../../resource/icons';
import toggleMenu from '../../assets/images/openMic/icon/menu-white.png';
import strings from '../../resource/string';
//sidemenu
import SideMenu from 'react-native-side-menu';
//menu
import MainMenu from '../../components/menu/SideMenu';
import AsyncStorage from '@react-native-community/async-storage';
class SideMenuScreenSample extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
    };
    this.toggleMenu = this.toggleMenu.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
    this.handleSignup = this.handleSignup.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
    this.handleDashboard = this.handleDashboard.bind(this);
    this.handleHome = this.handleHome.bind(this);
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
        </View>
      </SideMenu>
    );
  }
}

let styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  rowCenter: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.DARKGRAY,
  },
  imageView: {
    flexDirection: 'row',
  },
  imageLogo: {
    margin: 5,
    width: widthPercentageToDP(70),
    height: heightPercentageToDP(10),
  },
  toggleButton: {
    flexDirection: 'row',
    position: 'absolute',
    right: 0,
    padding: 20,
  },
});
export default SideMenuScreenSample;
