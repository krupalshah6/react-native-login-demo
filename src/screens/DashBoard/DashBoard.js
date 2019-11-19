import React, {PureComponent} from 'react';
import {
  View,
  Image,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';
import SideMenu from 'react-native-side-menu';
import MainMenu from '../../components/menu/SideMenu';
import strings from '../../resource/string';
import {icon} from '../../resource/icons';
import colors from '../../resource/colors';
import AsyncStorage from '@react-native-community/async-storage';

class DashBoard extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
      userData: {},
    };
    this.toggleMenu = this.toggleMenu.bind(this);
    this.updateMenuState = this.updateMenuState.bind(this);
    this.handleHome = this.handleHome.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
  }

  componentDidMount() {
    this.checkAuth();
  }

  checkAuth() {
    AsyncStorage.getItem('user').then(data => {
      if (data) {
        this.setState({userData: JSON.parse(data)});
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

  render() {
    console.log('user', this.state.userData);
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
    return (
      <SideMenu
        menu={this.state.isOpen && menu}
        isOpen={this.state.isOpen}
        menuPosition="right"
        onChange={isOpen => this.updateMenuState(isOpen)}>
        <View style={styles.container}>
          <View style={styles.rowCenter}>
            <View style={styles.imageView}>
              <Image source={icon.LOGOMAIN} />
            </View>
            <TouchableOpacity
              style={styles.toggleButton}
              onPress={this.toggleMenu}>
              <Image source={icon.TOGGLE} />
            </TouchableOpacity>
          </View>
        </View>
        <ScrollView>
          <View style={styles.containerView}>
            <View style={styles.profileLogoView} />
          </View>
        </ScrollView>
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
  containerView: {
    flex: 1,
  },
  profileLogoView: {
    margin: 20,
  },
});
export default DashBoard;
