import {Platform} from 'react-native';

const constants = {
  IS_DEVELOPMENT: __DEV__,
  IS_ANDROID: Platform.OS === 'android',
  IS_IOS: Platform.OS === 'ios',
  IS_DEBUG_MODE_ENABLE: Boolean(window.navigator.userAgent),
};
export default constants;
