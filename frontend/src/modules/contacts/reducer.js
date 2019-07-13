import { uniq } from 'lodash';
import { combineReducers } from 'redux';

import * as contactsConstants from './constants';


const contacts = (state = {}, action) => {
  switch (action.type) {
    case contactsConstants.LOAD_CONTACTS_SUCCESS:
      return { ...action.isResetState ? {} : state, ...action.contacts };
    case contactsConstants.UPDATE_CONTACT_SUCCESS:
      return { ...state, [action.contact.id]: action.contact };
    default:
      return state;
  }
};

const contactsByIds = (state = [], action) => {
  switch (action.type) {
    case contactsConstants.LOAD_CONTACTS_SUCCESS:
      return action.isResetState ? action.contactsByIds : uniq([...state, ...action.contactsByIds]);
    case contactsConstants.DELETE_CONTACT_SUCCESS:
      return state.filter(id => id !== action.contactId);
    default:
      return state;
  }
};

export default combineReducers({
  contacts,
  contactsByIds,
});