import { combineReducers } from 'redux';

import * as modalsConstants from './constants';


const modals = (state = [], action) => {
  switch (action.type) {
    case modalsConstants.SHOW_MODAL:
      return [
        ...state.filter(m => m.modalType !== action.modalType),
        { modalType: action.modalType, modalProps: action.modalProps }
      ];
    case modalsConstants.HIDE_MODAL:
      return state.filter(m => m.modalType !== action.modalType);
    default:
      return state;
  }
};

export default combineReducers({
  modals
});