import React, { Component } from 'react';
import {View, TouchableOpacity, Text} from 'react-native';
import {Container, Header, Body,Thumbnail, Title,List, ListItem, Item,Input,Icon,Button,Left, Right,Content} from 'native-base';
import Setting from './../utils/setting';
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
            <Text><Icon android='md-person' ios='md-person'/> {value.hoten}</Text>
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
        <View style={{backgroundColor: '#00903b', flex: 1/7}}>
            <Item style={{flexDirection: 'row', borderBottomWidth: 0, paddingTop: 20, paddingLeft: 10, paddingBottom: 20}}>
                <Thumbnail source={{uri: Setting.SERVER_API+account.image}}/>
                <View style={{paddingLeft: 20}}>
                    <Title>{account.email}</Title>
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
      </Container>
    )
  }
};
