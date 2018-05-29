import React, { Component } from 'react';
import {View, Platform, Keyboard,KeyboardAvoidingView, Animated, Image, StyleSheet,TouchableOpacity, Text,Dimensions} from 'react-native';
import {Container, Toast, Card,List, CardItem, Item,Thumbnail, Button, ListItem, Header, Body, Right, Title, Left,Icon, Content, Input} from 'native-base';
import Setting from './../utils/setting';
const deviceSize = Dimensions.get("window");
var color = '#00903b'
var white = '#FFFFFF'
var list = [
    {
        type: Setting.ACCOUNT,
        content: 'if you have certain screens ',
        time: '10:00',
        avatar: ''
    },
    {
        type: Setting.USER,
        content: 'Without a page loader, user might think that the app is being unresponsive and just click away in frustration.',
        time: '11:00',
        avatar: 'https://files.gamebanana.com/img/ico/sprays/550f7e584c470.png'
    }
]
export interface Props {
    navigation: any,
    _PostMessage: Function,
    user: any,
    thread: any
}
export default class messenger extends Component<Props> {
    constructor(props) {
        super(props)
        this.state = {
            text: "",
        }
        // console.log('thread')
        // console.log(this.props.thread)
    }
    
    postMessage() {
        this.content._root.scrollToEnd()
        // Keyboard.dismiss()
        if(this.state.text=='') return
        this.props._PostMessage({idAccount: global.account.sothutu, idThread: this.props.thread.idThread, message: this.state.text})
        this.props.thread.message.push({idAccount: global.account.sothutu, time: new Date().toString(), message: this.state.text})
        
        this.forceUpdate()
        this.setState({text: ""})
    }
    
    renderList() {
        console.log('thread')
        console.log(this.props.thread)
        if(this.props.thread.message==undefined) return
        setTimeout(() => {
            this.content._root.scrollToEnd()
        }, 500);
      return  this.props.thread.message.map((value, index)=>{
            return this.renderRow(value, index)
        })
    }

    renderRow(value, index) {
    //   console.log('adasdasda')
    //   console.log(value)
    if(value.idAccount==global.account.sothutu) {
          return(
            <ListItem style={{borderBottomWidth: 0, flexDirection: 'column', marginLeft: 0, paddingLeft: 0}}>
            <View style={{ flex: 1, width: deviceSize.width/3, alignItems: 'center', paddingBottom: 10}}>
                <Text style={{color: 'grey', fontSize: 10}}>{value.time}</Text>  
            </View>
            <View style={{ flexDirection: 'row'}}>
                <Body style={{justifyContent: 'center',alignItems: 'flex-end',  paddingHorizontal: 10}}>
                    <TouchableOpacity style={{borderRadius: 30, backgroundColor: color, padding: 10}}>
                    <Text style={{color:white}}>{value.message}</Text>
                    </TouchableOpacity>
                </Body>
                
            </View>
          </ListItem>
          )
      }
      return (
          <ListItem style={{borderBottomWidth: 0, flexDirection: 'column', paddingLeft: 0}}>
            <View style={{ flex: 1, width: deviceSize.width-20, alignItems: 'center', paddingBottom: 10}}>
                <Text style={{color: 'grey', fontSize: 10}}>{value.time}</Text>  
            </View>
            <View style={{ flexDirection: 'row',  width: deviceSize.width}}>
                
                    <View style={{flex: 2/10,  alignItems: 'center'}}>
                        <Thumbnail 
                        style={{ borderColor: 'grey', borderWidth: 1}}
                        source={{uri: Setting.SERVER_API+this.props.user.avatar}}/>
                    </View>

                    <View style={{justifyContent: 'center', marginLeft: 10,}}>
                        <TouchableOpacity style={{borderRadius: 30, backgroundColor: '#e1e3e8', padding: 10, }}>
                            <View>
                            <Text style={{marginLeft: 10, }}>{value.message}</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                
                <View style={{ flex: 1/10, position: 'absolute', right: 10, bottom: 5}}>
                    <Thumbnail 
                    style={{width: 20, height: 20, borderRadius: 15, marginTop: 10, }}
                     source={{uri: Setting.SERVER_API+this.props.user.avatar}}/>
                </View>
            </View>
          </ListItem>
          
      )
  }
  render() {

    return (
      <Container >
        <Header style={{height: deviceSize.height/9}}
        androidStatusBarColor={color}
        backgroundColor={color}
        >
            <Left style={{flex: 1/10, }}>
                <Icon 
                onPress={()=>this.props.navigation.goBack()}
               style={{color: white}} android='md-arrow-back' ios='ios-arrow-back-outline'/>
            </Left>
            <Body style={{flex: 7/10, alignItems:'center'}}>
            <TouchableOpacity>
                <View>
                    <Text style={{color: white}}>{this.props.user.nameUser + " "}<Icon   android='md-arrow-dropright' ios='ios-arrow-forward-outline' style={{fontSize: 10, color: white}}/></Text>
                    <Text  style={{fontSize: 10, color: '#e1e3e8'}}>đang hoạt động</Text>
                </View>
                </TouchableOpacity>
            </Body>
            <Right style={{flex: 2/10,}}>
                <View style={{flexDirection: 'row'}}>
                    <Icon ios='ios-call-outline' android='md-call' style={{marginRight: 20, color: white}}/>
                    <Icon style={{color: white}} ios='ios-videocam-outline' android='md-videocam'/>
                </View>
            </Right>
        </Header>
        <Content 
        ref={c => (this.content = c)} 
        style={{flex: 1}}>
            <List style={{borderBottomWidth: 0}}>
                
                    {
                        this.renderList()
                    }
                
            </List>
            
        </Content>
        <KeyboardAvoidingView keyboardVerticalOffset={Platform.OS=='ios' ? 0 : -300} behavior="padding" style={{backgroundColor: '#e1e3e8', }} >
            <View style={{flexDirection: 'row',alignItems: 'center', paddingLeft: 10, paddingTop: 10}}>
                <Icon style={{flex: 1/10, }} ios='ios-add-circle-outline' android='md-add-circle'/>
                <Icon style={{flex: 1/10}} ios='ios-camera-outline' android='md-camera'/>
                <Icon style={{flex: 1/10}} ios='ios-images-outline' android='md-images'/>
                <Icon style={{flex: 1/10}} ios='ios-mic-outline' android='md-mic'/>
                <Item 
                style={{flex: 5/10, marginBottom: 10}}
                rounded>
                    <Input
                    onChangeText={(text)=>this.setState({text})}
                    style={{marginLeft: 10}}
                    placeholder="Aa"
                    placeholderTextColor='gray'
                    multiline={true}
                    maxHeight={100}
                    returnKeyType='done'
                    value={this.state.text}
                    onFocus={()=>{
                        setTimeout(() => {
                            this.content._root.scrollToEnd()
                        }, 1000);
                    }}
                    />
                    <Icon ios='ios-happy-outline' android='md-happy'/>
                </Item>
                <TouchableOpacity 
                onPress={()=>this.postMessage()}
                style={{flex: 1/10, paddingLeft: 10,}}>
                    <Icon style={{ color: color}} ios='ios-send-outline' android='md-send'/>
                </TouchableOpacity>
            </View>
        </KeyboardAvoidingView>
      </Container>
    )
  }
};

const styles = StyleSheet.create({
    icon: {

    }
});