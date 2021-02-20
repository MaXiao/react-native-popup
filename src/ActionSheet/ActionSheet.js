/** @format */

import React from 'react';
import ActionSheetOption from './ActionSheetOption';
import {usePopup} from '../context';
import {View, StyleSheet} from 'react-native';
import Colors from '../Colors';

const ActionSheet = ({options, actionViews, headerView, containerStyle}) => {
  const {hidePopup} = usePopup();

  const actionCells =
    actionViews ||
    options.map((option, index) => (
      <ActionSheetOption
        {...option}
        key={option.title + index}
        onPress={() => {
          option.onPress();
          hidePopup();
        }}
      />
    ));

  return (
    <View style={styles.shadow}>
      <View style={containerStyle || styles.container}>
        {headerView}
        {actionCells}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  shadow: {
    shadowColor: Colors.black,
    shadowOpacity: 0.25,
    shadowRadius: 2,
    shadowOffset: {width: 1, height: -1},
    elevation: 4,
  },
  container: {
    flex: 1,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    backgroundColor: '#fff',
    width: '100%',
    justifyContent: 'flex-start',
    paddingBottom: 50,
    overflow: 'hidden',
  },
});

export default ActionSheet;
