import { get as g } from 'lodash';
import { createSelector } from 'reselect';


export const getContactsEntities = (state) =>
  g(state, 'contacts.contacts');

export const getContactsByIds = (state) =>
  g(state, 'contacts.contactsByIds');

export const getStatus = state =>
  g(state, 'contacts.status');

export const getAllContacts = createSelector(
  getContactsEntities,
  getContactsByIds,
  (contacts, contactsByIds) => contactsByIds.map(id => contacts[id]).sort((a, b) => a.name > b.name ? 1 : -1)
);

export const getContactById = (contactId) => createSelector(
  getContactsEntities,
  (contacts) => contacts[contactId]
);