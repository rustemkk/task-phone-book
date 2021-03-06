import { put, takeEvery } from 'redux-saga/effects'
import { normalize } from 'normalizr';

import * as modalActions from 'modules/modals/actions';
import * as modalsConstants from 'modules/modals/constants';
import { callAPI, downloadURI } from 'utils';

import * as contactsActions from './actions';
import * as contactsConstants from './constants';
import { contactsSchema } from './schemas';


function* loadContactsTask({ orderBy, orderDirection, offset }) {
  try {
    console.log('offset', offset);
    let url = '/contacts?&count=20';
    // url += orderBy ? `&orderBy=${orderBy}` : '';
    // url += orderDirection ? `&orderDirection=${orderDirection}` : '';
    url += offset ? `&offset=${offset}` : '';
    const contacts = yield callAPI('GET', url);
    const normalized = normalize(contacts, contactsSchema);
    yield put(contactsActions.loadContactsSuccess(normalized, !offset));
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

function* importContactsFromFileTask({ strategy, file }) {
  try {
    const formData = new FormData();
    formData.append('strategy', strategy);
    formData.append('file', file);
    yield callAPI('POST', '/contacts/importFile', formData);
    yield put(contactsActions.loadContacts());
    yield put(modalActions.hideModal(modalsConstants.IMPORT_MODAL));
  } catch (err) {
    console.log('importContactsFromFileTaskError', err);
  }
}

function exportContactsToFileTask() {
  try {
    downloadURI('/contacts/exportFile');
  } catch (err) {
    console.log('exportContactsToFileTaskError', err);
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

function* watchImportContactsFromFile() {
  yield takeEvery(contactsConstants.IMPORT_CONTACTS_FROM_FILE_REQUEST, importContactsFromFileTask)
}

function* watchExportContactsToFile() {
  yield takeEvery(contactsConstants.EXPORT_CONTACTS_TO_FILE_REQUEST, exportContactsToFileTask)
}

export default [
  watchLoadContacts(),
  watchCreateContact(),
  watchUpdateContact(),
  watchDeleteContact(),
  watchImportContactsFromFile(),
  watchExportContactsToFile(),
];