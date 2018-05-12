import React, { Component } from 'react';
import RegisterScreen from './../screens/RegisterScreen';
export interface Props {
    navigation: any,
}
export default class registercontainer extends Component {
  render() {
    return (
      <RegisterScreen navigation={this.props.navigation}/>
    )
  }
};
