import React, {PureComponent} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
} from 'react-native';
import Modal from 'react-native-modal';
import {RFPercentage} from 'react-native-responsive-fontsize';
import {
  widthPercentageToDP,
  heightPercentageToDP,
} from 'react-native-responsive-screen';
import colors from '../../resource/colors';
import strings from '../../resource/string';
import ButtonLogin from '../../components/buttons/ButtonLogin';
import {icon} from '../../resource/icons';
class ReSendMailModal extends PureComponent {
  handleReSendMail() {}
  render() {
    const {modalVisible, toggleModal} = this.props;
    console.log('modal', this.props);
    return (
      <Modal visible={modalVisible} animationType="slide" transparent={true}>
        <View style={styles.mainView}>
          <ScrollView>
            <View style={styles.emailImage}>
              <Image
                style={styles.emailLogo}
                source={icon.EMAIL}
                resizeMode="contain"
              />
            </View>
            <View style={styles.sendMailTextView}>
              <Text style={styles.sendMailText}>
                {strings.RESENDMAILTEXT}
                <Text style={styles.sendMailTextDark}>
                  {strings.RESENDMAILTEXT2}
                </Text>
              </Text>
            </View>
            <View style={styles.reSendButton}>
              <ButtonLogin
                label={strings.SENDMAIL}
                onPress={this.handleReSendMail}
                buttonColor={colors.DODGER_BLUE}
                textColor={colors.LIGHTGRAY}
              />
            </View>
            <View style={styles.dotted} />
            <View>
              <Text style={styles.footerText}>{strings.FOOTER_SENDMAIL}</Text>
            </View>
          </ScrollView>
          <View style={styles.rowView}>
            <TouchableOpacity style={styles.closeIcon} onPress={toggleModal}>
              <View>
                <Text style={styles.closeIconSize}>X</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    );
  }
}

let styles = StyleSheet.create({
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
  mainRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
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
  emailImage: {
    justifyContent: 'center',
    alignItems: 'center',
    margin: 20,
    flexDirection: 'row',
  },
  emailLogo: {
    width: widthPercentageToDP(30),
    height: widthPercentageToDP(30),
    alignSelf: 'center',
  },
  sendMailTextView: {
    justifyContent: 'center',
    alignItems: 'center',
    margin: 20,
  },
  sendMailText: {
    fontSize: RFPercentage(3),
    color: colors.DARKGRAY,
    textAlign: 'center',
    lineHeight: 44,
    letterSpacing: 0.4,
  },
  sendMailTextDark: {
    color: colors.BLACK,
    fontWeight: 'bold',
  },
  reSendButton: {
    justifyContent: 'center',
    alignItems: 'center',
    margin: 20,
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
  footerText: {
    fontSize: RFPercentage(1.5),
    overflow: 'scroll',
    margin: 10,
  },
});

export default ReSendMailModal;
