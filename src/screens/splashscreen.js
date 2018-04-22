/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow 
 */

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  ImageBackground,
  Image
} from 'react-native';
import SplashScreen from 'react-native-splash-screen';
import {Container, Header, Body,} from 'native-base';

export interface Props {};
export default class splashscreen extends Component<Props> {
    
  render() {
    return (
        <Container>
       
            <Image resizeMode='stretch' style={{width:'100%',height:'100%'}} source={require('./../../images/LoadingScreen.png')}/>
        
        </Container>
    
    );
  }
  
}

const styles = StyleSheet.create({
 
});
