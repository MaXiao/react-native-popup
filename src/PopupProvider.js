/** @format */
import React, {useRef} from 'react';
import Popup from './Popup';
import {Provider} from './context';
import {POPUP_MODE} from './index';
import TOAST_POSITION from './Toast/ToastPosition';

const PopupProvider = (props) => {
  const popupRef = useRef(null);

  const getContext = () => {
    return {
      showActionSheet: (options) => {
        popupRef.current.show({...options, mode: POPUP_MODE.ACTION_SHEET});
      },
      showFloatingView: (options) => {
        popupRef.current.show({...options, mode: POPUP_MODE.FLOATING_VIEW});
      },
      showTooltip: (options) => {
        popupRef.current.show({...options, mode: POPUP_MODE.TOOL_TIP});
      },
      showToast: (options) => {
        popupRef.current.show({
          mode: POPUP_MODE.TOAST,
          position: TOAST_POSITION.TOP,
          ...options,
        });
      },
      showModal: (options) => {
        popupRef.current.show({
          ...options,
          mode: POPUP_MODE.MODAL,
          showOverlay: true,
        });
      },
      showPopup: (options) => {
        popupRef.current.show(options);
      },
      hidePopup: (options) => {
        popupRef.current.hide(options);
      },
    };
  };

  return (
    <Provider value={getContext()}>
      {props.children}
      <Popup ref={popupRef} />
    </Provider>
  );
};

export default PopupProvider;
