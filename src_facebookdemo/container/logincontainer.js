import React, { Component } from 'react';
import LoginScreen from './../screens/loginscreen';
import Pakage from './../utils/pakage';
import UserService from './../services/UserServices';
export interface Props {
  navigation: any, 
}

export default class logincontainer extends Component<Props> {
  constructor(props) {
    super(props);
    this.state = {
      status: {}
    }
  }
  login(username, password, callback) { //kiem tra login
    var check = Pakage.login(username, password);
    
    this.services = new UserService();
    this.services.update((status)=>{
      this.setState({status});
      callback(status);
      global.socket.emit('login', global.account)
      
      // console.log(status);
    }, check);
   
  }
  render() {
    return ( 
      <LoginScreen 
      navigation={this.props.navigation} 
      login={(username, password, callback)=>this.login(username, password, callback)}
      
      />
    )
  }
};
