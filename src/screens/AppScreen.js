import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import LoginScreen from './LoginScreen';
import HomeScreen from './HomeScreen';
/**
 * @class AppScreen
 */
/**
 * Navigator is used to define screens for app.
 * @method MainNavigator
 */
const MainNavigator = createStackNavigator({
  LOGIN: {screen: LoginScreen, navigationOptions: {header: null}},
  Home: {screen: HomeScreen, navigationOptions: {header: null}},
});

const AppScreen = createAppContainer(MainNavigator);
export default AppScreen;
