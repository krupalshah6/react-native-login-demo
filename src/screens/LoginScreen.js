import React, {PureComponent} from 'react';
import {
  View,
  StyleSheet,
  Image,
  KeyboardAvoidingView,
  StatusBar,
  Text
} from 'react-native';
// colors
import colors from '../resource/colors';
// string
import strings from '../resource/string';
// button
import ButtonLogin from '../components/ButtonLogin';
//logo
import logo from '../assets/images/Logoforwhite2.png';
// input type text
import FormTypeText from '../components/FormTypeText';
// constants
import constants from '../resource/constants';
class LoginScreen extends PureComponent {
  passwordInputRef = React.createRef();
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      emailTouched: false,
      passwordTouched: false,
    };
    this.handleLogin = this.handleLogin.bind(this);
    this.handleEmail = this.handleEmail.bind(this);
    this.handlePassword = this.handlePassword.bind(this);
    this.handleEmailSubmitPress = this.handleEmailSubmitPress.bind(this);
    this.handleEmailBlur = this.handleEmailBlur.bind(this);
    this.handlePasswordBlur = this.handlePasswordBlur.bind(this);
  }

  handleEmail(email) {
    this.setState({email}, () => {
      console.log('email', this.state.email);
    });
  }

  handleEmailSubmitPress() {
    if (this.passwordInputRef.current) {
      this.passwordInputRef.current.focus();
    }
  }

  handlePassword(password) {
    this.setState({password}, () => {
      console.log('password', this.state.password);
    });
  }

  handleEmailBlur() {
    this.setState({emailTouched: true});
  }

  handlePasswordBlur() {
    this.setState({passwordTouched: true});
  }

  handleLogin() {
    console.log('login pressed');
  }

  render() {
    const {email, password, emailTouched, passwordTouched} = this.state;
    const emailError = !email && emailTouched ? strings.EMAILREQ : undefined;
    const passwordError =
      !password && passwordTouched ? strings.PASSREQ : undefined;

    return (
      <KeyboardAvoidingView
        style={styles.container}
        behavior={constants.IS_IOS ? 'padding' : undefined}>
        <StatusBar backgroundColor="#FFFFFF" barStyle="dark-content" />
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
            onBlur={this.handleEmailBlur}
            error={emailError}
            blurOnSubmit={constants.IS_IOS}
          />
          <FormTypeText
            value={this.state.password}
            ref={this.passwordInputRef}
            onChangeText={this.handlePassword}
            placeholder={strings.PASSWORD}
            secureTextEntry={true}
            returnKeyType="done"
            onBlur={this.handlePasswordBlur}
            error={passwordError}
          />
          <ButtonLogin
            label={strings.LOGIN}
            onPress={this.handleLogin}
            disabled={!email || !password}
          />
        </View>
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
    width: '80%',
    alignSelf: 'center',
    resizeMode: 'contain',
  },
  form: {
    flex: 1,
    width: '80%',
    justifyContent: 'center',
  },
});

export default LoginScreen;
