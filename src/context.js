/** @format */

import React from 'react';

const context = React.createContext({
  showActionSheet: () => {},
  showFloatingView: () => {},
  showTooltip: () => {},
  showToast: () => {},
  showModal: () => {},
  showPopup: () => {},
  hidePopup: () => {},
});

export function usePopup() {
  return React.useContext(context);
}

const {Provider, Consumer} = context;

export {Provider, Consumer};
