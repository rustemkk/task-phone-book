import React from 'react';

import logo from './logo.svg';
import s from './index.module.css';


const App = () => {
  return (
    <div className={s.App}>
      <header className={s.AppHeader}>
        <img alt="logo" className={s.AppLogo} src={logo} />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
