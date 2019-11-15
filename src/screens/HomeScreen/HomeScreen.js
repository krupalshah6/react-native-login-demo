import React, {PureComponent} from 'react';
import {View, Image, TouchableOpacity, Button} from 'react-native';
import {styles} from './styles';
//images
import micLogo from '../../assets/images/logoMain.png';
import toggleMenu from '../../assets/images/openMic/icon/menu-white.png';

//sidemenu
import SideMenu from 'react-native-side-menu';
//menu
import MainMenu from '../../components/menu/SideMenu';
import AsyncStorage from '@react-native-community/async-storage';
import strings from '../../resource/string';
import {icon} from '../../resource/icons';
import metrics from '../../resource/metrics';

class HomeScreen extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
    };
    this.toggleMenu = this.toggleMenu.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
    this.handleSignup = this.handleSignup.bind(this);
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

  handleSignup() {
    this.props.navigation.replace('SIGNUP');
  }

  render() {
    const menu = (
      <MainMenu
        navigator={this.props.navigation}
        onPress={this.toggleMenu}
        buttonLabel={strings.LOGIN}
        onMethodPress={this.handleLogin}
        onMethodPressTwo={this.handleSignup}
        buttonLabelTwo={strings.SIGNUP}
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
          <View style={styles.theaterView}>
            <Image style={styles.theaterLogo} source={icon.THEATER} />
          </View>
          <View style={styles.filterButton}>
            <View style={styles.regionView}>
              <Button title="Change Region" />
            </View>
            <View style={styles.filterView}>
              <Button title="Apply Filter" />
            </View>
          </View>
        </View>
      </SideMenu>
    );
  }
}

export default HomeScreen;
