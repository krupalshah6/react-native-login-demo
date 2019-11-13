import React, {PureComponent} from 'react';
import {View, Image, StyleSheet} from 'react-native';
import logo from '../assets/images/Logoforwhite2.png';
import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import LoginScreen from './LoginScreen';
import HomeScreen from './HomeScreen';
import AsyncStorage from '@react-native-community/async-storage';
import SignupScreen from './SignupScreen';
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
        this.props.navigation.navigate('withoutLogin');
      }
    });
  };
  render() {
    return (
      <View style={Styles.container}>
        <Image style={Styles.logo} source={logo} />
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
  SIGNUP: {screen: SignupScreen, navigationOptions: {header: null}}
});

const switchNavigator = createSwitchNavigator(
  {
    loader: LoaderScreen,
    withLogin: MainNavigator,
    withoutLogin: LoginNavigator,
  },
  {
    initialRouteName: 'loader',
  },
);

const AppScreen = createAppContainer(switchNavigator);
export default AppScreen;
