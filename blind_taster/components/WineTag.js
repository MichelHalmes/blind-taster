import React from 'react'

import { View, TouchableHighlight } from 'react-native'
import { Badge, Text } from 'native-base'

export default class WineTag extends React.Component {
  render() {
    return (
      <TouchableHighlight
        underlayColor={'#eee'}
        style={{
          padding: 5,
          backgroundColor: '#F8F8F8',
          borderBottomWidth: 1,
          borderColor: '#eee',
        }}
        {...this.props.sortHandlers}
      >
        <View style={{flex: 1, flexDirection: 'row'}} >
          <Badge style={{ backgroundColor: (this.props.tag=='X' ? 'grey' : 'maroon') }}>
            <Text>{this.props.tag}</Text>
          </Badge>
          <Text>  {this.props.wine}</Text>
        </View>
      </TouchableHighlight>
    )
  }
}

// <View style={{width: 50, height: 50, backgroundColor: 'powderblue', justifyContent: "center", alignItems: "center"}} >
//   <Text style={{fontSize: 20, fontWeight: 'bold', textAlign: 'center', textAlignVertical: "center"}} >
//     {this.props.tag}
//   </Text>
// </View>
// <View style={{flex:1, justifyContent: "center",alignItems: "center"}} >
//   <Text style={{textAlignVertical: "center",textAlign: "center"}} >
//     {this.props.wine}
//   </Text>
// </View>

// <Badge style={{ backgroundColor: 'maroon' }}>
//   <Text>{this.props.tag}</Text>
// </Badge>
// <Text>  {this.props.wine}</Text>
