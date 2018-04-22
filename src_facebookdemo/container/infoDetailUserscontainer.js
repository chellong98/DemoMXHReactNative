import React, { Component } from 'react';
import InfoUsersScreen from './../screens/infoDetailUsersscreen';
export interface Props { 
  navigation: any
}
export default class infoDetailUsersContainer extends Component<Props> {
  render() {
    return (
      <InfoUsersScreen navigation={this.props.navigation}/>
    )
  }
};
 