import React, {PureComponent} from 'react';
import {View, Image, StyleSheet} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

// navigator library
import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
// icons
import {icon} from '../resource/icons';
//screens
import LoginScreen from './LogInScreen/LoginScreen';
import HomeScreen from './HomeScreen/HomeScreen';
import SignupScreen from './SignUpScreen/SignupScreen';
import DashBoard from './DashBoard/DashBoard';
// error message
import {showMessage} from '../resource/validationRules';
// network call
import {getRequest} from '../network/APIRequest';
// network path
import ApiUrls from '../network/APIUrl';
// check net info
import NetInfo from '@react-native-community/netinfo';
// strings
import strings from '../resource/string';
// actions
import {getAvatar} from '../redux/actions/basicActions';
// dispatch
import {dispatch} from '../redux/store';
/**
 * @class AppScreen
 */
/**
 * Navigator is used to define screens for app.
 * @method MainNavigator
 */

class LoaderScreen extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      userData: {},
    };
    this._bootstrapAsync();
  }

  componentDidMount() {
    NetInfo.isConnected.addEventListener(
      'connectionChange',
      this._handleConnectivityChange,
    );

    NetInfo.isConnected.fetch().done(isConnected => {
      if (isConnected === true) {
        this.getProfileAvatar();
        this.setState({isConnected: true});
      } else {
        this.setState({isConnected: false});
      }
    });
  }

  componentWillUnmount() {
    NetInfo.isConnected.removeEventListener(
      'connectionChange',
      this._handleConnectivityChange,
    );
  }

  _handleConnectivityChange = isConnected => {
    if (isConnected === true) {
      this.setState({isConnected: true});
    } else {
      this.setState({isConnected: false});
    }
  };

  /**
   * This method is used for set timeout to navigate screen after 1 second
   * @method _bootstrapAsync
   */
  _bootstrapAsync = async () => {
    AsyncStorage.getItem('user').then(value => {
      if (value) {
        this.setState({userData: value});
        this.props.navigation.navigate('withLogin');
      } else {
        this.props.navigation.navigate('withOutLogin');
      }
    });
  };

  async getProfileAvatar() {
    if (!this.state.isConnected) {
      showMessage(strings.NO_INTERNET_CONNECTION);
      return;
    }
    const result = await getRequest(ApiUrls.GET_AVATAR);
    if (result.code === 200 && result.status === true) {
      dispatch(getAvatar(result.data));
    }
  }

  render() {
    return <View style={Styles.container} />;
  }
}

const Styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    flex: 1,
    width: '80%',
    alignSelf: 'center',
    resizeMode: 'contain',
    margin: 10,
  },
});

const MainNavigator = createStackNavigator(
  {
    LOGIN: {screen: LoginScreen, navigationOptions: {header: null}},
    Home: {screen: HomeScreen, navigationOptions: {header: null}},
    SIGNUP: {screen: SignupScreen, navigationOptions: {header: null}},
    DashBoard: {screen: DashBoard, navigationOptions: {header: null}},
  },
  {initialRouteName: 'DashBoard'},
);

const LoginNavigator = createStackNavigator(
  {
    LOGIN: {screen: LoginScreen, navigationOptions: {header: null}},
    Home: {screen: HomeScreen, navigationOptions: {header: null}},
    SIGNUP: {screen: SignupScreen, navigationOptions: {header: null}},
    DashBoard: {screen: DashBoard, navigationOptions: {header: null}},
  },
  {initialRouteName: 'Home'},
);

const switchNavigator = createSwitchNavigator(
  {
    loader: LoaderScreen,
    withLogin: MainNavigator,
    withOutLogin: LoginNavigator,
  },
  {
    initialRouteName: 'loader',
  },
);

const AppScreen = createAppContainer(switchNavigator);
export default AppScreen;
