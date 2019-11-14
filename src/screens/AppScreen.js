import React, {PureComponent} from 'react';
import {View, Image, StyleSheet} from 'react-native';
// navigator library
import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
// icons
import {icon} from '../resource/icons';
//screens
import AsyncStorage from '@react-native-community/async-storage';
import LoginScreen from './LogInScreen/LoginScreen';
import HomeScreen from './HomeScreen/HomeScreen';
import SignupScreen from './SignUpScreen/SignupScreen';

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
    this._bootstrapAsync();
  }
  /**
   * This method is used for set timeout to navigate screen after 1 second
   * @method _bootstrapAsync
   */
  _bootstrapAsync = async () => {
    AsyncStorage.getItem('user').then(value => {
      if (value) {
        this.props.navigation.navigate('withLogin');
      } else {
        this.props.navigation.navigate('withOutLogin');
      }
    });
  };
  render() {
    return (
      <View style={Styles.container}>
        <Image style={Styles.logo} source={icon.WHITELOGO} />
      </View>
    );
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
  },
  {initialRouteName: 'Home'},
);

const LoginNavigator = createStackNavigator({
  LOGIN: {screen: LoginScreen, navigationOptions: {header: null}},
  Home: {screen: HomeScreen, navigationOptions: {header: null}},
  SIGNUP: {screen: SignupScreen, navigationOptions: {header: null}},
});

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
