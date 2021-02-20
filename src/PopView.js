/** @format */

import React, {useRef, useState, useEffect, useCallback} from 'react';
import {
  Animated,
  Dimensions,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import POPUP_MODE from './PopupMode';
import ActionSheet from './ActionSheet/ActionSheet';
import Toast from './Toast/Toast';
import FloatingView from './FloatingView/FloatingView';
import ToolTip from './Tooltip/ToolTip';
import ModalView from './Modal/ModalView';
import {usePopup} from './context';
import Colors from './Colors';
import TOAST_POSITION from './Toast/ToastPosition';
import POPUP_DIRECTION from './PopupDirection';
import TOAST_DURATION from './Toast/ToastDuration';

const WINDOW = Dimensions.get('window');
const SCREEN_WIDTH = WINDOW.width;
const SCREEN_HEIGHT = WINDOW.height;
const POPUP_ANIMATION_DURATION = 200;
const MINIMAL_MARGIN = 10;
const FLOATING_MARGIN = 14;

const PopView = ({options, cleanup}) => {
  /****************************** Config **************************************/
  const {hidePopup} = usePopup();
  const [height, setHeight] = useState(0);
  const [width, setWidth] = useState(0);
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const translateAnim = useRef(new Animated.Value(0)).current;

  /****************************** Hooks ***************************************/
  useEffect(() => {
    // wait for view to be laid out
    if (width === 0 || height === 0) {
      return;
    }
    if (options.shouldHide) {
      dismiss(options);
    } else {
      show(options);
    }
  }, [options, options.shouldHide, width, height, dismiss, show]);

  const recycle = useCallback(() => {
    cleanup?.(options.key);

    if (options.onDismissEnd) {
      options.onDismissEnd();
    }
  }, [cleanup, options]);

  const moveUp = useCallback(
    (fromOffScreen) => {
      translateAnim.setValue(fromOffScreen ? height : 0);
      Animated.timing(translateAnim, {
        toValue: fromOffScreen ? 0 : -height,
        duration: POPUP_ANIMATION_DURATION,
        useNativeDriver: true,
      }).start();
    },
    [height, translateAnim],
  );

  const moveDown = useCallback(
    (fromOffScreen) => {
      translateAnim.setValue(fromOffScreen ? -height : 0);
      Animated.timing(translateAnim, {
        toValue: fromOffScreen ? 0 : height,
        duration: POPUP_ANIMATION_DURATION,
        useNativeDriver: true,
      }).start();
    },
    [height, translateAnim],
  );

  const fadeIn = useCallback(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: POPUP_ANIMATION_DURATION,
      useNativeDriver: true,
    }).start((_) => {
      options.onShowEnd?.();
    });
  }, [fadeAnim, options]);

  const fadeOut = useCallback(
    (callback) => {
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: POPUP_ANIMATION_DURATION,
        useNativeDriver: true,
      }).start((_) => {
        callback?.();
      });
    },
    [fadeAnim],
  );

  const showToast = useCallback(() => {
    fadeIn();
    setTimeout(() => {
      hideToast();
    }, options.duration || TOAST_DURATION.NORMAL);
  }, [fadeIn, options.duration, hideToast]);

  const hideToast = useCallback(() => {
    fadeOut(() => {
      recycle();
    });
  }, [fadeOut, recycle]);

  const showActionSheet = useCallback(() => {
    fadeIn();
    moveUp(true);
  }, [fadeIn, moveUp]);

  const hideActionSheet = useCallback(() => {
    fadeOut(() => {
      recycle();
    });
    moveDown(false);
  }, [fadeOut, moveDown, recycle]);

  const showFloatingView = useCallback(() => {
    fadeIn();
  }, [fadeIn]);

  const hideFloatingView = useCallback(() => {
    fadeOut(() => {
      recycle();
    });
  }, [fadeOut, recycle]);

  const showModal = useCallback(() => {
    fadeIn();
  }, [fadeIn]);

  const hideModal = useCallback(() => {
    fadeOut(() => {
      recycle();
    });
  }, [fadeOut, recycle]);

  const show = useCallback(
    (opts) => {
      opts.onShowStart?.();

      switch (opts.mode) {
        case POPUP_MODE.ACTION_SHEET:
          showActionSheet();
          break;
        case POPUP_MODE.TOAST:
          showToast();
          break;
        case POPUP_MODE.FLOATING_VIEW:
        case POPUP_MODE.TOOL_TIP:
          showFloatingView();
          break;
        case POPUP_MODE.MODAL:
          showModal();
          break;
      }
    },
    [showActionSheet, showFloatingView, showModal, showToast],
  );

  const dismiss = useCallback(
    (opts) => {
      opts.onDismissStart?.();

      switch (opts.mode) {
        case POPUP_MODE.ACTION_SHEET:
          hideActionSheet();
          break;
        case POPUP_MODE.TOAST:
          hideToast();
          break;
        case POPUP_MODE.FLOATING_VIEW:
        case POPUP_MODE.TOOL_TIP:
          hideFloatingView();
          break;
        case POPUP_MODE.MODAL:
          hideModal();
          break;
      }
    },
    [hideActionSheet, hideFloatingView, hideModal, hideToast],
  );

  /****************************** Functions ***********************************/

  const child = () => {
    switch (options.mode) {
      case POPUP_MODE.ACTION_SHEET:
        return (
          <ActionSheet
            headerView={options.headerView}
            options={options.actionOptions}
          />
        );
      case POPUP_MODE.TOAST:
        return <Toast {...options} />;
      case POPUP_MODE.FLOATING_VIEW:
        return <FloatingView {...options} />;
      case POPUP_MODE.TOOL_TIP:
        const ttpos = floatingViewPosition();
        return <ToolTip {...options} tooltipX={ttpos.x} tooltipY={ttpos.y} />;
      case POPUP_MODE.MODAL:
        return <ModalView {...options} />;
      default:
        return null;
    }
  };

  const wrapperStyle = () => {
    switch (options.mode) {
      case POPUP_MODE.TOAST:
        return {justifyContent: options.position};
      default:
        return {};
    }
  };

  const containerStyle = () => {
    switch (options.mode) {
      case POPUP_MODE.ACTION_SHEET:
        return {position: 'absolute', bottom: 0, width: '100%'};
      case POPUP_MODE.TOAST:
        return {
          alignSelf: 'center',
          marginTop: options.position === TOAST_POSITION.TOP ? 80 : 0,
          marginBottom: options.position === TOAST_POSITION.BOTTOM ? 80 : 0,
        };
      case POPUP_MODE.FLOATING_VIEW:
      case POPUP_MODE.TOOL_TIP:
        const fpos = floatingViewPosition();
        return {position: 'absolute', top: fpos.y, left: fpos.x};
      case POPUP_MODE.MODAL:
        const mpos = modalViewPosition();
        return {position: 'absolute', top: mpos.y, left: mpos.x};
      default:
        return {};
    }
  };

  const floatingViewPosition = () => {
    switch (options.popupDirection) {
      case POPUP_DIRECTION.TOP:
        return adjustByEdges(
          options.anchorPoint.x - width / 2,
          options.anchorPoint.y - height - FLOATING_MARGIN,
        );
      case POPUP_DIRECTION.BOTTOM:
        return adjustByEdges(
          options.anchorPoint.x - width / 2,
          options.anchorPoint.y + FLOATING_MARGIN,
        );
      case POPUP_DIRECTION.LEFT:
        return adjustByEdges(
          options.anchorPoint.x - width - FLOATING_MARGIN,
          options.anchorPoint.y - height / 2,
        );
      case POPUP_DIRECTION.RIGHT:
        return adjustByEdges(
          options.anchorPoint.x + FLOATING_MARGIN,
          options.anchorPoint.y - height / 2,
        );
      default:
        return {x: 0, y: 0};
    }
  };

  const modalViewPosition = () => {
    return {
      x: (SCREEN_WIDTH - width) / 2,
      y: (SCREEN_HEIGHT - height) / 2,
    };
  };

  // check if the default floating view position is off the screen
  // Note: doesn't handle following issues:
  //        1. floating view is larger than screen size
  //        2. floating view overlap anchor component due to adjustment
  const adjustByEdges = (x, y) => {
    let adjustedX = x;
    let adjustedY = y;

    if (x + width > SCREEN_WIDTH - MINIMAL_MARGIN) {
      adjustedX = SCREEN_WIDTH - width - MINIMAL_MARGIN;
    } else if (x < MINIMAL_MARGIN) {
      adjustedX = MINIMAL_MARGIN;
    } else if (y + height + FLOATING_MARGIN > SCREEN_HEIGHT - MINIMAL_MARGIN) {
      adjustedY = SCREEN_HEIGHT - MINIMAL_MARGIN - FLOATING_MARGIN - height;
    } else if (y < MINIMAL_MARGIN) {
      adjustedY = MINIMAL_MARGIN;
    }

    return {x: adjustedX, y: adjustedY};
  };

  /****************************** Render **************************************/
  return (
    <TouchableWithoutFeedback
      disabled={options.disableDismiss}
      onPressIn={() => {
        hidePopup(options.key);
      }}>
      <View
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          height: '100%',
          width: '100%',
          backgroundColor: options.showOverlay
            ? Colors.black50
            : Colors.transparent,
          ...wrapperStyle(),
        }}>
        <Animated.View
          onLayout={({nativeEvent}) => {
            /**
             * For unknown reason height value fluctuates on some
             * iOS devices, this component to re-render infinitely.
             * Do this check to make sure it doesn't happen!
             */
            if (!width || !height) {
              setHeight(nativeEvent.layout.height);
              setWidth(nativeEvent.layout.width);
            }
          }}
          style={[
            containerStyle(),
            {
              opacity: fadeAnim,
              transform: [
                {
                  translateY: translateAnim,
                },
              ],
            },
          ]}>
          {child()}
        </Animated.View>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default PopView;
