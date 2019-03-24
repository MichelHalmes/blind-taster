import React from 'react'

import { Animated, View, StyleSheet } from 'react-native'

import {
  Badge,
  Text,
  List,
  ListItem,
  Icon,
  Left,
  Body,
  Right,
  Button
} from 'native-base';


export default class SortableListViewSimple extends React.Component {
  constructor() {
    super()
    this.state = {animations: []}
  }

  handleMove(idx, direction) {
    const event = {from: idx, to: idx-direction}
    if(event.to == -1 || event.to==this.props.order.length) {
      return
    }

    this.props.onRowMoved(event)

    let animations = []
    animations[event.from] = new Animated.Value(-30*direction)
    Animated.timing(animations[event.from], {toValue: 0, duration: 500}).start()
    animations[event.to] = new Animated.Value(30*direction)
    Animated.timing(animations[event.to], {toValue: 0, duration: 500}).start()
    this.setState({animations})
  }

  render() {
    return (
      <List>
        {this.props.order.map((tag, i) => (
          <ListItem key={i} icon >
            <Left>
              <Badge style={{ margin: 8, backgroundColor: (tag=='X' ? 'grey' : 'maroon') }}>
                <Text>{tag}</Text>
              </Badge>
            </Left>
            <Body style={{ margin: 0}}>
              <Animated.Text style={{ transform: [{translateY: (this.state.animations[i] || 0) }] }}>
                  {this.props.data[tag]}
              </Animated.Text>
            </Body>
            <Right>
              <Button transparent onPress={this.handleMove.bind(this, i, +1)} >
                <Icon name='md-arrow-round-up' style={{ margin: 8, color: (i==0 ? 'grey' : 'black') }}  />
              </Button>
              <Button transparent onPress={this.handleMove.bind(this, i, -1)} >
                <Icon name='md-arrow-round-down' style={{ margin: 8, color: (i==this.props.order.length-1 ? 'grey' : 'black') }}  />
              </Button>
            </Right>
          </ListItem>
        ))}
      </List>
    )
  }
}
