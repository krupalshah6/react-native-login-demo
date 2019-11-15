import {StyleSheet} from 'react-native';
import colors from '../../resource/colors';
import {
  widthPercentageToDP,
  heightPercentageToDP,
} from 'react-native-responsive-screen';
import { RFPercentage } from 'react-native-responsive-fontsize';

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
    width: widthPercentageToDP(40),
    backgroundColor: colors.WHITE,
    marginEnd: 5,
  },
  boxMain: {
    alignItems: 'center',
  },
  boxView: {
    borderRadius: 5,
    borderWidth: 1,
    borderColor: colors.BG_GRAY,
    padding: 10,
  },
  regionValueText: {
    color: colors.DARKGRAY,
    fontSize: RFPercentage(3),
    textAlign: 'center',
  },
  regionText: {
    textAlign: 'center',
    color: colors.DARKGRAY,
    fontSize: RFPercentage(2),
    backgroundColor: colors.WHITE,
    position: 'absolute',
    top: -7,
  },
  filterView: {
    width: widthPercentageToDP(40),
    marginStart: 5,
    backgroundColor: colors.WHITE,
  },
  filterViewBox: {
    padding: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: colors.BG_GRAY,
    // height: 40,
    alignItems: 'center',
  },
  filterText: {
    textAlign: 'center',
    color: colors.DARKGRAY,
    fontSize: RFPercentage(3),
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
});
