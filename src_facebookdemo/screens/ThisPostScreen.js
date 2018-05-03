import React, { Component } from 'react';
import {View ,Alert, Animated, Image, Keyboard, StyleSheet,TouchableOpacity, Text,Dimensions} from 'react-native';
import {Container, Card,List, CardItem, Item,Thumbnail, Button, ListItem, Input, Header, Body, Right, Title, Left,Icon, Content} from 'native-base';

const deviceSize = Dimensions.get("window");
var avatar = {uri: 'https://www.bin.vn/upload/article/noavatar_1418273249.jpg'}
var color = '#00903b'
export default class thispostscreen extends Component {
    render() {
        return (
            <Container>
                <Header 
                    style={{height: deviceSize.height/4, backgroundColor: color}} androidStatusBarColor={color}
                >
                    <Left >
                        <TouchableOpacity style={{position: 'absolute', top: -60}}>
                            <Icon name='arrow-back' style={{fontSize: 30, color: 'white'}} />
                        </TouchableOpacity>
                    </Left>
                    <Body style={{paddingBottom: 10, paddingTop: 10}}>
                    <View style={{flexDirection: 'column', alignItems: 'center'}}>
                        <Image style={{width:deviceSize.height/5-30,height:deviceSize.height/5-30,borderRadius:50, borderColor:'white',borderWidth:2, }} source={avatar}/>
                        <Text style={{paddingTop: 10}}>long</Text>
                    </View>
                        
                    </Body>
                    <Right>
                    
                    </Right>
                </Header>
            </Container>
        )
    }
}