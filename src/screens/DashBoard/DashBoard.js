import React, {PureComponent} from 'react';
import {
  View,
  Image,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Text,
} from 'react-native';
import {connect} from 'react-redux';
import NetInfo from '@react-native-community/netinfo';
import SideMenu from 'react-native-side-menu';
import MainMenu from '../../components/menu/SideMenu';
import strings from '../../resource/string';
import {icon} from '../../resource/icons';
import colors from '../../resource/colors';
import AsyncStorage from '@react-native-community/async-storage';
import {RFPercentage} from 'react-native-responsive-fontsize';

class DashBoard extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
      userData: {},
      avatar: [],
      profile: '',
    };
    this.toggleMenu = this.toggleMenu.bind(this);
    this.updateMenuState = this.updateMenuState.bind(this);
    this.handleHome = this.handleHome.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
  }

  static getDerivedStateFromProps(props, state) {
    if (props.avatar !== state.avatar) {
      return {
        avatar: props.avatar,
      };
    }
    return null;
  }

  componentDidMount() {
    this._subscription = NetInfo.addEventListener(
      this._handleConnectivityChange,
    );
  }

  componentWillUnmount() {
    this._subscription = NetInfo.removeEventListener(
      this._handleConnectivityChange,
    );
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.avatar !== this.props.avatar) {
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

  getUserProfile() {
    const {userData, avatar} = this.state;
    if (userData) {
      avatar &&
        avatar.map(item => {
          if (userData.profile_avtar === item.id) {
            this.setState({profile: item.profile_avtar_url});
          }
        });
    }
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
              <Image source={icon.LOGOMAIN} />
            </View>
            <TouchableOpacity
              style={styles.toggleButton}
              onPress={this.toggleMenu}>
              <Image source={icon.TOGGLE} />
            </TouchableOpacity>
          </View>
          <ScrollView>
            <View style={styles.containerView}>
              <View style={styles.profileLogoView}>
                {profile !== '' ? (
                  <Image style={styles.profileImage} source={{uri: profile}} />
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
          </ScrollView>
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
  containerView: {
    flexDirection: 'row',
  },
  profileLogoView: {
    margin: 20,
  },
  profileImage: {
    width: 60,
    height: 60,
  },
  defaultImage: {
    width: 60,
    height: 60,
  },
  userNameView: {
    flexDirection: 'row',
    marginTop: 40,
  },
  fname: {
    marginEnd: 10,
    fontSize: RFPercentage(3),
    textTransform: 'capitalize',
  },
  lname: {
    fontSize: RFPercentage(3),
    textTransform: 'capitalize',
  },
});

const mapStateToProps = state => ({
  avatar: state.basicReducers.avatar,
});
export default connect(
  mapStateToProps,
  null,
)(DashBoard);
