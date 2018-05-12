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
const deviceWidth = Dimensions.get("window").width;
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

export default () =>
<Root>
  <Stack />
</Root>;;