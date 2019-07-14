import * as contactsConstants from './constants';


export const loadContacts = (offset) => ({
  // export const loadContacts = (orderBy, orderDirection, offset) => ({
  type: contactsConstants.LOAD_CONTACTS_REQUEST,
  // orderBy,
  // orderDirection,
  offset,
})

export const loadContactsSuccess = ({ entities: { contacts }, result }, isResetState) => ({
  type: contactsConstants.LOAD_CONTACTS_SUCCESS,
  contacts,
  contactsByIds: result,
  isResetState,
});

export const createContact = (contact) => ({
  type: contactsConstants.CREATE_CONTACT_REQUEST,
  contact,
});

export const updateContact = (contact) => ({
  type: contactsConstants.UPDATE_CONTACT_REQUEST,
  contact,
});

export const updateContactSuccess = (contact) => ({
  type: contactsConstants.UPDATE_CONTACT_SUCCESS,
  contact,
});

export const deleteContact = (contactId) => ({
  type: contactsConstants.DELETE_CONTACT_REQUEST,
  contactId,
});

export const deleteContactSuccess = (contactId) => ({
  type: contactsConstants.DELETE_CONTACT_SUCCESS,
  contactId,
});

export const importContactsFromFile = (strategy, file) => ({
  type: contactsConstants.IMPORT_CONTACTS_FROM_FILE_REQUEST,
  strategy,
  file,
});

export const exportContactsToFile = () => ({
  type: contactsConstants.EXPORT_CONTACTS_TO_FILE_REQUEST,
});