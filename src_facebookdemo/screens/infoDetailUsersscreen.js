import React, { Component } from 'react';
import {View , Animated, Image, StyleSheet,TouchableOpacity, Text,Dimensions} from 'react-native';
import {Container, Card,List, CardItem, Item,Thumbnail, Button, ListItem, Input, Header, Body, Right, Title, Left,Icon, Content} from 'native-base';
import Setting from './../utils/setting';
export interface Props { 
  navigation: any,
}
export default class infodetailuser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      status : false
    }
  }
  renderCardStatus() {
    
    console.log("status")
    console.log(this.state.status)
    if(this.state.status) {
      return (
        <CardItem style={{borderWidth: 1, borderRadius: 10, flexDirection: 'column', width: '100%'}}>
          <Item style={{flex: 1, }}>
          <Input
          multiline={true}
          numberOfLines={3}
          placeholder='Bạn đang nghĩ gì?'
          style={{width: '100%'}}
          // onChangeText={(text) => this.setState({text})}
          // value={this.state.text}/>
          />
          </Item>
          <Item style={{flex: 1, borderBottomWidth: 0, paddingTop: 10}}>
            <Left>
              <Button rounded light>
              <Text style={{padding: 10}}>Image</Text>
              </Button>    
            </Left>
          </Item>
          <Item style={{ flex: 1, width: 500, alignItems: 'center', borderBottomWidth: 0, paddingTop: 10}}>
            <Button rounded style={{flex: 1, backgroundColor: '#00903b'}}>
              <Text style={{color: 'white'}}>dang bai</Text>
            </Button>
          </Item>
        </CardItem>
      )
    } else {
      return null;
    }
  }
  render() {
    const {params} = this.props.navigation.state;
    var user = params.user;

    return (
      <Container>
        <Header searchBar rounded style={{}} backgroundColor='#00903b' androidStatusBarColor='#00903b'>
          <Item style={{flex: 8/10}}>
            <Icon name='ios-search'/>
            <Input placeholder='Search' />
            <Icon name='ios-people'/>
          </Item>
          <Right style={{flex: 2/10}}>
          <Button transparent onPress={()=>{this.setState({status: !this.state.status})}}>
            <Icon android='md-add' ios='md-add' style={{color: 'white'}}/>
          </Button>
          </Right>
        </Header>
        <Content>
          <Card style={{flex: 0}}>
            <CardItem>
              <Left>
                <Thumbnail source={{uri: Setting.SERVER_API+user.image}} />
                <Body>
                  <Text style={{color: '#00903b'}}>{user.hoten}</Text>
                  <Text note>{user.ngaysinh}</Text>
                </Body>
              </Left>
            </CardItem>
           {
              this.renderCardStatus()
           }
            <CardItem>
              <Body>
               <Item style={{flex: 1, borderBottomWidth: 0}}>
                  <Left>
                    <Text style={{flex: 2/10}}>email</Text>
                  </Left>
                  <Right style={{flex : 8/10}}>
                    <Text>{user.email}</Text>
                  </Right>
               </Item>
              </Body>
            </CardItem>
            <CardItem>
              <Left>
                <Button transparent textStyle={{color: '#87838B'}}>
                  <Icon style={{color: '#00903b'}} name="logo-github" />
                  <Text>1,926 stars</Text>
                </Button>
              </Left>
            </CardItem>
          </Card>
        </Content>
      </Container>
    )
  }
};
