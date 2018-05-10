import React, { Component } from 'react';
import {View,Keyboard,Text, ImageBackground,TextInput,KeyboardAvoidingView,Alert,TouchableOpacity} from 'react-native';
import {Item,Input,Icon,Button,Left, Right,Content} from 'native-base';
import ButtonLoading from 'rn-gn-buttonloading';
import Pakage from './../utils/pakage';

srcimage = require('./../images/login.jpg');
export interface Props {
  navigation: any,
  login: Function,
  
}
export default class loginscreen extends Component<Props> {
  constructor(props) {
    super(props)
    this.state={
      username: '',
      password: '',
      // account: {},
    }
     
  }

  componentWillMount() {
    var loginAccount = Pakage.getLogin().then((data)=>{
      console.log("loginAccount: ");
     
      this.setState({username: data.email, password: data.password});
      // console.log(this.state.account); 
      // this.setState({})
    });
   
  }

  render() {
    return ( 
      <ImageBackground
        source = {srcimage}
        style={{flex: 1, width: '100%', justifyContent: 'center', alignItems: 'center'}}
      >
        <KeyboardAvoidingView keyboardVerticalOffset={150} behavior="padding" style={{width: '100%', alignItems: 'center', paddingHorizontal: 20,  backgroundColor: null, marginTop: 200}}>
          <View >
            <Text style={{color: '#67DAF9', fontSize: 20}}>REACT NATIVE</Text>
          </View>
          <View  style={{width: '100%',marginTop: 10,}}>
              <Item rounded style={{backgroundColor: 'rgba(255,255,255,0.6)', marginTop: 20}}>
                <Icon android='md-contact' ios='md-contact' style={{color: 'white'}}/>
                <Input 
                  value = {this.state.username == '' ? '' : this.state.username} //set nick cu da dang nhap
                  placeholder='Username'
                  placeholderTextColor= 'white'
                  selectionColor = 'white'
                  returnKeyType="next"
                  returnKeyLabel = "next"
                  style={{color: 'white'}}
                  onChangeText={(username)=>this.setState({username: username})}
                  />
              </Item>
              <Item rounded style={{backgroundColor: 'rgba(255,255,255,0.6)', marginTop: 20}}>
                <Icon android='md-lock' ios='md-lock' style={{color: 'white'}}/>
                <Input 
                  value = {this.state.password == '' ? '' : this.state.password} //set nick cu da dang nhap
                  placeholder='Password'
                  placeholderTextColor= 'white'
                  secureTextEntry
                  returnKeyType = 'done'
                  style={{color: 'white'}}
                  onChangeText={(password)=>this.setState({password: password})}
                  />
              </Item>
              <Item style={{borderBottomWidth: 0, marginTop: 20}}>
                <ButtonLoading
                  loadingColor= {'white'}
                  background = {{backgroundColor: '#67DAF9'}}
                  textstyle = {{color: 'white'}}
                  title = 'LOGIN'
                  size = {40}
                  onPress = {()=>{
                    this.props.login(this.state.username, this.state.password,
                    (status)=>{ 
                      if(status.error==0){
                        Keyboard.dismiss();
                       for (var i in status.data) {
                         if(status.data[i].email===this.state.username && status.data[i].password===this.state.password) {
                           global.account=status.data[i]; //cho CustomNav su dung
                            Pakage.saveLogin(status.data[i]);
                           break;
                         } 
                       }
                        // global.account = {username: this.state.username, password: this.state.password}
                        setTimeout(()=>{
                          this.props.navigation.navigate('ListUsersContainer', {dataUsers: status.data});
                        }, 1000);
                      }
                      else {
                        Keyboard.dismiss();
                        setTimeout(()=>{
                          Alert.alert("username password incorrect");
                          this.button.cancel();
                        }, 5000);
                      }
                    });
                  }}
                 
                  ref = {(btn)=>{
                    this.button = btn;
                  }}
                />
              </Item>
              <View style={{ marginTop: 20, borderWidth: 1, borderColor: 'white', flexDirection: 'row', borderRadius: 20,}}>
                
                  <Left style={{justifyContent: 'center', alignItems: 'center', borderRightWidth: 1, borderBottomLeftRadius: 20, borderTopLeftRadius: 20, borderColor: 'white',paddingVertical: 10, backgroundColor: 'rgba(255,255,255,0.6)'}}>
                    <TouchableOpacity>
                      <Text style={{color: 'white'}}>Đăng kí</Text>
                    </TouchableOpacity>
                  </Left>
                
                
                  <Right style={{ justifyContent: 'center', alignItems: 'center',backgroundColor: 'rgba(255,255,255,0.6)', paddingVertical: 10, borderBottomRightRadius: 20, borderTopRightRadius: 20}}>
                    <TouchableOpacity>
                      <Text style={{color: 'white'}}>Quên mật khẩu?</Text>
                    </TouchableOpacity>
                  </Right>
                
              </View>
            </View>
        </KeyboardAvoidingView>
        
      </ImageBackground>
    )
  }
};
