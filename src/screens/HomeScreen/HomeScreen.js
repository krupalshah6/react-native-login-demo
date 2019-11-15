import React, {PureComponent} from 'react';
import {View, Image, TouchableOpacity, Button, Text} from 'react-native';
import {styles} from './styles';
//images
import micLogo from '../../assets/images/logoMain.png';
import toggleMenu from '../../assets/images/openMic/icon/menu-white.png';

//sidemenu
import SideMenu from 'react-native-side-menu';
//menu
import MainMenu from '../../components/menu/SideMenu';
import strings from '../../resource/string';
import {icon} from '../../resource/icons';
import RegionModal from './RegionModal';

class HomeScreen extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
      modalVisible: false,
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

  toggleModal = () => {
    this.setState({modalVisible: !this.state.modalVisible});
  };

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
            <TouchableOpacity
              style={styles.regionView}
              onPress={this.toggleModal}>
              <View style={styles.boxMain}>
                <View style={styles.boxView}>
                  <Text style={styles.regionValueText}>
                    Bridgeport Gloucester
                  </Text>
                </View>
                <Text style={styles.regionText}>{strings.BTN_REGION}</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity style={styles.filterView}>
              <View style={styles.filterViewBox}>
                <Text style={styles.filterText}>{strings.BTN_FILTER}</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
        <RegionModal
          modalVisible={this.state.modalVisible}
          toggleModal={this.toggleModal}
        />
        {this.state.modalVisible && <View style={styles.overlay} />}
      </SideMenu>
    );
  }
}

export default HomeScreen;
