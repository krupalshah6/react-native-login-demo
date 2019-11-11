import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import LoginScreen from './src/screens/LoginScreen';

const MainNavigator = createStackNavigator({
  LOGIN: {screen: LoginScreen, navigationOptions: {header: null}},
});

const App = createAppContainer(MainNavigator);

export default App;
