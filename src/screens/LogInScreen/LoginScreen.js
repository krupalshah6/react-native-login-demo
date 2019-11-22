import React, {PureComponent} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {
  View,
  Image,
  Text,
  TouchableOpacity,
  ScrollView,
  Keyboard,
  Switch,
} from 'react-native';
//sidemenu
import SideMenu from 'react-native-side-menu';
import AsyncStorage from '@react-native-community/async-storage';
import NetInfo from '@react-native-community/netinfo';
// styles
import {styles} from './styles';
// images
import {icon} from '../../resource/icons';
// strings
import strings from '../../resource/string';
//menu
import MainMenu from '../../components/menu/SideMenu';
// input type text
import FormTypeText from '../../components/inputElements/FormTypeText';
// formik
import {Formik} from 'formik';
import * as Yup from 'yup';
// error toast message
import {showMessage} from '../../resource/validationRules';
// actions
import {userLogin} from '../../redux/actions/authActions';

class LoginScreen extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
      fname: '',
      showPassword: true,
    };
    this.toggleMenu = this.toggleMenu.bind(this);
    this.handleSignUp = this.handleSignUp.bind(this);
    this.handleFirstName = this.handleFirstName.bind(this);
    this.toggleSwitch = this.toggleSwitch.bind(this);
    this.handleHome = this.handleHome.bind(this);
  }

  componentDidMount() {
    this._subscription = NetInfo.addEventListener(
      this._handleConnectivityChange,
    );
  }

  componentWillUnmount() {
    this._subscription = NetInfo.removeEventListener(
      this._handleConnectivityChange,
    );
  }

  _handleConnectivityChange = state => {
    this.setState({isConnected: state.isConnected}, () => {
    });
  };

  toggleMenu() {
    this.setState({
      isOpen: !this.state.isOpen,
    });
  }

  updateMenuState(isOpen) {
    this.setState({isOpen});
  }

  handleSignUp() {
    this.setState({isOpen: false}, () => {
      this.props.navigation.replace('SIGNUP');
    });
  }

  handleFirstName(fname) {
  }

  toggleSwitch() {
    this.setState({showPassword: !this.state.showPassword});
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
        buttonLabelTwo={strings.SIGNUP}
        onMethodPressTwo={this.handleSignUp}
      />
    );
    const validationSchema = Yup.object().shape({
      email: Yup.string()
        .label('Email')
        .email('Enter a valid email')
        .required('Please enter email'),
      password: Yup.string()
        .min(6, 'Password must be at least 6 characters')
        .required('Please enter password'),
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
          <ScrollView>
            <View style={styles.SignUpView}>
              <Text style={styles.SignUpText}>{strings.LOGIN_SMALL}</Text>
              <View style={styles.dotted} />
              <Text style={styles.signInfo}>{strings.SIGNUPTEXT}</Text>

              <Formik
                initialValues={{
                  email: '',
                  password: '',
                }}
                validationSchema={validationSchema}
                onSubmit={values => {
                  const {email, password} = values;
                  const userLoginData = {
                    email: email,
                    password: password,
                  };
                  if (!this.state.isConnected) {
                    showMessage(strings.NO_INTERNET_CONNECTION);
                    return;
                  }
                  Keyboard.dismiss();
                  this.props.userLogin(userLoginData).then(value => {
                    if (this.props.response === undefined) {
                      return;
                    }
                    const {status, message, data} = this.props.response;
                    if (status === false) {
                      showMessage(message);
                    } else if (status === true) {
                      AsyncStorage.setItem('user', JSON.stringify(data));
                      this.props.navigation.replace('DashBoard');
                    }
                  });
                }}>
                {({handleChange, handleBlur, handleSubmit, values, errors}) => (
                  <View style={styles.form}>
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
                    <TouchableOpacity
                      style={styles.buttonStyle}
                      onPress={handleSubmit}>
                      <Text style={styles.textSignUp}>{strings.LOGIN}</Text>
                    </TouchableOpacity>
                  </View>
                )}
              </Formik>
            </View>
          </ScrollView>
        </View>
      </SideMenu>
    );
  }
}

function mapStateToProps(state) {
  return {
    isBusy: state.authUser.isBusy,
    response: state.authUser.response,
    error: state.authUser.error,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    ...bindActionCreators({userLogin}, dispatch),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(LoginScreen);
