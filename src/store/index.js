//REDUX USADO PARA SALVAR ESTADO DO USUARIO
import { createStore } from 'redux';
import userReducer from './userReducer';
import { persistReducer, persistStore } from 'redux-persist';

import storage from 'redux-persist/lib/storage';

const persistConfig = {
  key: 'atema',
  storage,
}

const persistedReducer = persistReducer(persistConfig, userReducer);


const store = createStore(persistedReducer);

const persistor = persistStore(store);

export { store, persistor };