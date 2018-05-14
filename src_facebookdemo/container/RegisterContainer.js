import React, { Component } from 'react';
import RegisterScreen from './../screens/RegisterScreen';
import DatePicker from 'react-native-datepicker'
import Pakage from './../utils/pakage';
export interface Props {
    navigation: any,
}
export default class registercontainer extends Component {
  render() {
    return (
      <RegisterScreen 
      navigation={this.props.navigation}/>
    )
  }
};
