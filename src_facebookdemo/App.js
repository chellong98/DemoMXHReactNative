import React, { Component } from 'react';
import { Dimensions } from "react-native";
import SplashContainer from './container/splashsreencontainer';
import LoginContainer from './container/logincontainer';
import {StackNavigator, DrawerNavigator} from 'react-navigation'; 
import ListUsersContainer from './container/ListUserscontainer';
import CustomDrawNav from './container/CustomDrawNav';
import InfoDetailUser from './container/infoDetailUserscontainer';
import ThisPostContainer from './container/ThisPostContainer';
import RegisterContainer from './container/RegisterContainer';
import MessengerContainer from './container/MessengerContainer';
import ListMessage from './container/ListMessageContainer';
const deviceWidth = Dimensions.get("window").width;
import SocketIOClient from 'socket.io-client';
import {Root} from 'native-base'
var navigationOptions = {
    navigationOptions:{
            header:null,   
    },
    contentComponent: props => (<CustomDrawNav {...props}/>)
}
const Draw = DrawerNavigator({
    Src1: {
        screen: ListUsersContainer,
    }, 
}, navigationOptions);

 const Stack = StackNavigator({
     SplashContainer : {
         screen: SplashContainer,
     },
     LoginContainer: {
         screen: LoginContainer,
     },
     ListUsersContainer: {
         screen: Draw,
     },
      CustomDrawNav: {
         screen: CustomDrawNav
     },
     InfoDetailUser: {
         screen: InfoDetailUser
     },
     ThisPostContainer: {
         screen: ThisPostContainer
     },
     RegisterContainer: {
         screen: RegisterContainer
     },
     ListMessage: {
        screen: ListMessage
    },
     MessengerContainer: {
         screen: MessengerContainer
     },
    

},
{
    initialRouteName: 'SplashContainer',
    navigationOptions:{
        gesturesEnabled: false,   header: null
    }
// um do de   headerMode: 'none'

}
);
global.socket = SocketIOClient('http://125.212.227.42:9002');
global.socket.on('refresh',(data)=>{ //khi bat dc su kien dang nhap
    // console.log('data')
    // console.log(data)
    // console.log(global.refresh)

    for(var i in global.dataUsers) {
        console.log(global.dataUsers[i].sothutu, data.sothutu)
        if(global.dataUsers[i].sothutu==data.sothutu) {
            console.log('online')
            global.dataUsers[i].statusActive = data.statusOnline
        }
    }

    if(global.refresh!=null) global.refresh()
})

global.socket.on('getListActive', (data)=> { //su kien load nguoi dang active
    console.log(data)
    for(i in data) {
        for(j in global.dataUsers) {
            if(data[i].sothutu == global.dataUsers[j].sothutu) {
                global.dataUsers[j].statusActive = 1
            }
        }
    }
    if(global.refresh!=null) global.refresh()
})

global.socket.on('newChat', (thread)=>{
    // this.messenger = new MessengerContainer();
    MessengerContainer.loadInbox(thread)
})
global.socket.on('onChat', (message)=>{
    MessengerContainer.onChat(message)
})
export default () =>
<Root>
  <Stack />
</Root>;