import { all } from 'redux-saga/effects'

import modules from './modules';


let sagas = [];

modules.forEach(module => {
  if (module.sagas) {
    sagas = [...sagas, ...module.sagas];
  }
});

export default function* rootSaga() {
  yield all(sagas);
}