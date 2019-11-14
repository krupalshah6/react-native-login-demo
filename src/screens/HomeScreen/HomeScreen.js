import React, {PureComponent} from 'react';
import {View, Image, TouchableOpacity} from 'react-native';
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

class HomeScreen extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
    };
    this.toggleMenu = this.toggleMenu.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
  }

  toggleMenu() {
    this.setState({
      isOpen: !this.state.isOpen,
    });
  }

  updateMenuState(isOpen) {
    this.setState({isOpen});
  }

  handleLogout() {
    AsyncStorage.clear();
    this.props.navigation.replace('LOGIN');
  }

  render() {
    const menu = (
      <MainMenu
        navigator={this.props.navigation}
        onPress={this.toggleMenu}
        buttonLabel={strings.LOGOUT}
        onMethodPress={this.handleLogout}
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
        </View>
      </SideMenu>
    );
  }
}

export default HomeScreen;
