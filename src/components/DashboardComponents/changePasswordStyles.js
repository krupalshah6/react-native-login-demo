import {StyleSheet} from 'react-native';
import colors from '../../resource/colors';
import {RFPercentage} from 'react-native-responsive-fontsize';

export const styles = StyleSheet.create({
  changePasswordView: {
    margin: 20,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: colors.BG_GRAY,
    flex: 1,
  },
  isCollapsed: {
    backgroundColor: colors.BG_MAIN,
  },
  notCollapsed: {
    backgroundColor: colors.WHITE,
  },
  wrappedView: {
    flexDirection: 'row',
  },
  chPassText: {
    marginStart: 10,
    marginTop: 20,
    marginBottom: 20,
    fontSize: RFPercentage(3),
  },
  plusTextView: {
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    flex: 1,
  },
  plusText: {
    alignSelf: 'flex-end',
    marginTop: 20,
    marginBottom: 20,
    marginEnd: 20,
    fontSize: RFPercentage(3),
  },
  changePasswordCollapsedView: {
    flexDirection: 'column',
    margin: 20,
  },
  oldPasswordView: {
    borderWidth: 1,
    borderColor: colors.BG_GRAY,
    borderRadius: 4,
    marginBottom: 20,
  },
  oldPasswordInput: {
    margin: 10,
  },
  labelOldPassword: {
    position: 'absolute',
    backgroundColor: colors.BG_MAIN,
    top: -10,
    marginStart: 10,
  },
  saveBtmMainView: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
  },
  saveBtnView: {
    backgroundColor: colors.LIGHTGRAY,
    borderRadius: 5,
  },
  saveBtnText: {
    margin: 10,
    color: colors.DODGER_BLUE,
    fontSize: RFPercentage(3),
  },
  selectAvatarView: {
    marginBottom: 20,
  },
  selectAvatarText: {
    fontSize: RFPercentage(3),
  },
  avatarMainView: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    borderWidth: 1,
    borderColor: colors.BG_GRAY,
    borderRadius: 4,
    flex: 1,
    justifyContent: 'space-between',
  },
  avatarImageStyle: {
    margin: 20,
    width: 60,
    height: 60,
  },
});
