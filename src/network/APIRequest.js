import {AsyncStorage} from 'react-native';
export const postRequest = async (apiUrl, body, isHeader) => {
  let authHeader = null;
  if (isHeader) {
    authHeader = await AsyncStorage.getItem('Auth'); /// Add header
  }
  try {
    const response = await fetch(apiUrl, {
      credentials: 'include',
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        // eslint-disable-next-line prettier/prettier
        'authorization': authHeader,
      },
      body: JSON.stringify(body),
    });
    const responseJson = await response.json();
    return responseJson;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getRequest = async (apiUrl, isHeader) => {
  let authHeader = null;
  if (isHeader) {
    authHeader = await AsyncStorage.getItem('Auth'); /// Add header
  }
  try {
    const response = await fetch(apiUrl, {
      credentials: 'include',
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        // eslint-disable-next-line prettier/prettier
        'authorization': authHeader,
      },
    });
    const responseJson = await response.json();
    return responseJson;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const postImageRequest = async (
  apiUrl,
  field,
  imageUrl,
  body,
  isHeader,
) => {
  let authHeader = null;
  if (isHeader) {
    authHeader = await AsyncStorage.getItem('Auth'); /// Add header
  }
  try {
    const response = await fetch(apiUrl, {
      credentials: 'include',
      method: 'POST',
      headers: {
        'Content-Type': 'multipart/form-data',
        // eslint-disable-next-line prettier/prettier
        'authorization': authHeader,
      },
      body: createFormData(field, imageUrl, body),
    });
    const responseJson = await response.json();
    return responseJson;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const createFormData = (field, photo, body) => {
  const data = new FormData();

  data.append(field, {
    name: 'image.jpg',
    type: 'image/*',
    uri: photo,
  });

  Object.keys(body).forEach(key => {
    data.append(key, body[key]);
  });

  return data;
};
