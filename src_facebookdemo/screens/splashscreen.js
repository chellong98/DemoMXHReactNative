import React, { Component } from 'react';
import {View, Text, ImageBackground} from 'react-native';
import {Container,Content} from 'native-base';
sourceimage = require('./../images/reactnativedemo.jpg');
export default class splashscreen extends Component {
  render() {
    return (
        
       
          <ImageBackground
            source={sourceimage}
            style={{flex: 1, width: '100%', justifyContent: 'center', alignItems: 'center' }}
          >
            <View style={{marginTop: 110, alignItems: 'center',}}>
              <Text style={{color: '#67DAF9', fontSize: 20}}>Welcome to </Text>
              <Text style={{color: '#67DAF9', fontSize: 50, }}>React Native </Text>
            </View>
          </ImageBackground>
            
         
       
    )
  }
};
