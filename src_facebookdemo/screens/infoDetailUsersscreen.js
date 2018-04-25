import React, { Component } from 'react';
import {View , Animated, Image, Keyboard, StyleSheet,TouchableOpacity, Text,Dimensions} from 'react-native';
import {Container, Card,List, CardItem, Item,Thumbnail, Button, ListItem, Input, Header, Body, Right, Title, Left,Icon, Content} from 'native-base';
import Setting from './../utils/setting';
export interface Props { 
  navigation: any, 
  postBaiDang: Function,
  layToanBoBaiDang: Function,
  user: any,

}
export default class infodetailuser extends Component<Props> {
  constructor(props) {
    super(props);
    this.state = {
      status : false,
      width: 0,
      text: "",
      allPosts : []
    },
    this.props.layToanBoBaiDang(this.props.user.sothutu, (allPosts, likesOfPost)=>{
      // console.log("response");  
      // console.log(allPosts);  
      // console.log('like of post')
      // console.log(likesOfPost)
      for(i=0; i<allPosts.length; i++) {
        allPosts[i].statusLike = false //them 1 thuoc tinh vao doi tuong trong mang
        allPosts[i].statusComment = false 
      }
      // this.forceUpdate()
      this.setState({allPosts: allPosts})
      // console.log('allposts')
      // console.log(this.state.allPosts);
     
    })
  }

  onLayout(event) {
    const {x,y,width, height} = event.nativeEvent.layout;
    if(this.state.width==0) {
      this.setState({width: width});
    }
    // console.log("width" + width ); 
  }

  taoHang(value, index, user) {
    var likeColor = value.statusLike==true ? '#00903b' : undefined;
    var commentColor = value.statusComment==true ? '#00903b' : undefined;

    return (
      <ListItem key={index} style={{borderBottomWidth: 0}}>
        <Card>
          <CardItem>
            <Item style={{paddingBottom: 10}}>
              <Left style={{flexDirection: 'row'}}>
                <Thumbnail source={{uri: Setting.SERVER_API+user.image}}/>
                <View style={{paddingLeft: 20}}>
                  <Text style={{fontSize: 15, color: '#00903b', fontWeight: '100'}}>{user.hoten}</Text>
                  <Text style={{fontStyle: 'italic', fontSize: 10}}>{value.ngayDang} - <Icon android='md-globe' ios='md-globe' style={{fontSize: 15, color: '#00903b'}}/></Text>
                </View>
              </Left>
              <Right>
                <Icon android='md-more' ios='md-more'/>
              </Right>
            </Item>
          </CardItem>
          <CardItem>
            <Body>
              <View>
                <Text>{value.noiDungBaiDang}</Text>
              </View>
            </Body>
          </CardItem>
          <CardItem>
            <Left>
              <Button //nut like
              transparent
              onPress={()=>{
                  this.state.allPosts[index].statusLike=!this.state.allPosts[index].statusLike; 
                  this.forceUpdate(); 
                  console.log(this.state.statusLike)
                  }
              }>
                <Text style={{color: likeColor}}><Icon active name='thumbs-up' style={{color: likeColor}}/>Like</Text>
              </Button>
            </Left>
            <Body>
              <Button transparent onPress={()=>{  //nut comment
                  this.state.allPosts[index].statusComment=!this.state.allPosts[index].statusComment; 
                  this.forceUpdate(); 
                  console.log(this.state.statusComment)
              }}>
              
              <Text style={{color: commentColor}}><Icon active name="chatbubbles" style={{color: commentColor}}/> Comments</Text>
              </Button>
              </Body>
              <Right>
                  <Text><Icon name='md-time'/> 11h ago</Text>
              </Right>
          </CardItem>
        </Card>
      </ListItem>
    )
  }

  renderCardStatus(user) {
    
    console.log("status")
    console.log(this.state.status) 
    if(this.state.status) {
      return (
        <CardItem style={{borderWidth: 0, borderRadius: 10, flexDirection: 'column', width: '100%'}} 
        onLayout={(e)=>this.onLayout(e)}>
          <Item style={{flex: 1, }}>
          <Input
          multiline={true}
          numberOfLines={3}
          placeholder='Bạn đang nghĩ gì?'
          style={{width: '100%'}}
          onChangeText={(text)=>this.setState({text})}

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
          <Item style={{ flex: 1, width: this.state.width-20, alignItems: 'center', borderBottomWidth: 0, paddingTop: 10}}>
            <Button rounded style={{flex: 1, backgroundColor: '#00903b', justifyContent: 'center'}}
              onPress={()=>{
                this.props.postBaiDang(user.sothutu, this.state.text)
                Keyboard.dismiss();
              }} 
            >
              <Text style={{color: 'white'}}>Đăng Bài</Text>
            </Button>
          </Item>
        </CardItem>
      )
    } else {
      return null;
    }
  }
  render() {
    
    var user = this.props.user;
    return (
      <Container>
        <Header searchBar rounded style={{}} backgroundColor='#00903b' androidStatusBarColor='#00903b'>
        <Left style={{flex: 2/10}}>
          <TouchableOpacity onPress={()=>{
            this.props.navigation.navigate('ListUsersContainer', {dataUsers: global.listUsers});
          }}>
            <Icon android='md-arrow-back' ios='md-arrow-back' style={{color: 'white'}}/>
          </TouchableOpacity>
        </Left>
          <Item style={{flex: 6/10}}>
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
              this.renderCardStatus(user)
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
          <List> 
            {
              // console.log(this.state.allPosts)
              
              this.state.allPosts.map((value, index)=>{
                return this.taoHang(value, index, this.props.user)
              })
              
            }
          </List>
        </Content> 
      </Container>
    )
  }
};
  