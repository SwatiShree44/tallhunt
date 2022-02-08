import React from 'react';
import {Provider} from 'react-redux';
import logger from 'redux-logger';
import {createStore, applyMiddleware} from 'redux';
import Todo from './component/Todo';
import rootReducer from './reducers/rootReducer';

import {persistStore, persistReducer} from 'redux-persist';
import {PersistGate} from 'redux-persist/integration/react';

import AsyncStorage from '@react-native-community/async-storage';
const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = createStore(persistedReducer);

let persistor = persistStore(store);
const App = () => (
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <Todo />
    </PersistGate>
  </Provider>
);

export default App;
