import React, { Component } from 'react';
import MessengerScreen from './../screens/MessengerScreen';

export interface Props {
    navigation: any,
}
export default class messsengercontainer extends Component {
  constructor(props) {
    super(props);
    // this.socket = SocketIOClient('http://192.168.2.2:8082');
    global.messsengercontainer = this;
    this.state = {
      thread: {}
    }
  }
  
  static loadInbox(thread) {
    // console.log('data')
    // console.log(thread)
    
    if (global.messsengercontainer !=null){ 
      global.messsengercontainer.state.thread = thread
      global.messsengercontainer.forceUpdate()
      // console.log(global.messsengercontainer.state.thread)
    }
  }

  static onChat(message) { //thuc hien voi socketB
    console.log('message')
    console.log(message)
   if(global.messsengercontainer!=null) {
    global.messsengercontainer.state.thread.message.push(message)
    global.messsengercontainer.forceUpdate()
   }
  }


  _PostMessage(post) {
    console.log('text')
    console.log(post)
    if(post.message=='') return
    global.socket.emit('onChat', post)
  }
  render() {
    const {params} = this.props.navigation.state;
    // console.log('param')
    // console.log(params)

    console.log(this.state.thread)
    return (
      <MessengerScreen 
      thread = {this.state.thread}
      user = {params.user}
      navigation={this.props.navigation}
      _PostMessage={(post)=>this._PostMessage(post)}/>
    )
  }
};
