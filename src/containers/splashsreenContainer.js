import React, { Component } from 'react';
import SplashScreen from './../screens/splashscreen';
import TodoContainer from './todoContainer';
import {View} from 'native-base';
export interface Props { 
  navigation: any,
}
export default class splashscreenContainer extends Component<Props> {
  constructor(props) {
    super(props);
    this.state = {
      currentScreen: 'SplashScreen'
    }
    setTimeout(() => {
      this.setState({currentScreen: 'TodoContainer'})  
    }, 2000);
  }
  render() {
    const {currentScreen} = this.state;
    let mainScreen = currentScreen === 'SplashScreen' ? <SplashScreen/> : <TodoContainer navigation={this.props.navigation}/>;
    return (
     mainScreen
    )
  }
};
