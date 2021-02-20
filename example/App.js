import React from 'react';
import Main from './Main';
import {PopupProvider} from 'react-native-popup';

export default function App() {
  return (
    <PopupProvider>
      <Main />
    </PopupProvider>
  );
}
