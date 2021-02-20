import React, {useRef} from 'react';
import {Pressable, StyleSheet, Text, View, StatusBar} from 'react-native';
import {
  usePopup,
  TOAST_TYPE,
  TOAST_DURATION,
  POPUP_DIRECTION,
} from 'react-native-popup';

const Main = () => {
  /****************************** Config **************************************/
  const {
    showToast,
    showActionSheet,
    showFloatingView,
    showModal,
    showTooltip,
    hidePopup,
  } = usePopup();
  const toolTipAnchor = useRef(null);

  /****************************** Hooks ***************************************/

  /****************************** Functions ***********************************/
  const toast = () => {
    try {
      showToast({
        message: 'This is a toast',
        toastType: TOAST_TYPE.SUCCESS,
        duration: TOAST_DURATION.SHORT,
      });
    } catch (e) {
      console.log(e.message);
    }
  };

  const actionsheet = () => {
    showActionSheet({
      actionOptions: [
        {
          title: 'option 1',
          subtitle: 'detail goes here',
          onPress: () => {
            hidePopup();
          },
        },
        {
          title: 'option 2',
          disabled: true,
          actionTitleStyle: {color: 'red'},
          onPress: () => {
            hidePopup();
          },
        },
      ],
    });
  };

  const float = () => {
    showFloatingView({
      anchorPoint: {
        x: 220,
        y: 300,
      },
      popupDirection: POPUP_DIRECTION.BOTTOM,
      customView: <Text style={styles.floating}>Floating view goes there</Text>,
    });
  };

  const modal = () => {
    showModal({
      customView: <Text style={styles.floating}>Modal view</Text>,
      iconColor: 'blue',
    });
  };

  const tooltip = () => {
    toolTipAnchor.current.measureInWindow((x, y, width, height) => {
      const position = {
        x: x + width / 2,
        y: y + height,
      };
      showTooltip({
        anchorPoint: position,
        popupDirection: POPUP_DIRECTION.BOTTOM,
        text: 'Tooltip text goes here',
        style: {backgroundColor: 'blue'},
      });
    });
  };

  /****************************** Render **************************************/
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <Pressable onPress={toast} style={styles.button}>
        <Text style={styles.buttonText}>Toast</Text>
      </Pressable>
      <Pressable onPress={actionsheet} style={styles.button}>
        <Text style={styles.buttonText}>Actionsheet</Text>
      </Pressable>
      <Pressable onPress={float} style={styles.button}>
        <Text style={styles.buttonText}>Floating View</Text>
      </Pressable>
      <Pressable ref={toolTipAnchor} onPress={tooltip} style={styles.button}>
        <Text style={styles.buttonText}>Tooltip</Text>
      </Pressable>
      <Pressable onPress={modal} style={styles.button}>
        <Text style={styles.buttonText}>Modal</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    width: 200,
    height: 44,
    borderWidth: 1,
    borderColor: 'blue',
    color: 'blue',
    borderRadius: 4,
    marginVertical: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 16,
    color: 'blue',
    fontWeight: '600',
  },
  floating: {
    padding: 100,
    backgroundColor: 'white',
    borderRadius: 4,
  },
});

export default Main;
