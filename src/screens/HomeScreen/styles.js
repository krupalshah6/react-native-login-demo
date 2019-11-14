import {StyleSheet} from 'react-native';
import colors from '../../resource/colors';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  rowCenter: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.DARKGRAY,
  },
  imageView: {
    flexDirection: 'row',
    padding: 10,
  },
  toggleButton: {
    flexDirection: 'row',
    position: 'absolute',
    right: 0,
    padding: 20,
  },
});
