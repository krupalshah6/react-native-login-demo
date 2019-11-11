import {Dimensions} from 'react-native';

const {height, width} = Dimensions.get('window');

const metrics = {
  DEVICE_HEIGHT: width,
  DEVICE_WEIGHT: height,
};
export default metrics;
