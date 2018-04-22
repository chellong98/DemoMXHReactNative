import React, { Component } from 'react';
import ListUsers from './../screens/ListUsersscreen';
export interface Props{
  navigation: any,

}
export default class listusercontainer extends Component<Props> {
  render() {
    const {params} = this.props.navigation.state;
    global.dataUsers = params.dataUsers; //cho thanh bien toan cuc
    return (
      <ListUsers navigation={this.props.navigation} dataUsers={params.dataUsers}/>
      // <ListUsers navigation={this.props.navigation}/>
    )
  }
};
