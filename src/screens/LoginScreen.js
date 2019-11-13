import React, {PureComponent} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {
  View,
  StyleSheet,
  Image,
  KeyboardAvoidingView,
  Keyboard,
  Text,
} from 'react-native';
// colors
import colors from '../resource/colors';
// string
import strings from '../resource/string';
// button
import ButtonLogin from '../components/buttons/ButtonLogin';
//logo
import logo from '../assets/images/Logoforwhite2.png';
// input type text
import FormTypeText from '../components/inputElements/FormTypeText';
// constants
import constants from '../resource/constants';
// actions
import {userLogin} from '../redux/actions/authActions';
// responsive hight width
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

// validation rules
import {
  isValidEmail,
  isValidPassword,
  showMessage,
} from '../resource/validationRules';
// error strings
import errorStrings from '../resource/errorString';
// loader
import MainLoader from '../components/loaders/MainLoader';

import AsyncStorage from '@react-native-community/async-storage';
import NetInfo from '@react-native-community/netinfo';
import {TouchableOpacity} from 'react-native-gesture-handler';
/**
 * Login module with custom  validation and solved keyboard glitch.
 * @module LoginScreen
 */

/**
 * @class LoginScreen
 */

class LoginScreen extends PureComponent {
  passwordInputRef = React.createRef();
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      isDisabled: false,
      emailError: '',
      passwordError: '',
      isConnected: false,
    };
    this.handleLogin = this.handleLogin.bind(this);
    this.handleEmail = this.handleEmail.bind(this);
    this.handlePassword = this.handlePassword.bind(this);
    this.handleEmailSubmitPress = this.handleEmailSubmitPress.bind(this);
    this.handleSignUp = this.handleSignUp.bind(this);
  }

  componentDidMount() {
    this._subscription = NetInfo.addEventListener(
      this._handleConnectivityChange,
    );
  }

  _handleConnectivityChange = state => {
    this.setState({isConnected: state.isConnected}, () => {
      console.log('net', this.state.isConnected);
    });
  };

  /**
   * Returns value of email
   *
   * @method handleEmail
   * @return {String} value of email
   * @param {String} email
   */

  handleEmail(email) {
    this.setState({email}, () => {
      if (this.state.email === '') {
        this.setState({isDisabled: true, emailError: errorStrings.EMAILREQ});
      } else {
        if (isValidEmail(email)) {
          this.setState({isDisabled: false, emailError: ''});
        } else {
          this.setState({
            isDisabled: true,
            emailError: errorStrings.EMAILVALID,
          });
        }
      }
    });
  }

  /**
   * Set focus of text field using reference
   *
   * @method handleEmailSubmitPress
   */

  handleEmailSubmitPress() {
    if (this.passwordInputRef.current) {
      this.passwordInputRef.current.focus();
    }
  }

  /**
   * Returns value of password
   *
   * @method handlePassword
   * @return {String} value of password
   * @param {String} password
   */
  handlePassword(password) {
    this.setState({password}, () => {
      if (this.state.password === '') {
        this.setState({passwordError: errorStrings.PASSREQ, isDisabled: true});
      } else {
        if (!isValidPassword(password, 6)) {
          this.setState({
            passwordError: errorStrings.PASSWORDVALID,
            isDisabled: true,
          });
        } else {
          this.setState({passwordError: '', isDisabled: false});
        }
      }
    });
  }
  handleLogin() {
    const {email, password} = this.state;
    if (email === '') {
      this.setState({emailError: errorStrings.EMAILREQ});
      return;
    }
    if (password === '') {
      this.setState({passwordError: errorStrings.PASSREQ});
      return;
    }
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
        this.props.navigation.replace('Home');
      }
    });
    //
  }

  handleSignUp() {
    this.props.navigation.navigate('SIGNUP');
  }

  render() {
    const {emailError, passwordError, isDisabled} = this.state;
    return (
      <KeyboardAvoidingView
        style={styles.container}
        behavior={constants.IS_IOS ? 'padding' : undefined}>
        <Image source={logo} style={styles.imageLogo} />
        <View style={styles.form}>
          <FormTypeText
            value={this.state.email}
            onChangeText={this.handleEmail}
            onSubmitEditing={this.handleEmailSubmitPress}
            placeholder={strings.EMAIL}
            autoCorrect={false}
            keyboardType="email-address"
            returnKeyType="next"
            error={emailError}
            blurOnSubmit={constants.IS_IOS}
            autoCapitalize="none"
          />
          <FormTypeText
            value={this.state.password}
            ref={this.passwordInputRef}
            onChangeText={this.handlePassword}
            placeholder={strings.PASSWORD}
            secureTextEntry={true}
            returnKeyType="done"
            error={passwordError}
          />
          <ButtonLogin
            label={strings.LOGIN}
            onPress={this.handleLogin}
            disabled={isDisabled}
            buttonColor={colors.DODGER_BLUE}
            textColor={colors.WHITE}
          />
          <TouchableOpacity style={styles.forgotPassword}>
            <Text style={styles.forgotPasswordText}>
              {strings.FORGOT_PASSWORD}
            </Text>
          </TouchableOpacity>
          <ButtonLogin
            label={strings.SIGNUP}
            onPress={this.handleSignUp}
            disabled={isDisabled}
            buttonColor={colors.LIGHTGRAY}
            textColor={colors.DODGER_BLUE}
          />
        </View>
        {this.props.isBusy ? <MainLoader /> : null}
      </KeyboardAvoidingView>
    );
  }
}

let styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.WHITE,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  imageLogo: {
    flex: 1,
    width: wp(80),
    alignSelf: 'center',
    resizeMode: 'contain',
  },
  form: {
    flex: 1,
    width: wp(80),
    justifyContent: 'center',
  },
  forgotPassword: {
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    marginBottom: 40,
  },
  forgotPasswordText: {
    color: colors.DODGER_BLUE,
    fontSize: 16,
  },
});

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
