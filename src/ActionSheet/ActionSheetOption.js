/** @format */

import React from 'react';
import {View, Text, StyleSheet, Pressable} from 'react-native';
import Colors from '../Colors';

const ActionSheetOption = ({
  title,
  subtitle,
  actionStyle = {},
  actionTitleStyle = {},
  actionSubtitleStyle = {},
  onPress,
  disabled,
}) => {
  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      style={({pressed}) => [
        {
          opacity: disabled ? 0.3 : pressed ? 0.7 : 1,
        },
      ]}>
      <View style={{...styles.actionContainer, ...actionStyle}}>
        <Text style={{...styles.title, ...actionTitleStyle}}>{title}</Text>
        {!!subtitle && (
          <Text style={{...styles.subtitle, ...actionSubtitleStyle}}>
            {subtitle}
          </Text>
        )}
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  actionContainer: {
    flex: 1,
    paddingVertical: 20,
    paddingHorizontal: 30,
    height: 75,
    width: '100%',
    borderBottomWidth: 1,
    borderBottomColor: Colors.borderGray,
    justifyContent: 'center',
  },
  title: {fontSize: 16},
  subtitle: {color: Colors.gray, marginTop: 6},
});

export default ActionSheetOption;
