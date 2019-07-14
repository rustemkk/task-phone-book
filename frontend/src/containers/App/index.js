import React from 'react';

import Contacts from 'containers/Contacts';
import Modals from 'containers/Modals';
import Menu from 'containers/Menu';

import s from './index.module.scss';


const App = () => {
  return (
    <div className={s.App}>
      <Menu />
      <Contacts />
      <Modals />
    </div>
  );
}

export default App;