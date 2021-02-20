/** @format */

import React from 'react';
import {View, TouchableWithoutFeedback, StyleSheet} from 'react-native';
import Colors from '../Colors';

const FloatingView = ({customView}) => {
  return (
    <TouchableWithoutFeedback>
      <View style={styles.container}>{customView}</View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    shadowColor: Colors.black,
    shadowOpacity: 0.25,
    shadowRadius: 4,
    shadowOffset: {width: 2, height: 1},
    elevation: 5,
    borderWidth: 0,
  },
});

export default FloatingView;
