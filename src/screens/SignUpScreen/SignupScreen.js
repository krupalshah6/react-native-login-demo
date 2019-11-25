import React, {PureComponent} from 'react';
import {
  View,
  Image,
  Text,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';
import {styles} from './styles';
import strings from '../../resource/string';
//sidemenu
import SideMenu from 'react-native-side-menu';
// formik
import {Formik} from 'formik';
import * as Yup from 'yup';
//menu
import MainMenu from '../../components/menu/SideMenu';
//images
import {icon} from '../../resource/icons';
// input type text
import FormTypeText from '../../components/inputElements/FormTypeText';
// Modal
import ReSendMailModal from './ReSendMailModal';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

class SignupScreen extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
      fname: '',
      modalVisible: false,
      showPassword: true,
      showPasswordConfirm: true,
    };
    this.toggleMenu = this.toggleMenu.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
    this.handleFirstName = this.handleFirstName.bind(this);
    this.toggleSwitch = this.toggleSwitch.bind(this);
    this.toggleSwitchConfirm = this.toggleSwitchConfirm.bind(this);
    this.handleHome = this.handleHome.bind(this);
  }
  toggleMenu() {
    this.setState({
      isOpen: !this.state.isOpen,
    });
  }

  updateMenuState(isOpen) {
    this.setState({isOpen});
  }

  handleFirstName(fname) {}

  toggleModal = () => {
    this.setState({modalVisible: !this.state.modalVisible});
  };

  toggleSwitch() {
    this.setState({showPassword: !this.state.showPassword});
  }

  toggleSwitchConfirm() {
    this.setState({showPasswordConfirm: !this.state.showPasswordConfirm});
  }

  handleLogin() {
    this.setState({isOpen: false}, () => {
      this.props.navigation.replace('LOGIN');
    });
  }

  handleHome() {
    this.setState({isOpen: false}, () => {
      this.props.navigation.replace('Home');
    });
  }

  render() {
    const menu = (
      <MainMenu
        navigator={this.props.navigation}
        onPress={this.toggleMenu}
        buttonLabel={strings.HOME}
        onMethodPress={this.handleHome}
        buttonLabelTwo={strings.LOGIN}
        onMethodPressTwo={this.handleLogin}
      />
    );
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
      password: Yup.string()
        .min(6, 'Password must be at least 6 characters')
        .required('Please enter password'),
      passwordConfirmation: Yup.string()
        .oneOf([Yup.ref('password')], 'Passwords are not the same!')
        .required('Please enter confirm password'),
      contactNo: Yup.string()
        .matches(phoneRegExp, 'Contact number is not valid')
        .required('Please enter contact number'),
    });

    return (
      <SideMenu
        menu={this.state.isOpen && menu}
        isOpen={this.state.isOpen}
        menuPosition="right"
        onChange={isOpen => this.updateMenuState(isOpen)}>
        <View style={styles.container}>
          <View style={styles.rowCenter}>
            <View style={styles.imageView}>
              <Image
                style={styles.imageLogo}
                source={icon.LOGOMAIN}
                resizeMode="contain"
              />
            </View>
            <TouchableOpacity
              style={styles.toggleButton}
              onPress={this.toggleMenu}>
              <Image source={icon.TOGGLE} />
            </TouchableOpacity>
          </View>
          <KeyboardAwareScrollView enableOnAndroid={true}>
            <ScrollView>
              <View style={styles.SignUpView}>
                <Text style={styles.SignUpText}>{strings.SIGNUP_SMALL}</Text>
                <View style={styles.dotted} />
                <Text style={styles.signInfo}>{strings.SIGNUPTEXT}</Text>

                <Formik
                  initialValues={{
                    fName: '',
                    lName: '',
                    email: '',
                    password: '',
                    passwordConfirmation: '',
                    contactNo: '',
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
                        value={values.email}
                        onChangeText={handleChange('email')}
                        onBlur={handleBlur('email')}
                        placeholder={strings.EMAILTEXT}
                        error={errors.email}
                        keyboardType="email-address"
                        returnKeyType="next"
                        autoCapitalize="none"
                      />
                      <View style={styles.passwordView}>
                        <View style={styles.passwordsecondView}>
                          <FormTypeText
                            value={values.password}
                            onChangeText={handleChange('password')}
                            onBlur={handleBlur('password')}
                            placeholder={strings.PASSWORDTEXT}
                            error={errors.password}
                            returnKeyType="next"
                            secureTextEntry={this.state.showPassword}
                          />
                        </View>
                        <TouchableOpacity
                          style={styles.switchView}
                          onPress={this.toggleSwitch}>
                          <Image
                            style={styles.eyeImage}
                            source={
                              this.state.showPassword
                                ? icon.EyeShow
                                : icon.EyeClose
                            }
                          />
                        </TouchableOpacity>
                      </View>
                      <View style={styles.passwordView}>
                        <View style={styles.passwordsecondView}>
                          <FormTypeText
                            value={values.passwordConfirmation}
                            onChangeText={handleChange('passwordConfirmation')}
                            onBlur={handleBlur('passwordConfirmation')}
                            placeholder={strings.CONPASSWORDTEXT}
                            error={errors.passwordConfirmation}
                            returnKeyType="next"
                            secureTextEntry={this.state.showPasswordConfirm}
                          />
                          <TouchableOpacity
                            style={styles.switchView}
                            onPress={this.toggleSwitchConfirm}>
                            <Image
                              style={styles.eyeImage}
                              source={
                                this.state.showPasswordConfirm
                                  ? icon.EyeShow
                                  : icon.EyeClose
                              }
                            />
                          </TouchableOpacity>
                        </View>
                      </View>

                      <FormTypeText
                        value={values.contactNo}
                        onChangeText={handleChange('contactNo')}
                        onBlur={handleBlur('contactNo')}
                        placeholder={strings.CONTACTNO}
                        error={errors.contactNo}
                        returnKeyType="done"
                      />
                      <TouchableOpacity
                        style={styles.buttonStyle}
                        onPress={handleSubmit}>
                        <Text style={styles.textSignUp}>{strings.SIGNUP}</Text>
                      </TouchableOpacity>
                    </View>
                  )}
                </Formik>
              </View>
            </ScrollView>
          </KeyboardAwareScrollView>
        </View>
        <ReSendMailModal
          modalVisible={this.state.modalVisible}
          toggleModal={this.toggleModal}
        />
      </SideMenu>
    );
  }
}

export default SignupScreen;
