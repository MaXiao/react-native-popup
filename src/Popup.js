/** @format */

import React, {useState, useImperativeHandle} from 'react';
import PopView from './PopView';

/*
 * Param:
 *   showOverlay: display a gray translucent full screen overlay
 *   disableDismiss: disable default touch view to dismiss popup
 *   onDismissStart: call this function on start of dismiss animation
 *   onDismissEnd: call this function on end of dismiss animation
 *   onShowStart: call this function on start of show animation
 *   onShowEnd: call this function on start of show animation
 *
 *   Modal:
 *     customView: actual view needs to be displayed
 *     showDismiss: flag to decide if showing a dismiss button on top right corner. default true
 *
 *   Action Sheet:
 *     options, an array of ActionSheetOption, which has title, subtitle, onPress and isDestructive
 *     actionViews, alternative to options, take a list of customized option view. It could be anything
 *     headerView, header of the action sheet
 *     containerStyle, layout style of the action sheet wrapper
 *
 *   Floating view:
 *     anchorPoint, coordinate in the form of {x, y}
 *     popupDirection, a POPUP_DIRECTION value
 *     customView, the actual view needs to be displayed
 *
 *   Toast:
 *     message: text message shown in toast
 *     toastType: a TOAST_TYPE value
 *     toastStyle: customize toast style
 *     duration: NOT IMPLEMENTED, duration before toast is dismissed
 *
 *   Tooltip:
 *     anchorPoint, coordinate in the form of {x, y}
 *     popupDirection, a POPUP_DIRECTION value
 *     text, text to be displayed in the tool tip
 *     style, customize tooltip style
 *
 *   If include a ScrollView as customView in Modal or FloatingView. please use ModalScrollView instead.
 * */
const Popup = React.forwardRef((props, ref) => {
  const [optionsArray, setOptionsArray] = useState([]);

  useImperativeHandle(ref, () => ({
    show: (opts) => {
      // it doesn't guarantee uniqueness, but should be ok in this context.
      // We don't expect to have more than a few popups displaying at the same time
      // not along to be triggered at the exact same moment.
      const key = Date.now();
      setOptionsArray([...optionsArray, {...opts, key: key}]);
      return key;
    },
    hide: (opts) => {
      const update = [...optionsArray];

      let target = null;
      if (opts?.key && typeof opts?.key === 'string') {
        for (const opt of update) {
          if (opt.key === opts?.key) {
            target = opt;
          }
        }
      } else {
        if (update.length > 0) {
          target = update[0];
        }
      }

      if (target) {
        target.shouldHide = true;
        if (opts?.onDismissStart) {
          target.onDismissStart = opts?.onDismissStart;
        }
        if (opts?.onDismissEnd) {
          target.onDismissEnd = opts?.onDismissEnd;
        }
      }

      setOptionsArray(update);
    },
  }));

  const recycle = (key) => {
    let newArray = optionsArray.filter((options) => options.key !== key);
    setOptionsArray(newArray);
  };

  const pops = optionsArray.map((opts, index) => (
    <PopView options={opts} cleanup={recycle} key={opts.key} />
  ));

  return <>{pops}</>;
});

export default Popup;
