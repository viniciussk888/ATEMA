import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './global.css';

//PAGES
import Atlas from './pages/Atlas'
import Login from './pages/Login'
import NewAtlas from './pages/NewAtlas'
import Blog from './pages/Blog'
import Users from './pages/Users'
import ForgotPassword from './pages/forgotPassword'
import RecoverPassword from './pages/RecoverPassword'
import Posts from './pages/Posts'
import Settings from './pages/Settings'
//REDUX
import { store, persistor } from './store/';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';


function App() {

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Router>
          <Route exact path='/' component={Blog} />
          <Route exact path='/login' component={Login} />
          <Route exact path='/ForgotPassword' component={ForgotPassword} />
          <Route exact path='/recoverpassword' component={RecoverPassword} />
          <Route exact path='/atlas' component={Atlas} />
          <Route exact path='/users' component={Users} />
          <Route exact path='/posts' component={Posts} />
          <Route exact path='/settings' component={Settings} />
          <Route exact path='/atlas/novoatlas' component={NewAtlas} />
        </Router>
      </PersistGate>
    </Provider>
  );
}

export default App;
