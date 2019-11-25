import {StyleSheet} from 'react-native';
import colors from '../../resource/colors';
import { widthPercentageToDP, heightPercentageToDP } from 'react-native-responsive-screen';
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
  micFirstView: {
    margin: 20,
    backgroundColor: colors.WHITE,
    shadowColor: colors.BLACK,
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.5,
    shadowRadius: 2,
    elevation: 1,
  },
  micSecondView: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.WHITE,
    marginStart: 20,
    marginEnd: 20,
  },
  micImageView: {
    justifyContent: 'center',
    alignItems: 'center',
    marginStart: 20,
    marginEnd: 20,
  },
  micImage: {
    width: widthPercentageToDP(80),
    height: heightPercentageToDP(30),
  },
  micNameText: {
    color: colors.MIC_NAME,
    fontSize: RFPercentage(3),
    marginStart: 20,
    marginEnd: 20,
    marginTop: 10,
  },
  timeView: {
    flexDirection: 'row',
    marginStart: 20,
    marginEnd: 20,
    marginTop: 10,
  },
  clockIcon: {
    width: 20,
    height: 20,
    marginEnd: 10,
  },
  addressView: {
    marginStart: 50,
    marginEnd: 20,
    marginTop: 10,
  },
  addressText: {
    color: colors.BTN_TAB_GRAY,
  },
  aboutMicText: {
    color: colors.BTN_TAB_GRAY,
    marginBottom: 10,
  },
  requestBtnView: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  requestBtn: {
    borderWidth: 2,
    borderColor: colors.MIC_NAME,
    borderRadius: 70,
    backgroundColor: colors.BTN_REQ_PART,
    margin: 20,
  },
  requestBtnText: {
    color: colors.MIC_NAME,
    padding: 10,
    fontSize: RFPercentage(3),
  },
});