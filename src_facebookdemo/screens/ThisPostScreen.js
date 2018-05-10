import React, { Component } from 'react';
import {View ,Alert, ScrollView,  Animated, Image, Keyboard, StyleSheet,TouchableOpacity, Text,Dimensions} from 'react-native';
import {Container, Card,List,Toast, CardItem, Item,Thumbnail, Button, ListItem, Input, Header, Body, Right, Title, Left,Icon, Content} from 'native-base';
import Setting from './../utils/setting';
import { Root } from "native-base";
const deviceSize = Dimensions.get("window");
var color = '#00903b'

export interface Props {
    navigation: any,
    user: any,
    comments: any,
    postComment: Function,
}
export default class thispostscreen extends Component<Props> {
    constructor(props) {
        super(props);
        this.state = {
            showToast: false,
            text: ''
        }
        console.log('comment')
        console.log(this.props.comments)
    }
    taoHang(value, index) {
        var ndComment = JSON.parse(value.noiDungComment)
        return (
            <ListItem style={{flex: 1,}}>
                <Left style={{flex: 1/10, position: 'absolute', top: 20 }}>
                    <Thumbnail circular small source={{uri: Setting.SERVER_API+value.image}}/>
                </Left>
                <Body style={{flex: 8/10, paddingLeft: 50, }}>
                    <View style={{ flexDirection: 'column'}}>
                        <View>
                            <Text style={{fontWeight: 'bold', color: color}}>{value.hoten}</Text>
                        </View>
                        <View style={{paddingLeft: 10}}>
                            <Text minimumFontScale={0.5} style={{fontSize: 10}}>{value.ngayComment}</Text>
                        </View>
                        <View style={{backgroundColor: 'rgba(0, 144, 59, 0.7)', borderRadius: 20, padding: 15, marginLeft: 10, marginTop: 10}}>
                            <Text style={{color: 'white'}}>{ndComment.ndComment}</Text>
                        </View>
                    </View>
                    <View>
                        <TouchableOpacity><Text><Icon active name='thumbs-up' style={{color: null, fontSize: 20}}/> Like</Text></TouchableOpacity>
                    </View>
                </Body>
               
            </ListItem>
        )
    }
    
  

    render() {
        return (
            <Root>
            <Container>
                <Header 
                    style={{height: deviceSize.height/5, backgroundColor: color, alignItems: 'center', justifyContent: 'center'}} androidStatusBarColor={color}
                >

                    <View style={{paddingBottom: 10, paddingTop: 10, alignItem: 'center', justifyContent: 'center',}}>
                        <View style={{flexDirection: 'column', alignItems: 'center',}}>
                            <Thumbnail large source={{uri: Setting.SERVER_API+this.props.user.image}} style={{borderColor: 'white'}}/>
                            <Text style={{paddingTop: 10, color: 'white'}}>{this.props.user.hoten}</Text>
                        </View>
                        
                    </View>
                </Header>
                <Card style={{ flexDirection: 'row', paddingHorizontal: 10, flex: 2/10}}>
                        <Left style={{flex: 1/10}}>
                            <Thumbnail circular small source={{uri: Setting.SERVER_API+global.account.image}}/>
                        </Left>
                        <Body style={{flex: 8/10}}>
                            <Item>
                                <Input 
                                multiline={true} 
                                placeholder='Comment...' 
                                style={{color: color}}
                                onChangeText={(text)=>this.setState({text})}
                                value={this.state.text}
                                />
                            </Item>
                        </Body>
                        <Right style={{flex: 1/10}}>
                            <TouchableOpacity onPress={()=>{
                                if(this.state.text=='') {
                                    Toast.show({
                                        text: "Viết gì đó đi bạn!",
                                        buttonText: "Okay",
                                        type: 'warning',
                                        duration: 3000,
                                    })
                                    return;
                                }
                                this.setState({text: ''})
                                this.props.postComment(global.account.sothutu, this.state.text, 
                                    (status)=>{
                                        var comment = {
                                            email: global.account.email,
                                            gioitinh: global.account.gioitinh,
                                            hoten: global.account.hoten,
                                            idBaiDang: status.data.idPost,
                                            idComment: 0,
                                            idNguoiDang: status.data.idAccount,
                                            image: global.account.image,
                                            imageCover: global.account.imageCover,
                                            linkfacebook: global.account,
                                            ngayComment: status.data.ngayComment,
                                            ngaysinh: global.account.ngaysinh,
                                            noiDungComment: status.data.ndComment,
                                            password: global.account.password,
                                            sothutu: global.account.sothutu,
                                        }
                                        this.props.comments.splice(0,0,comment);
                                        this.forceUpdate();
                                        Keyboard.dismiss()
                                    }
                                )   
                            }}>
                                <Icon android='md-send' ios='md-send' style={{color: color}}/>
                            </TouchableOpacity>
                        </Right>
                    </Card>
                <Content>
                    
                    <View style={{height: deviceSize/5}}>
                        <List>
                            {
                                this.props.comments.map((value, index)=>{
                                    return this.taoHang(value, index)
                                })
                            }
                        </List>
                    </View>
                </Content>
            </Container>
            </Root>
        )
    }
    
}