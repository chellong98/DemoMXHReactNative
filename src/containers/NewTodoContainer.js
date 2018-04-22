import React, { Component } from 'react';
import NewTodo from './../screens/NewTodoscreen';
export interface Props {
  navigation: any,
}
export default class newtodocontainer extends Component<Props> {
  getDate(month, year) {
    console.log(new Date(year, month,0).getDate());
    console.log("hello");
    return new Date(year, month,0).getDate(); //lay ra ngay trong thang
  }
  render() {
    return (
        <NewTodo navigation={this.props.navigation} getDate={(month, year)=>this.getDate(month, year)}/>
    )
  }
};
