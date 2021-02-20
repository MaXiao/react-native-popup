/** @format */
import React from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import Colors from '../Colors';
import POPUP_DIRECTION from '../PopupDirection';

const ARROW_SIZE = 12;
// For an equilateral triangle it’s worth pointing out that the height is 86.6% of the width
// so (border-left-width + border-right-width) * 0.866% = border-bottom-width
const WIDTH_RATIO = 0.866;

const hDirection = [POPUP_DIRECTION.LEFT, POPUP_DIRECTION.RIGHT];

const ToolTip = ({
  text,
  popupDirection,
  anchorPoint,
  tooltipX,
  tooltipY,
  style,
}) => {
  let arrow;
  let arrowColor = style.backgroundColor || Colors.darkGray;

  const borderStyle = {
    borderLeftColor:
      popupDirection === POPUP_DIRECTION.LEFT ? arrowColor : Colors.transparent,
    borderRightColor:
      popupDirection === POPUP_DIRECTION.RIGHT
        ? arrowColor
        : Colors.transparent,
    borderTopColor:
      popupDirection === POPUP_DIRECTION.TOP ? arrowColor : Colors.transparent,
    borderBottomColor:
      popupDirection === POPUP_DIRECTION.BOTTOM
        ? arrowColor
        : Colors.transparent,
  };

  if (hDirection.includes(popupDirection)) {
    arrow = [
      {
        top: anchorPoint.y - tooltipY - ARROW_SIZE * WIDTH_RATIO,
        ...styles.hArrow,
      },
      borderStyle,
      popupDirection === POPUP_DIRECTION.LEFT ? styles.lArrow : styles.rArrow,
    ];
  } else {
    arrow = [
      {
        left: anchorPoint.x - tooltipX - ARROW_SIZE * WIDTH_RATIO,
        ...styles.vArrow,
      },
      borderStyle,
      popupDirection === POPUP_DIRECTION.TOP ? styles.tArrow : styles.bArrow,
    ];
  }

  return (
    <View style={styles.shadow}>
      <Text style={{...styles.text, ...style}}>{text}</Text>
      <View style={arrow} />
    </View>
  );
};

const styles = StyleSheet.create({
  shadow: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    backgroundColor: Colors.transparent,
  },
  text: {
    maxWidth: 300,
    backgroundColor: Colors.darkGray,
    borderRadius: 5,
    overflow: 'hidden',
    color: Colors.white,
    padding: 10,
    textAlign: 'center',
  },
  hArrow: {
    position: 'absolute',
    width: 0,
    height: 0,
    borderTopWidth: ARROW_SIZE,
    borderBottomWidth: ARROW_SIZE,
  },
  rArrow: {
    left: -ARROW_SIZE,
    borderRightWidth: ARROW_SIZE,
  },
  lArrow: {
    right: -ARROW_SIZE,
    borderLeftWidth: ARROW_SIZE,
  },
  vArrow: {
    position: 'absolute',
    width: 0,
    height: 0,
    borderRightWidth: ARROW_SIZE,
    borderLeftWidth: ARROW_SIZE,
  },
  bArrow: {
    top: -ARROW_SIZE,
    borderBottomWidth: ARROW_SIZE,
  },
  tArrow: {
    bottom: -ARROW_SIZE,
    borderTopWidth: ARROW_SIZE,
  },
});

export default ToolTip;
