import React from 'react'
import { connect } from 'react-redux'
import {
  Spinner,
  H3,
  Form,
  Picker,
  Radio,
  ListItem,
  Left,
  Right,
  Button,
  Card,
  CardItem,
  Badge
} from 'native-base'

import { View, Text } from 'react-native'

import reactMixin from 'react-mixin'
import TimerMixin from 'react-timer-mixin'

import client from '../client.js'
import { nextPhaseAC } from '../my_redux.js'


class RevealTag extends React.Component {
  constructor(props) {
    super(props)
    this.state = {reveal_tag: null, wines: [], selected_wine: null}
  }

  componentDidMount() {
    this.checkRevealTag()
  }

  checkRevealTag() {
    client.getRevealTag()
      .then(({phase, reveal_tag, wines}) => {
        console.log("-----------getRevealTag")
        if (phase != 'reveal') {
          this.props.dispatch(nextPhaseAC())
        } else if (!reveal_tag) {
          this.setTimeout(this.checkRevealTag, 2000)
        } else {
          this.setState({reveal_tag, wines, selected_wine: undefined})
        }
      })
      .catch((err) => {
        console.log(err)
        this.props.dispatch(nextPhaseAC())
      })
  }

  handleSelectWine(value: string) {
    this.setState({selected_wine: value });
  }

  handleRevealSubmit() {
    client.postRevealTag(this.state.reveal_tag, this.state.selected_wine)
      .then(res => {
        if (res.ok) {
          this.props.navigation.navigate('Points')
          this.props.dispatch(nextPhaseAC())
        }
      })
  }

  render() {
    if (!this.state.reveal_tag) {
      return(
        <View style={{justifyContent: "center", alignItems: "center"}}>
          <Spinner />
          <H3 style={{textAlign: 'center'}}>
            Waiting for co-players to finish!
          </H3>
        </View>
      )
    }
    return(
      <View style={{margin: 10, marginTop: 35}}>
        <View style={{flex: 1, flexDirection: 'row', justifyContent: "center", alignItems: "center"}} >
          <Text style={{fontSize: 20, fontWeight: 'bold'}}>
            Reveal tag:
          </Text>
          <Badge style={{ margin: 10, backgroundColor: 'maroon'}}>
            <Text style={{fontSize: 18, fontWeight: 'bold', color: 'white'}}>
              {this.state.reveal_tag}
            </Text>
          </Badge>
        </View>
        <Form style={{backgroundColor: 'white'}}>
          <Picker
            placeholder="Click here!"
            iosHeader="Select a wine!"
            mode="dropdown"
            selectedValue={this.state.selected_wine}
            onValueChange={this.handleSelectWine.bind(this)}
          >
            {this.state.wines.map((wine, i) =>
              <Picker.Item label={wine} value={wine} key={i} />
            )}
          </Picker>
        </Form>
        <Button block success disabled={!this.state.selected_wine} onPress={this.handleRevealSubmit.bind(this)}>
          <Text style={{fontSize: 15, color: 'white'}}>Submit</Text>
        </Button>
      </View>
    )
  }
}

reactMixin(RevealTag.prototype, TimerMixin);

export default connect()(RevealTag)
