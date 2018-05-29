import React, { Component } from 'react';
import RegisterScreen from './../screens/RegisterScreen';
import {Container, Card,List,Toast, CardItem, Item,Thumbnail, Button, ListItem, Input, Header, Body, Right, Title, Left,Icon, Content, CheckBox} from 'native-base';
import DatePicker from 'react-native-datepicker'
import Pakage from './../utils/pakage';
import Service from './../services/UserServices';
export interface Props {
    navigation: any,
}
export default class registercontainer extends Component {
  _signUp(info) {
    //  console.log('info')
    //   console.log(info)
    var data = Pakage.registerUser(info);
    this.service = new Service();
    this.service.update((status)=> {
      console.log('status')
      console.log(status)
      Toast.show({
        text: 'Register Success',
        type: 'success',
        buttonText: "OK",
        duration: 5000,
    })
    this.props.navigation.goBack();
    }, data);
  }
  render() {
    return (
      <RegisterScreen 
      navigation={this.props.navigation}
      _signUp={(info)=>this._signUp(info)}/>
    )
  }
};
