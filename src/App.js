import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './global.css';

//PAGES
import Atlas from './pages/Atlas'
import Home from './pages/Home'
import Login from './pages/Login'
//REDUX
import { store, persistor } from './store/';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';


function App() {

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Router>
          <Route path='/login' component={Login} />
          <Route exact path='/' component={Home} />
          <Route path='/atlas' component={Atlas} />
        </Router>
      </PersistGate>
    </Provider>
  );
}

export default App;
