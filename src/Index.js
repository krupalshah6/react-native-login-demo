import React, {PureComponent} from 'react';
import {createSwitchNavigator, createAppContainer} from 'react-navigation';
import {View, Image, StyleSheet} from 'react-native';
import AppScreen from './screens/AppScreen';
import logo from './assets/images/Logoforwhite2.png';
/**
 * This class defines splash screen and it's navigation with switch navigator.
 * @class SplashScreen
 */
class SplashScreen extends PureComponent {
  constructor(props) {
    super(props);
    this._bootstrapAsync();
  }
  /**
   * This method is used for set timeout to navigate screen after 1 second
   * @method _bootstrapAsync
   */
  _bootstrapAsync = async () => {
    clearTimeout(this.searchWaiting);
    this.searchWaiting = setTimeout(() => {
      this.props.navigation.navigate('App');
    }, 1000);
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
    margin: 10,
  },
});

const switchNavigator = createSwitchNavigator(
  {
    Splash: SplashScreen,
    App: AppScreen,
  },
  {
    initialRouteName: 'Splash',
  },
);

const index = createAppContainer(switchNavigator);
export default index;
