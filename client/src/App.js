import logo from './logo.svg';
import './App.css';
import MainContainer from './containers/MainContainer';
import { Route } from 'react-router';
import { useEffect, useState } from 'react';

function App() {

  return (
    <div className="App">
      <switch>
        <Route path="/">
          <MainContainer/>
        </Route>
      </switch>
    </div>
  );
}

export default App;
