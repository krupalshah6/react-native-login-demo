import React, {PureComponent} from 'react';
import {Provider} from 'react-redux';
import {store} from './src/redux/store';
import Index from './src/Index';
import {SafeAreaView} from 'react-native';
console.ignoredYellowBox = ['Warning: Each', 'Warning: Failed'];
console.disableYellowBox = true;
class App extends PureComponent {
  render() {
    return (
      <SafeAreaView style={{flex:1}}>
        <Provider store={store}>
          <Index />
        </Provider>
      </SafeAreaView>
    );
  }
}
export default App;
