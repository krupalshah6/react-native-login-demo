import {StyleSheet} from 'react-native';
import colors from '../../resource/colors';
import {
  widthPercentageToDP,
  heightPercentageToDP,
} from 'react-native-responsive-screen';
import {RFPercentage} from 'react-native-responsive-fontsize';

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
    marginTop: 30,
    marginStart: 20,
    marginEnd: 20,
    marginBottom: 30,
  },
  regionView: {
    flex: 1,
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
    flex: 1,
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
  tabButtonMainView: {
    margin: 20,
    flexDirection: 'row',
  },
  buttonView: {
    borderRadius: 5,
    padding: 5,
    margin: 5,
    borderStyle: 'solid',
    overflow: 'hidden',
    borderBottomWidth: 2,
  },
  bActive: {
    borderColor: colors.DODGER_BLUE,
  },
  bInactive: {
    borderColor: colors.BTN_TAB_GRAY,
  },
  tabButtonText: {
    fontSize: RFPercentage(2.2),
  },
  active: {
    color: colors.DODGER_BLUE,
  },
  inactive: {
    color: colors.BTN_TAB_GRAY,
  },
  weekDaysView: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  btn_View: {
    backgroundColor: colors.LIGHTGRAY,
    marginStart: 20,
    marginEnd: 20,
    width: widthPercentageToDP(80),
    borderRadius: 4,
  },
  weekDaysText: {
    color: colors.DODGER_BLUE,
    fontSize: RFPercentage(2.2),
    padding: 10,
    textAlign: 'center',
  },
});
