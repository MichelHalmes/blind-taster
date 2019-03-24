
import React from 'react';
import { connect } from 'react-redux'

import Home from './Home.js'
import Login from './Login.js'


class App extends React.Component {
  render() {
    if (this.props.username) {
      return <Home />
    } else {
      return <Login />
    }
  }
}

function mapStateToProps(state) {
  return {username: state.usernameReducer}
}

export default connect(mapStateToProps)(App)
