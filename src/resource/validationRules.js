import Snackbar from 'react-native-snackbar';

export const isValidEmail = email => {
  var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
};

export const isValidPassword = (password, len) => {
  return password.length >= len;
};

export const showMessage = message => {
  Snackbar.show({
    title: message,
    duration: Snackbar.LENGTH_SHORT,
  });
};
