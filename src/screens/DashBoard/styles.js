import {StyleSheet} from 'react-native';
import colors from '../../resource/colors';
import {RFPercentage} from 'react-native-responsive-fontsize';
import {widthPercentageToDP, heightPercentageToDP} from 'react-native-responsive-screen';
import metrics from '../../resource/metrics';
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
  },
  imageLogo: {
    margin: 5,
    width: widthPercentageToDP(70),
    height: heightPercentageToDP(10),
  },
  toggleButton: {
    flexDirection: 'row',
    position: 'absolute',
    right: 0,
    padding: 20,
  },
  containerView: {
    backgroundColor: colors.BG_MAIN,
    flex: 1,
  },
  profileInfoView: {
    flexDirection: 'row',
  },
  profileLogoView: {
    margin: 20,
  },
  profileImage: {
    width: 60,
    height: 60,
  },
  defaultImage: {
    width: 60,
    height: 60,
  },
  userNameView: {
    flexDirection: 'row',
    marginTop: 40,
  },
  fname: {
    marginEnd: 10,
    fontSize: RFPercentage(3),
    textTransform: 'capitalize',
  },
  lname: {
    fontSize: RFPercentage(3),
    textTransform: 'capitalize',
  },
  dotted: {
    marginTop: 10,
    marginBottom: 10,
    marginStart: 20,
    marginEnd: 20,
    borderColor: colors.DARKGRAY,
    height: 0.52,
    width: widthPercentageToDP(80),
    borderRadius: 1, // hack for borderStyle.
    borderWidth: 0.52,
    borderStyle: 'dashed',
  },
  infoTextView: {
    marginStart: 20,
    marginEnd: 20,
    marginBottom: 10,
  },
  infoText: {
    fontSize: RFPercentage(3),
  },
  tabMainView: {
    backgroundColor: colors.WHITE,
    flex: 1,
  },
  tabButtonRowView: {
    flexDirection: 'row',
    margin: 20,
  },
  tabButtonText: {
    fontSize: RFPercentage(2.5),
    color: colors.BTN_TAB_GRAY,
    marginEnd: 7,
    marginStart: 7,
    textAlign: 'center',
    marginBottom: 20,
  },
  buttonView: {
    overflow: 'hidden',
    borderBottomWidth: 2,
  },
  bActive: {
    borderColor: colors.MIC_NAME,
  },
  bInactive: {
    borderColor: colors.BTN_TAB_GRAY,
  },
  tabContentMainView: {
    flex: 1,
  },
  micBoxView: {
    shadowOffset: {width: 1, height: 1},
    shadowColor: 'black',
    shadowOpacity: 0.9,
  },
});
