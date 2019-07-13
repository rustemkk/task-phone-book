import { put, takeEvery } from 'redux-saga/effects'
import { normalize } from 'normalizr';

import { callAPI } from 'utils';

import * as contactsActions from './actions';
import * as contactsConstants from './constants';
import { contactsSchema } from './schemas';


function* loadContactsTask({ orderBy, orderDirection, count, offset }) {
  try {
    let url = '/contacts?';
    url += orderBy ? `&orderBy=${orderBy}` : '';
    url += orderDirection ? `&orderDirection=${orderDirection}` : '';
    url += count ? `&count=${count}` : '';
    url += offset ? `&offset=${offset}` : '';
    const contacts = yield callAPI('GET', url);
    const normalized = normalize(contacts, contactsSchema);
    yield put(contactsActions.loadContactsSuccess(normalized));
  } catch (err) {
    console.log('loadContactsTaskError', err);
  }
}

function* createContactTask({ contact }) {
  try {
    const result = yield callAPI('POST', '/contacts', contact);
    const normalized = normalize([result], contactsSchema);
    yield put(contactsActions.loadContactsSuccess(normalized));
  } catch (err) {
    console.log('createContactTaskError', err);
  }
}

function* updateContactTask({ contact }) {
  try {
    const result = yield callAPI('PUT', `/contacts/${contact.id}`, contact);
    yield put(contactsActions.updateContactSuccess(result));
  } catch (err) {
    console.log('updateContactTaskError', err);
  }
}

function* deleteContactTask({ contactId }) {
  try {
    yield callAPI('DELETE', `/contacts/${contactId}`);
    yield put(contactsActions.deleteContactSuccess(contactId));
  } catch (err) {
    console.log('deleteContactTaskError', err);
  }
}

function* watchLoadContacts() {
  yield takeEvery(contactsConstants.LOAD_CONTACTS_REQUEST, loadContactsTask)
}

function* watchCreateContact() {
  yield takeEvery(contactsConstants.CREATE_CONTACT_REQUEST, createContactTask)
}

function* watchUpdateContact() {
  yield takeEvery(contactsConstants.UPDATE_CONTACT_REQUEST, updateContactTask)
}

function* watchDeleteContact() {
  yield takeEvery(contactsConstants.DELETE_CONTACT_REQUEST, deleteContactTask)
}

export default [
  watchLoadContacts(),
  watchCreateContact(),
  watchUpdateContact(),
  watchDeleteContact(),
];