import React, { Component } from 'react';
import {View ,Alert, Animated, Image, Keyboard, StyleSheet,TouchableOpacity, Text,Dimensions} from 'react-native';
import {Container, Card,List, CardItem, Item,Thumbnail, Button, ListItem, Input, Header, Body, Right, Title, Left,Icon, Content} from 'native-base';
import PopupDialog, { SlideAnimation , DialogButton} from 'react-native-popup-dialog'; //inport dialog 
import Setting from './../utils/setting';
import Pakage from './../utils/pakage';
import ThisPostContainer from './../container/ThisPostContainer';
const deviceSize = Dimensions.get("window");
const color = '#00903b';
export interface Props { 
  navigation: any, 
  postBaiDang: Function,
  layToanBoBaiDang: Function,
  user: any,

}
var imagePicker = require('react-native-image-picker');
var options = {
  title: 'Select image',
  storageOptions : {
    skipBackup: true,
    path: 'image',
  }
}
export default class infodetailuser extends Component<Props> {
  constructor(props) {
    super(props);
    this.state = {
      status : false,
      width: 0,
      height: 0,
      text: "",
      allPosts : [],
      likesOfPost: [],
      commentsOfPost: [],
      idNguoiLike: [],
      imageUri: '',
    },
    this.props.layToanBoBaiDang(this.props.user.sothutu, (allPosts, likesOfPost, commentsOfPost, idNguoiLike)=>{
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
      this.setState({likesOfPost: likesOfPost}) 
      this.setState({commentsOfPost: commentsOfPost})
      this.setState({idNguoiLike: idNguoiLike})
      for(i=0; i<idNguoiLike.length; i++) {
        // console.log('id nguoi like')
        // console.log(idNguoiLike[i])
        // if(idNguoiLike.length[i].)
        if(idNguoiLike[i].idNguoiLike==global.account.sothutu) {
          console.log('id nguoi like')
          console.log(idNguoiLike[i].idBaiDang + " " + idNguoiLike[i].idNguoiLike)
          var idBaiDang = idNguoiLike[i].idBaiDang;
          for(i=0; i<this.state.allPosts.length; i++) {
            if(this.state.allPosts[i].idBaiDang==idBaiDang ) {
              this.state.allPosts[i].statusLike = true;
              this.forceUpdate();
            }
          }
        }
      }
      // console.log('allposts')
      // console.log(this.state.allPosts);
     
    })

    this.slideAnimation = new SlideAnimation({ //new animation dialog
      slideFrom: 'bottom'
    })
  }


  onLayout(event) {
    const {x,y,width, height} = event.nativeEvent.layout;
    if(this.state.width==0) {
      this.setState({width: width});
      
      this.setState({height: height})
    }
    // console.log("height" + height ); 
  }



  taoHang(value, index, user) {
    var likeColor = value.statusLike==true ? '#00903b' : undefined;
    var commentColor = value.statusComment==true ? '#00903b' : undefined;
    var noiDungBaiDang = JSON.parse(value.noiDungBaiDang)
    var imageSize = Pakage.getSizeImage(deviceSize.width ,noiDungBaiDang.imageSize.width,noiDungBaiDang.imageSize.height);
    console.log('width / height')
 
    // console.log(noiDungBaiDang)
    // console.log("like of post: " + this.state.likesOfPost[index])
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
            <Content>
              <View>
                <Text>{noiDungBaiDang.text}</Text>
              </View>
              <View>
                <Image 
                style={{ resizeMode: 'contain', width: imageSize.width, height: imageSize.height, paddingTop: 10}}
                source={{uri: Setting.SERVER_NAME+noiDungBaiDang.image.replace("\\","/")}}/>
              </View>
            </Content>
          </CardItem>
          <CardItem>
            <Left style={{flex: 3/10}}>
              <Button //nut like
              transparent
              onPress={()=>{
                  this.state.allPosts[index].statusLike=!this.state.allPosts[index].statusLike; 
                  this.forceUpdate(); 
                  console.log(this.state.statusLike)
                  }
              }>
                <Text style={{color: likeColor}}><Icon active name='thumbs-up' style={{color: likeColor}}/>Like ({this.state.likesOfPost[index]})</Text>
              </Button>
            </Left> 
            <Body style={{flex: 5/10, alignItems: 'center'}}>
              <Button transparent onPress={()=>{  //nut comment
                  this.state.allPosts[index].statusComment=!this.state.allPosts[index].statusComment; 
                  this.forceUpdate(); 
                  // console.log(this.state.statusComment)
                  this.popupDialog.show() //show dialog
              }}
                style={{justifyContent: 'center'}}
              >
              
              <Text style={{color: commentColor}}><Icon active name="chatbubbles" style={{color: commentColor}}/> Comments ({this.state.commentsOfPost[index]})</Text>
              </Button>
              </Body>
              <Right style={{flex: 2/10}}>
                  <Text><Icon name='md-time'/> Share</Text>
              </Right>
          </CardItem>
        </Card>
      </ListItem>
    )
  }

  upLoadImage() {
    imagePicker.showImagePicker(options, (response)=>{
      console.log("response image picker")
      console.log(response);

      if (response.didCancel) {
        console.log('User cancelled image picker');
      }
      else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      }
      else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
       
        // console.log("source: ")
        // console.log(source);
      
        this.setState({imageUri: response.uri})
      }
    })
  }

  renderImageUpload() {
    if(this.state.imageUri!=='') {
      return (
        <Item style={{flex: 1, borderBottomWidth: 0, paddingTop: 10}}>
          <Image 
          style={{width: this.state.width-20, height: this.state.height}}
          source={{uri: this.state.imageUri}}
          />
        </Item>
      )
    } else {
      return null;
    }
    
  }

  postBaiDang(user) {
    if(this.state.text==='') {
      Alert.alert('da viet gi dau ma dang :v')
      return;
    }
    
    this.props.postBaiDang(user.sothutu, this.state.text, this.state.imageUri)
    Keyboard.dismiss();
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
          returnKeyLabel = "done"

          // onChangeText={(text) => this.setState({text})}
          // value={this.state.text}/>
          />
          </Item>
          {
            this.renderImageUpload()
          }
          <Item style={{flex: 1, borderBottomWidth: 0, paddingTop: 10}}>
            <Left>
              <Button rounded light onPress={()=>this.upLoadImage()}>
              <Text style={{padding: 10}}>Image</Text>
              </Button>    
            </Left>
          </Item>
          <Item style={{ flex: 1, width: this.state.width-20, alignItems: 'center', borderBottomWidth: 0, paddingTop: 10}}>
            <Button rounded style={{flex: 1, backgroundColor: '#00903b', justifyContent: 'center'}}
              onPress={()=>this.postBaiDang(user)} 
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
      <PopupDialog  
        height = {deviceSize.height-100}
        ref={(popupDialog)=>{this.popupDialog = popupDialog}}
        dialogAnimation= {this.slideAnimation}
      >
        <ThisPostContainer/>
        <DialogButton
          buttonStyle={{backgroundColor: color, borderRadius: 50, width: 30, height: 30, marginBottom: 10, marginTop: 10,}}
          onPress={()=>{this.popupDialog.dismiss()}}
          text='X'
          activeOpacity={0}
        /> 
        
      </PopupDialog>
      
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
          <Button transparent onPress={()=>{
            if(this.props.user!=global.account) {
              Alert.alert('chuc nang dang len tuong nha ban be chua lam!')
              return;
            }
            this.setState({status: !this.state.status});
          }}>
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
  