import React from 'react';

import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'
import { createLogger } from 'redux-logger'

import rootReducer from './my_redux.js'

const loggerMiddleware = createLogger()
const store = createStore(
    rootReducer,
    undefined,
    applyMiddleware(
      thunkMiddleware,
      loggerMiddleware
    )
  )

import App from './components/App.js'

export default class Root extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <App />
      </Provider>
    )
  }
}

