import React, { Component } from 'react';
import {View ,Alert,RefreshControl, Animated, Image, Keyboard, StyleSheet,TouchableOpacity, Text,Dimensions} from 'react-native';
import {Container, Toast, Card,List, CardItem, Item,Thumbnail, Button, ListItem, Input, Header, Body, Right, Title, Left,Icon, Content} from 'native-base';
import PopupDialog, { SlideAnimation , DialogButton} from 'react-native-popup-dialog'; //inport dialog 
import Setting from './../utils/setting';
import Pakage from './../utils/pakage';
import ThisPostContainer from './../container/ThisPostContainer';
import {Root} from 'native-base';

const deviceSize = Dimensions.get("window");
const color = '#00903b';
export interface Props { 
  navigation: any, 
  postBaiDang: Function,
  layToanBoBaiDang: Function,
  postLike: Function,
  user: any,

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
      NguoiLike: [],
      imageUri: '',
      showToast: false,
      refreshing: false,
    },
    this.props.layToanBoBaiDang(this.props.user.sothutu, (allPosts, NguoiLike)=>{
      // console.log("all post");  
      // console.log(allPosts);  
      // console.log('like of post') 
      // console.log(likesOfPost)
      
      // this.forceUpdate()
      this.setState({allPosts: allPosts})

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
//

  showimage(noiDungBaiDang)
  {
    
    if (noiDungBaiDang.image!=null &&noiDungBaiDang.image.length>1){
      var imageSize = Pakage.getSizeImage(deviceSize.width-30 ,noiDungBaiDang.imageSize.width,noiDungBaiDang.imageSize.height);
      // console.log(noiDungBaiDang.image + " " + noiDungBaiDang.imageSize.width + " " + noiDungBaiDang.imageSize.height)
      return ( <Image 
        style={{ resizeMode: 'contain', width: imageSize.width-40, height: imageSize.height}}
        source={{uri: Setting.SERVER_API+noiDungBaiDang.image}}/>
      )
    }
  }
  _onRefresh() {
    // this.setState({refreshing: !this.state.refreshing})
    if(this.state.allPosts==null || this.state.allPosts.length===0) 
      Toast.show({
        text: 'không có kết nối mạng',
        type: 'warning',
        position: 'bottom',
        duration: 3000,
      })
    
  }

  taoHang(value, index, user) {  
    var likeColor = value.statusLike==true ? '#00903b' : undefined;
    var commentColor = value.statusComment==true ? '#00903b' : undefined;
    var noiDungBaiDang = JSON.parse(value.noiDungBaiDang)
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
              <View style={{paddingBottom: 10}}>
                <Text>{noiDungBaiDang.text}</Text>
              </View>
              <View>
              {this.showimage(noiDungBaiDang)}
               
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
                  if(value.statusLike) {
                    value.NguoiLike.length++;
                    this.props.postLike(value.idBaiDang, global.account.sothutu)
                  } else {
                    value.NguoiLike.length--;
                  }
                  this.forceUpdate()
                }
              }>
                <Text style={{color: likeColor}}><Icon active name='thumbs-up' style={{color: likeColor}}/>Like ({value.NguoiLike.length})</Text>
              </Button>
            </Left> 
            <Body style={{flex: 5/10, alignItems: 'center'}}>
              <Button transparent onPress={()=>{  //nut comment
                  this.state.allPosts[index].statusComment=!this.state.allPosts[index].statusComment; 
                  console.log('id bai dang ' + value.idBaiDang)
                  this.dialog.loadComment(value.idBaiDang); //ref loadComment
                  this.forceUpdate();
                  // console.log(this.state.statusComment)
                  this.popupDialog.show() //show dialog
                  
                  // console.log('idbaiDang : ' + this.state.idBaiDang)
              }}
                style={{justifyContent: 'center'}}
              >
              
              <Text style={{color: commentColor}}><Icon active name="chatbubbles" style={{color: commentColor}}/> Comments ({value.soLuongComment})</Text>
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
    
    this.props.postBaiDang(user.sothutu, this.state.text, this.state.imageUri,
    (status)=>{
      console.log('new post')
      console.log(status)
      // this.setState({'newPost' : status})
      var post = {
          'idBaiDang' : 0,
          'idNguoiDang' : this.props.user.sothutu,
          'ngayDang' : status.data.ngayDang,
          'noiDungBaiDang' : JSON.stringify({'text' : status.data.noiDungBaiDang, 'image': status.data.image, 'imageSize' : JSON.parse(status.data.imageSize)}),
          'statusComment' : false,
          'statusLike' : false,
          'NguoiLike': [],
          'soLuongComment': 0,
      }
      // console.log(status.data.imageSize)
      this.state.allPosts.splice(0,0,post);
      
      console.log('allpost')
      console.log(this.state.allPosts);
      this.setState({text: ""});
      Toast.show({
        text: 'đăng bài thành công!',
        type: 'success',
        position: 'bottom',
        duration: 3000,
        buttonText: 'OK'
      })
    })
    // this.state.allPosts.push(this.props.newPost);
    // console.log('new post')
    // console.log(this.state.newPost)
    
    this.forceUpdate()
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
          value={this.state.text}
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
              <Button rounded light onPress={()=>Pakage.upLoadImage((imageUri)=>{this.setState({imageUri: imageUri})})}>
              <Text style={{padding: 10}}>Image</Text>
              </Button>    
            </Left>
          </Item>
          <Item style={{ flex: 1, width: this.state.width-20, alignItems: 'center', borderBottomWidth: 0, paddingTop: 10}}>
            <Button rounded style={{flex: 1, backgroundColor: '#00903b', justifyContent: 'center'}}
            
              onPress={()=>
                this.postBaiDang(user)
              } 
            >
              <Text style={{color: 'white'}}>Đăng Bài</Text>
            </Button>
          </Item>
        </CardItem>
      )
    } 
  }
  render() {
    
    var user = this.props.user;
    // console.log('user')
    // console.log(user)
    return (
      <Root>
      <Container>
        <PopupDialog  
          height = {deviceSize.height-100}
          ref={(popupDialog)=>{this.popupDialog = popupDialog}}
          dialogAnimation= {this.slideAnimation}
        >
          <ThisPostContainer 
            navigation={this.props.navigation} 
            user={this.props.user} 
            ref={(dialog)=>this.dialog = dialog}/>
          <DialogButton
          buttonStyle={{ height: '5%' }}
            onPress={()=>{this.popupDialog.dismiss()}}
            text='X'
            textStyle = {{color: color, position: 'absolute', top: 0}}
          >
          <Icon android='md-arrow-back' ios='md-arrow-back'/>
          </DialogButton> 
          
        </PopupDialog>
       
        <Header searchBar rounded style={{}} backgroundColor='#00903b' androidStatusBarColor='#00903b'>
          <Left style={{flex: 2/10}}>
            <TouchableOpacity onPress={()=>{
              this.props.navigation.goBack()
              // this.props.navigation.navigate('ListUsersContainer', {dataUsers: global.listUsers});
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
            if(!this.state.status) this.setState({status: !this.state.status});
            
          }}>
            <Icon android='md-add' ios='md-add' style={{color: 'white'}}/>
          </Button>
          </Right>
        </Header>
        <Content
          refreshControl={
            <RefreshControl
              refreshing={this.state.refreshing}
              onRefresh={this._onRefresh.bind(this)}
            />}>
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
          <List 
          > 
            {
              // console.log(this.state.allPosts)
              
              this.state.allPosts.map((value, index)=>{
                return this.taoHang(value, index, this.props.user)
              })
              
            }
          </List>
        </Content> 
      </Container>
      </Root>
    )
  }
};
  