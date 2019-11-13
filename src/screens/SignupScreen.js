import React, {PureComponent} from 'react';
import {View, StyleSheet, Image, Text, TouchableOpacity} from 'react-native';
import logo from '../assets/images/Logoforwhite2.png';
import colors from '../resource/colors';
import {widthPercentageToDP} from 'react-native-responsive-screen';
import strings from '../resource/string';
//sidemenu
import SideMenu from 'react-native-side-menu';
//menu
import MainMenu from '../components/menu/SideMenu';
//images
import micLogo from '../assets/images/logoMain.png';
import toggleMenu from '../assets/images/openMic/icon/menu-white.png';
class SignupScreen extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
    };
    this.toggleMenu = this.toggleMenu.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
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

  render() {
    const menu = (
      <MainMenu
        navigator={this.props.navigation}
        onPress={this.toggleMenu}
        isSignUp={true}
        isLogin={this.handleLogin}
      />
    );
    return (
      <SideMenu
        menu={this.state.isOpen && menu}
        isOpen={this.state.isOpen}
        menuPosition="right"
        onChange={isOpen => this.updateMenuState(isOpen)}>
        <View style={styles.container}>
          <View style={styles.rowCenter}>
            <View style={styles.imageView}>
              <Image source={micLogo} />
            </View>
            <TouchableOpacity
              style={styles.toggleButton}
              onPress={this.toggleMenu}>
              <Image source={toggleMenu} />
            </TouchableOpacity>
          </View>
          <View style={styles.SignUpView}>
            <Text style={styles.SignUpText}>{strings.SIGNUP_SMALL}</Text>
            <View style={styles.dotted} />
            <Text style={styles.signInfo}>{strings.SIGNUPTEXT}</Text>
            <View style={styles.form} />
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
    padding: 10,
  },
  toggleButton: {
    flexDirection: 'row',
    position: 'absolute',
    right: 0,
    padding: 20,
  },
  SignUpView: {
    flex: 1,
    margin: 20,
  },
  SignUpText: {
    fontSize: 26,
    color: colors.DARKGRAY,
    lineHeight: 40,
    paddingBottom: 15,
  },
  dotted: {
    marginTop: 10,
    marginBottom: 10,
    borderColor: colors.DARKGRAY,
    height: 0.52,
    width: widthPercentageToDP(90),
    borderRadius: 1, // hack for borderStyle.
    borderWidth: 0.52,
    borderStyle: 'dashed',
  },
  signInfo: {
    fontSize: 20,
    color: colors.DARKGRAY,
    lineHeight: 30,
  },
  form: {
    flex: 1,
    marginTop: 10,
  },
});
export default SignupScreen;
