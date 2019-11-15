import {StyleSheet} from 'react-native';
import colors from '../../resource/colors';
import {
  widthPercentageToDP,
  heightPercentageToDP,
} from 'react-native-responsive-screen';

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
  theaterView: {
    flexDirection: 'row',
    backgroundColor: 'red',
    width: widthPercentageToDP(100),
    height: heightPercentageToDP(10),
  },
  theaterLogo: {
    width: widthPercentageToDP(100),
    height: heightPercentageToDP(10),
  },
  filterButton: {
    flexDirection: 'row',
    flex: 1,
    marginTop: 30,
    marginStart: 20,
    marginEnd: 20,
    marginBottom: 30,
  },
  regionView: {
    flex: 1,
    padding: 10,
  },
  filterView: {
    flex: 1,
    padding: 10,
  },
});
