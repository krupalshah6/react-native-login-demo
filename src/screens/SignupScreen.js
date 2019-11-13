import React, {PureComponent} from 'react';
import {
  View,
  StyleSheet,
  Image,
  Text,
  TouchableOpacity,
  Button,
} from 'react-native';
import logo from '../assets/images/Logoforwhite2.png';
import colors from '../resource/colors';
import {widthPercentageToDP} from 'react-native-responsive-screen';
import strings from '../resource/string';
//sidemenu
import SideMenu from 'react-native-side-menu';
//menu
import MainMenu from '../components/menu/SideMenu';
//images
import micLogo from '../assets/images/logoMain.png';
import toggleMenu from '../assets/images/openMic/icon/menu-white.png';
// input type text
import FormTypeText from '../components/inputElements/FormTypeText';
// formik
import {Formik} from 'formik';
import * as Yup from 'yup';

class SignupScreen extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
      fname: '',
    };
    this.toggleMenu = this.toggleMenu.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
    this.handleFirstName = this.handleFirstName.bind(this);
  }
  toggleMenu() {
    this.setState({
      isOpen: !this.state.isOpen,
    });
  }

  updateMenuState(isOpen) {
    this.setState({isOpen});
  }

  handleLogin() {
    this.setState({isOpen: false}, () => {
      this.props.navigation.goBack(null);
    });
  }

  handleFirstName(fname) {
    console.log('fname', fname);
  }

  render() {
    const menu = (
      <MainMenu
        navigator={this.props.navigation}
        onPress={this.toggleMenu}
        isSignUp={true}
        isLogin={this.handleLogin}
      />
    );
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
        .required('Please enter a registered email'),
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
              <Image source={micLogo} />
            </View>
            <TouchableOpacity
              style={styles.toggleButton}
              onPress={this.toggleMenu}>
              <Image source={toggleMenu} />
            </TouchableOpacity>
          </View>
          <View style={styles.SignUpView}>
            <Text style={styles.SignUpText}>{strings.SIGNUP_SMALL}</Text>
            <View style={styles.dotted} />
            <Text style={styles.signInfo}>{strings.SIGNUPTEXT}</Text>

            <Formik
              initialValues={{fName: '', lName: '', email: ''}}
              validationSchema={validationSchema}
              onSubmit={values => console.log(values)}>
              {({handleChange, handleBlur, handleSubmit, values, errors}) => (
                <View style={styles.form}>
                  <FormTypeText
                    value={values.fname}
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
                  <Button
                    style={styles.buttonStyle}
                    onPress={handleSubmit}
                    title="Submit"
                  />
                </View>
              )}
            </Formik>
          </View>
        </View>
      </SideMenu>
    );
  }
}

let styles = StyleSheet.create({
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
    padding: 10,
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
  },
});
export default SignupScreen;
