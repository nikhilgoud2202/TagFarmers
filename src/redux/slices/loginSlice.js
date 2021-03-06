import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { authLoginUrl } from '../urls';
import {
  storeAsyncData,
  clearAsyncData,
} from '../../components/common/asyncStorage';

export const initialState = {
  loading: false,
  userInfo: {},
  loginPassword: '',
  loginPasswordError: '',
  loginEmail: '',
  loginEmailError: '',
  loginError: '',
  devicetoken: '',
  reqFavPostedCount: {
    coursedetailscount: 0,
    requestedcoursescount: 0,
    myfavoritescount: 0,
  },
};

const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    setDeviceToken: (state, { payload }) => {
      state.devicetoken = payload;
    },
    loginStarted: state => {
      state.loading = true;
    },
    loginSuccess: (state, { payload }) => {
      state.userInfo = payload;
      state.loading = false;
      state.loginEmailError = '';
      state.loginPasswordError = '';
    },
    clearErrors: state => {
      state.loginEmailError = '';
      state.loginPasswordError = '';
      state.loginError = '';
    },
    loadUserInfo: (state, { payload }) => {
      state.userInfo = payload;
    },
    loginPasswordChanged: (state, { payload }) => {
      state.loginEmailError = '';
      state.loginPasswordError = '';
      state.loginPassword = payload;
    },
    loginFailure: state => {
      state.loading = false;
      state.loginError = 'Something went wrong, please try again later!';
    },
    passwordIncorrect: (state, { payload }) => {
      state.loginPasswordError = payload;
      state.loading = false;
    },
    EmailIncorrect: (state, { payload }) => {
      state.loginEmailError = payload;
      state.loading = false;
    },
    logoutSuccess: state => {
      state.userInfo = '';
      state.loginEmailError = '';
      state.loginPasswordError = '';
      state.loginError = '';
      state.loading = false;
    },
    setReqFavPostedCount: (state, { payload }) => {
      state.reqFavPostedCount = payload;
    },
  },
});

export const {
  setDeviceToken,
  loginStarted,
  loginSuccess,
  clearErrors,
  loginPasswordChanged,
  loginFailure,
  passwordIncorrect,
  EmailIncorrect,
  loadUserInfo,
  logoutSuccess,
  setReqFavPostedCount,
} = loginSlice.actions;

export const loginSelector = state => state.login;

export default loginSlice.reducer;

export function onLoginPressed(param) {
  console.log('insideonlogin');

  return async (dispatch, getState) => {
    console.log(param.email);
    dispatch(loginStarted());
    const devicetokenValue = getState().login.devicetoken;
    try {
      const response = await axios.post(authLoginUrl, {
        devicetoken: devicetokenValue,
        email: param.email,
        password: param.password,
      });
      console.log(response.data);
      if (response) {
        if (response.data.status === '404') {
          if (response.data.field === 'email') {
            dispatch(EmailIncorrect(response.data.error));
          }
          if (response.data.field === 'password') {
            dispatch(passwordIncorrect(response.data.error));
          }
        } else {
          dispatch(loginSuccess(response.data[0]));
          storeAsyncData('userInfo', response.data[0]);

          param.onSuccess();
        }
      } else {
        dispatch(loginFailure());
      }
    } catch (error) {
      dispatch(loginFailure());
    }
  };
}

export function logOutUser(param) {
  param.onSuccess();

  return async (dispatch, getState) => {
    dispatch(
      setReqFavPostedCount({
        coursedetailscount: 0,
        requestedcoursescount: 0,
        myfavoritescount: 0,
      }),
    );
    clearAsyncData();
    dispatch(logoutSuccess());
  };
}
