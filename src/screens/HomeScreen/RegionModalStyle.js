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
  textView: {
    textAlign: 'center',
    color: colors.DARKGRAY,
    fontSize: RFPercentage(3),
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
  regionImageMainView: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  regionImageStyle: {
    width: widthPercentageToDP(80),
    height: heightPercentageToDP(15),
    borderRadius: 10,
  },
  regionButtonText: {
    position: 'absolute',
    textAlign: 'center',
    color: colors.WHITE,
    fontSize: RFPercentage(3),
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.5)',
    borderRadius: 10,
  },
});