import {StyleSheet} from 'react-native';
import {RFPercentage} from 'react-native-responsive-fontsize';
import {
  widthPercentageToDP,
  heightPercentageToDP,
} from 'react-native-responsive-screen';
import colors from '../../resource/colors';


export const styles = StyleSheet.create({
  mainView: {
    width: widthPercentageToDP(90),
    height: heightPercentageToDP(80),
    alignSelf: 'center',
    backgroundColor: colors.WHITE,
    borderWidth: 1,
    borderRadius: 20,
    borderColor: '#ddd',
    borderBottomWidth: 0,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 1,
    marginLeft: 5,
    marginRight: 5,
    marginTop: 10,
    flexDirection: 'row',
  },
  rowView: {
    flexDirection: 'row',
    position: 'absolute',
    end: 0,
  },
  closeIcon: {
    margin: 20,
  },
  closeIconSize: {
    fontSize: RFPercentage(3),
  },
  ScrollableView: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoView: {
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10,
  },
  logoImage: {
    width: widthPercentageToDP(80),
    height: heightPercentageToDP(23),
  },
  micTypeView: {
    margin: 20,
  },
  micPickerText: {
    fontSize: 20,
  },
  micSearchView: {
    margin: 20,
  },
  searchText: {
    fontSize: 20,
  },
  searchInputView: {
    borderRadius: 5,
    borderWidth: 1,
    borderColor: colors.BG_GRAY,
  },
  searchInput: {
    width: widthPercentageToDP(80),
    padding: 10,
  },
  applyView: {
    margin: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonStyle: {
    borderRadius: 4,
    paddingVertical: 12,
    marginBottom: 12,
    borderRightWidth: StyleSheet.hairlineWidth,
    borderColor: 'rgba(255,255,255,0.7)',
    backgroundColor: colors.LIGHTGRAY,
    opacity: 1,
    width: widthPercentageToDP(80),
  },
  textSignUp: {
    color: colors.DODGER_BLUE,
    textAlign: 'center',
    height: 20,
  },
});