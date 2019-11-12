import React, {PureComponent} from 'react';
import {Provider} from 'react-redux';
import {store} from './src/redux/store';
import Index from './src/Index';
console.ignoredYellowBox = ['Warning: Each', 'Warning: Failed'];
console.disableYellowBox = true;
class App extends PureComponent {
  render() {
    return (
      <Provider store={store}>
        <Index />
      </Provider>
    );
  }
}
export default App;
