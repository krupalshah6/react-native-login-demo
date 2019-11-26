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
  SignUpView: {
    flex: 1,
    margin: 20,
  },
  SignUpText: {
    fontSize: 26,
    color: colors.DARKGRAY,
    lineHeight: 40,
    paddingBottom: 15,
  },
  dotted: {
    marginTop: 10,
    marginBottom: 10,
    borderColor: colors.DARKGRAY,
    height: 0.52,
    width: widthPercentageToDP(90),
    borderRadius: 1, // hack for borderStyle.
    borderWidth: 0.52,
    borderStyle: 'dashed',
  },
  signInfo: {
    fontSize: 20,
    color: colors.DARKGRAY,
    lineHeight: 30,
  },
  form: {
    flex: 1,
    marginTop: 10,
  },
  buttonStyle: {
    borderRadius: 4,
    paddingVertical: 12,
    marginBottom: 12,
    borderRightWidth: StyleSheet.hairlineWidth,
    borderColor: 'rgba(255,255,255,0.7)',
    backgroundColor: colors.LIGHTGRAY,
    opacity: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textSignUp: {
    color: colors.DODGER_BLUE,
    textAlign: 'center',
    height: 20,
  },
  passwordView: {
    flexDirection: 'row',
  },
  passwordsecondView: {
    flex: 1,
  },
  switchView: {
    position: 'absolute',
    end: 0,
    margin: 3,
  },
  eyeImage: {
    height: 30,
    width: 30,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
});
