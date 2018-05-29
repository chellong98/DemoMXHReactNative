import React, { Component } from 'react';
import {View, TouchableOpacity, Text} from 'react-native';
import {Container, Header, Body,Thumbnail ,Title,List, ListItem, Item,Input,Icon,Button,Left, Right,Content, InputGroup, Footer} from 'native-base';
import Setting from './../utils/setting';
import UserService from './../services/UserServices';
import Pakage from './../utils/pakage';
export interface Props {
  navigation: any,
  getUsers : Function,
  account: any,
}

export default class drawnav extends Component<Props> {
  taoHang(value, index, account) {
    return (
        <ListItem onPress={()=>{
          this.props.navigation.navigate('InfoDetailUser',{ //gui user va account hien tai sang new feed
            user: value,
            account: account
          });
        }}>
          <Left>
            <Text><Icon android='md-person' ios='md-person'/> {value.hoten} ({value===account ? 'me' : 'friend'})</Text>
          </Left>
        </ListItem> 
    
    )
  }
  
  render() {
    let listUsers = this.props.getUsers();
    let account = this.props.account;
    console.log('account');
    console.log(this.props.account)
    // console.log("listUsers");
    // console.log(listUsers)
    return (
      <Container>
        <View style={{backgroundColor: '#00903b', flex: 1/6}}>
            <Item style={{flexDirection: 'row', borderBottomWidth: 0, paddingTop: 20, paddingLeft: 10, paddingBottom: 20}}>
                <TouchableOpacity onPress={()=>{
                  this.props.navigation.navigate('InfoDetailUser',{ //gui user va account hien tai sang new feed
                    user: account,
                    account: account
                  })
                }}>
                  <Thumbnail source={{uri: Setting.SERVER_API+account.image}}/>
                </TouchableOpacity>
                <View style={{paddingLeft: 20}}>
                    <Title style={{color: 'white'}}>{account.email}</Title>
                    <Text style={{color: 'white'}}>Sinh viên</Text>
                </View>
               
            </Item>
            
        </View>
        <Content>
            <List style={{flex: 6/7}}>
              {
                listUsers.map((value, index)=>{
                  return this.taoHang(value, index, account) 
                })
              } 
            </List>  
        </Content>   
        <Footer style={{backgroundColor: '#00903b',}}>
          <Body style={{ justifyContent: 'center', alignItems: 'center'}}>
              <TouchableOpacity onPress={()=>{
                global.socket.emit('disconnect')
                this.props.navigation.navigate('LoginContainer')
               
              }}>
                <Text style={{color: 'white', fontSize: 20}}><Icon size={1} android='md-log-out' ios='md-log-out' style={{color: 'white'}}/> Logout</Text>
              </TouchableOpacity>
          </Body>
        </Footer>
      </Container>
    )
  }
};
