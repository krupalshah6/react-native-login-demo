import React, {PureComponent} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
} from 'react-native';
import Modal from 'react-native-modal';
import {RFPercentage} from 'react-native-responsive-fontsize';
import {
  widthPercentageToDP,
  heightPercentageToDP,
} from 'react-native-responsive-screen';
import colors from '../../resource/colors';
import {icon} from '../../resource/icons';
class ParticipantDetailsModal extends PureComponent {
  render() {
    const {modalVisible, toggleModal} = this.props;
    return (
      <Modal visible={modalVisible} animationType="slide" transparent={true}>
        <View style={styles.mainView}>
          <ScrollView>
            <View style={styles.logoView}>
              <Image
                style={styles.logoImage}
                source={icon.WHITELOGO}
                resizeMode="contain"
              />
            </View>
            <View style={styles.contactMainView}>
              <View>
                <Text style={styles.modalLabelText}>
                  Interested Participate
                </Text>
              </View>
              <View style={styles.dotted} />
              <View style={styles.grayBoxView}>
                <View style={styles.grayBoxRowView}>
                  <View style={styles.imageView}>
                    <Image source={icon.PROFILE_DEFAULT} />
                  </View>
                  <View style={styles.nameMainView}>
                    <View>
                      <Text style={styles.nameText}>Krupal Shah</Text>
                    </View>
                    <View>
                      <Text style={styles.commentText} numberOfLines={1}>
                        Test Comment Data
                      </Text>
                    </View>
                  </View>
                </View>
                <View style={styles.borderLine} />
                <View style={styles.userInfoView}>
                  <View style={styles.userInfoRowView}>
                    <View>
                      <Image style={styles.contactImage} source={icon.USER} />
                    </View>
                    <View style={styles.contactTextView}>
                      <Text style={styles.contactText}>8866225367</Text>
                    </View>
                  </View>
                </View>
                <View style={styles.userInfoView}>
                  <View style={styles.userInfoRowView}>
                    <View>
                      <Image style={styles.contactImage} source={icon.MAIL} />
                    </View>
                    <View style={styles.contactTextView}>
                      <Text style={styles.contactText} numberOfLines={1} >krupal.citrusbug@gmail.com</Text>
                    </View>
                  </View>
                </View>
              </View>
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
  logoView: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoImage: {
    width: widthPercentageToDP(80),
    height: heightPercentageToDP(23),
  },
  contactMainView: {
    marginStart: 20,
    marginEnd: 20,
  },
  modalLabelText: {
    fontSize: RFPercentage(4),
  },
  dotted: {
    marginTop: 10,
    marginBottom: 10,
    borderColor: colors.DARKGRAY,
    height: 0.52,
    width: widthPercentageToDP(80),
    borderRadius: 1, // hack for borderStyle.
    borderWidth: 0.52,
    borderStyle: 'dashed',
  },
  grayBoxView: {
    backgroundColor: colors.BG_MAIN,
  },
  grayBoxRowView: {
    flexDirection: 'row',
  },
  imageView: {
    marginStart: 20,
    marginTop: 20,
    marginBottom: 20,
  },
  nameMainView: {
    margin: 20,
  },
  nameText: {
    fontSize: RFPercentage(3),
  },
  commentText: {
    fontSize: RFPercentage(2.5),
    color: colors.GRAY_DARK_TEXT,
    maxWidth: widthPercentageToDP(40),
  },
  borderLine: {
    borderWidth: 1,
    borderColor: colors.BG_GRAY,
    marginStart: 20,
    marginBottom: 20,
    marginEnd: 20,
  },
  userInfoView: {
    marginStart: 20,
    marginEnd: 20,
    marginBottom: 20,
  },
  userInfoRowView: {
    flexDirection: 'row',
  },
  contactImage: {
    width: 40,
    height: 40,
  },
  contactTextView: {
    justifyContent: 'center',
    alignItems: 'center',
    marginStart: 20,
  },
  contactText: {
    fontSize: RFPercentage(2.5),
    color: colors.GRAY_DARK_TEXT,
    textAlign: 'center',
    marginEnd: 20,
  },
});

export default ParticipantDetailsModal;
