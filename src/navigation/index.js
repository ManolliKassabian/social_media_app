import React from 'react';
import Routes from './Routes';
import { AuthProvider } from './AuthProvider';
import { Provider } from 'react-redux';
import store from '../redux/store';

const Providers = () => {
  return (
    <Provider store={store}>
    <AuthProvider>
      <Routes />
    </AuthProvider>
    </Provider>
  );
}

export default Providers;