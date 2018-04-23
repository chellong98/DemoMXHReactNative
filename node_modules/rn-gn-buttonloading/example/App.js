 

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View
} from 'react-native';
import ButtonLoading from 'rn-gn-buttonloading'

type Props = {};
export default class App extends Component<Props> {
  

  render() {
    return (
      <View style={styles.container}>

      
        <Text style={styles.welcome}>
          Welcome to React Native!
        </Text>
        <ButtonLoading  
        loadingColor = {"white"} // mau thanh loading
        background = {{ backgroundColor:'#1ab57c' }} // style cua backgorund
        textstyle = {{color:'white'}} // style cua textview
       
        onPress={()=>{
           //sau khi an 5s sau thi quay tro lai ban dau
           setTimeout(()=>this.button.cancel(),5000) // dung  .cancel() de dung loading tro ve ban dau

        }}
        
        ref={(btn)=>{
          this.button = btn; // lau handle cua button nay vao this.button
        }} 
        
        size= {40} style= {{color:'white'}} title="HelloWorld" />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
