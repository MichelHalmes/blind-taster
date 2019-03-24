import React from 'react'
import { connect } from 'react-redux'
import {
  Button,
  Text,
  Spinner,
  H3
} from 'native-base';

import { View } from 'react-native'

// import SortableListView from './SortableListView.js'
import SortableListView from './SortableListViewSimple.js'
import WineTag from './WineTag.js'

import client from '../client.js'
import { nextPhaseAC, resetUsernameAC } from '../my_redux.js'


class GuessWines extends React.Component {
  constructor(props) {
    super(props)
    this.tags = []
    this.wines_ordered = []
    this.state = {data: {}}
  }

  refreshState() {
    let data = this.tags.reduce((acc, cur, i) => {
      acc[cur] = this.wines_ordered[i]
      return acc
    }, {})
    this.setState({data})
  }

  componentDidMount() {
    client.getWinesTags()
      .then(({wines, tags}) => {
        this.tags = tags
        this.wines_ordered = wines
        this.refreshState()
      })
  }

  handleRowMove(e) {
    this.wines_ordered.splice(e.to, 0, this.wines_ordered.splice(e.from, 1)[0])
    this.refreshState()
  }

  handleGuessSubmit() {
    this.tags = []
    this.setState({data: {}})
    this.props.dispatch(nextPhaseAC())
    this.wines_ordered = []
    client.postGuess(this.props.username, this.state.data)
      .then(res => {
      })
      .catch(err => {
        if (err.status == 404) {
          this.props.dispatch(resetUsernameAC())
        } else {
          throw err
        }
      })
  }

  render() {
    if (this.tags.length == 0) {
      return(
        <View style={{justifyContent: "center", alignItems: "center"}}>
          <Spinner />
          <H3 style={{textAlign: 'center'}}>
            Waiting for new round to start!
          </H3>
        </View>
      )
    } else {
      return (
        <View>
          <SortableListView
            style={{ flex: 1 }}
            data={this.state.data}
            order={this.tags}
            onRowMoved={e => this.handleRowMove(e)}
            renderRow={(data, section, index) => <WineTag wine={data} tag={index}/>}
          />
          <Button block success onPress={this.handleGuessSubmit.bind(this)}>
            <Text>Submit</Text>
          </Button>
        </View>
      )
    }
  }
}

function mapStateToProps(state) {
  return {username: state.usernameReducer}
}

export default connect(mapStateToProps)(GuessWines)
