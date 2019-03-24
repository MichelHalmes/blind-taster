import React from 'react';
import {
  Container,
  Header,
  Title,
  Content,
  Footer,
  FooterTab,
  Button,
  Left,
  Right,
  Body,
  Icon,
  Text,
} from 'native-base'
import { createStackNavigator, createAppContainer } from 'react-navigation'
import { connect } from 'react-redux'

import GuessWines from './GuessWines.js'
import RevealTag from './RevealTag.js'
import Points from './Points.js'

import {PHASES} from '../my_redux.js'

class Main extends React.Component {
  static navigationOptions = ({navigation}) => ({
    title: 'App',
    headerLeft: (
      <Button transparent onPress={() => navigation.navigate('Points')} style={{marginTop: 20}}>
        <Icon name='md-trophy' />
      </Button>
    )
  });


  getContentComponent(){
    switch(this.props.phase) {
      case PHASES.GUESS:
        return <GuessWines />
      case PHASES.REVEAL:
        return <RevealTag navigation={this.props.navigation}/>
      default:
        throw new Error(`Unrecognised state ${this.props.phase}`)
    }
  }

  showPoints() {
    const { navigate } = this.props.navigation;
    navigate('Points')
  }

  render() {
    return (
      <Container >
        <Header >
          <Body>
            <Title>Cheers {this.props.username}!</Title>
          </Body>
        </Header>
        <Content padded>
          {this.getContentComponent()}
        </Content>
        <Footer>
          <FooterTab>
            <Button full style={{flex: 1, flexDirection: 'row', justifyContent: 'center'}}>
              <Text>      With</Text>
              <Icon name='heart' />
              <Text>by MichMich!      </Text>
            </Button>
          </FooterTab>
        </Footer>
      </Container>
    );
  }
}

function mapStateToProps(state) {
  return {
    username: state.usernameReducer,
    phase: state.phaseReducer
  }
}

const HomeNavigator = createStackNavigator({
  Main: { screen: connect(mapStateToProps)(Main) },
  Points: { screen: Points },
});

export default createAppContainer(HomeNavigator);
