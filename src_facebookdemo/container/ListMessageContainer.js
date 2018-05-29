import React, { Component } from 'react';
import {View, Keyboard,KeyboardAvoidingView, Animated, Image, StyleSheet,TouchableOpacity, Text,Dimensions} from 'react-native';
import {Container, Card,List, CardItem, Item,Thumbnail, Button, ListItem, Header, Body, Right, Title, Left,Icon, Content, Input} from 'native-base';
import Message from './../screens/ListMessageScreen';
import SocketIOClient from 'socket.io-client';
export interface Props {
    navigation: any,
}
export default class listmessage extends Component {
    constructor(props) {
        super(props);
        // this.socket = SocketIOClient('http://192.168.2.2:8082');
        console.log('socket')
        console.log(global.socket.connected)
        this.getUserActive()
        global.refresh = ()=>{
            // console.log('sdfgsdgdfhg')
        
            this.forceUpdate()
        }
        global.socket.emit('getListActive')
    }

    getUserActive() {
        let list = [];
        global.dataUsers.forEach((item)=>{
            
            list.push({
                idUser: item.sothutu,
                nameUser: item.hoten,
                avatar: item.image,
                active: item.sothutu==global.account.sothutu ? 1 : item.statusActive,
            })
            
        })
        
        list.sort((a,b)=>{
            if(a.active==undefined) a.active= 0;
            if(b.active==undefined) b.active= 0;
            if(a.active<b.active) return 1;
            else return -1
        })
        console.log(list)
        return list;
        // console.log(list)
    }

    render() {
        // this.getUserActive()
        return (
        <Message 

        listActive = {this.getUserActive()}
        navigation={this.props.navigation}/>
        )
    }
};
