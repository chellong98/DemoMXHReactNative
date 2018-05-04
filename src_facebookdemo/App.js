import React, { Component } from 'react';
import { Dimensions } from "react-native";
import SplashContainer from './container/splashsreencontainer';
import LoginContainer from './container/logincontainer';
import {StackNavigator, DrawerNavigator} from 'react-navigation'; 
import ListUsersContainer from './container/ListUserscontainer';
import CustomDrawNav from './container/CustomDrawNav';
import InfoDetailUser from './container/infoDetailUserscontainer';
import ThisPostContainer from './container/ThisPostContainer';
const deviceWidth = Dimensions.get("window").width;
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
     }

},
{
    initialRouteName: 'SplashContainer',
    navigationOptions:{
        gesturesEnabled: false,   header: null
    }
// um do de   headerMode: 'none'

}
);

export default Stack;