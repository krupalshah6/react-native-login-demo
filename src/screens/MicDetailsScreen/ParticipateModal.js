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
import strings from '../../resource/string';
import FormTypeText from '../../components/inputElements/FormTypeText';
// formik
import {Formik} from 'formik';
import * as Yup from 'yup';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

class ParticipateModal extends PureComponent {
  handleReSendMail() {}
  render() {
    const {modalVisible, toggleModal} = this.props;
    const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
    const validationSchema = Yup.object().shape({
      fName: Yup.string()
        .label('fName')
        .required('Please enter first name'),
      lName: Yup.string()
        .label('lName')
        .required('Please enter last name'),
      email: Yup.string()
        .label('Email')
        .email('Enter a valid email')
        .required('Please enter email'),
      contactNo: Yup.string()
        .matches(phoneRegExp, 'Contact number is not valid')
        .required('Please enter contact number'),
      comment: Yup.string(),
    });
    return (
      <Modal visible={modalVisible} animationType="slide" transparent={true}>
        <View style={styles.mainView}>
          <KeyboardAwareScrollView enableOnAndroid={true}>
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
                    {strings.TEXT_PARTICIPATE}
                  </Text>
                </View>
                <View style={styles.dotted} />
                <View>
                  <Formik
                    initialValues={{
                      fName: '',
                      lName: '',
                      email: '',
                      contactNo: '',
                      comment: '',
                    }}
                    validationSchema={validationSchema}
                    onSubmit={values => {
                      this.toggleModal();
                    }}>
                    {({
                      handleChange,
                      handleBlur,
                      handleSubmit,
                      values,
                      errors,
                    }) => (
                      <View style={styles.form}>
                        <FormTypeText
                          value={values.fName}
                          onChangeText={handleChange('fName')}
                          onBlur={handleBlur('fName')}
                          placeholder={strings.FIRSTNAME}
                          error={errors.fName}
                          returnKeyType="next"
                        />
                        <FormTypeText
                          value={values.lName}
                          onChangeText={handleChange('lName')}
                          onBlur={handleBlur('lName')}
                          placeholder={strings.LASTNAME}
                          error={errors.lName}
                          returnKeyType="next"
                        />
                        <FormTypeText
                          value={values.contactNo}
                          onChangeText={handleChange('contactNo')}
                          onBlur={handleBlur('contactNo')}
                          placeholder={strings.CONTACTNO}
                          error={errors.contactNo}
                          returnKeyType="next"
                        />
                        <FormTypeText
                          value={values.email}
                          onChangeText={handleChange('email')}
                          onBlur={handleBlur('email')}
                          placeholder={strings.EMAILTEXT}
                          error={errors.email}
                          keyboardType="email-address"
                          returnKeyType="next"
                          autoCapitalize="none"
                        />
                        <FormTypeText
                          value={values.comment}
                          onChangeText={handleChange('comment')}
                          onBlur={handleBlur('comment')}
                          placeholder={strings.COMMENT}
                          returnKeyType="done"
                        />
                        <TouchableOpacity
                          style={styles.buttonStyle}
                          onPress={handleSubmit}>
                          <Text style={styles.textSignUp}>
                            {strings.BTN_SEND_YOUR_REQUEST}
                          </Text>
                        </TouchableOpacity>
                      </View>
                    )}
                  </Formik>
                </View>
              </View>
            </ScrollView>
          </KeyboardAwareScrollView>
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
    fontSize: RFPercentage(3),
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
  form: {
    flex: 1,
  },
});

export default ParticipateModal;
