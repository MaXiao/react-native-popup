/** @format */

import React from 'react';
import {StyleSheet} from 'react-native';
import TOAST_TYPE from './ToastType';
import {Text, View} from 'react-native';
import Colors from '../Colors';

const Toast = ({message, toastType, toastStyle = {}}) => {
  const textColor = () => {
    switch (toastType) {
      case TOAST_TYPE.INFO:
        return Colors.black;
      case TOAST_TYPE.ERROR:
        return Colors.red;
      case TOAST_TYPE.SUCCESS:
        return Colors.blue;
    }
  };

  return (
    <View style={styles.shadow}>
      <Text style={[{color: textColor()}, styles.text, toastStyle]}>
        {message}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  shadow: {
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.25,
    shadowRadius: 3,
    elevation: 4,
  },
  text: {
    fontSize: 16,
    backgroundColor: Colors.white,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 6,
    overflow: 'hidden',
  },
});

export default Toast;
