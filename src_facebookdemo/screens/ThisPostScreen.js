import React, { Component } from 'react';
import {View ,Alert, ScrollView, Animated, Image, Keyboard, StyleSheet,TouchableOpacity, Text,Dimensions} from 'react-native';
import {Container, Card,List, CardItem, Item,Thumbnail, Button, ListItem, Input, Header, Body, Right, Title, Left,Icon, Content} from 'native-base';

const deviceSize = Dimensions.get("window");
var avatar = {uri: 'https://www.bin.vn/upload/article/noavatar_1418273249.jpg'}
var color = '#00903b'
var list = [
    'Javascript, ngôn ngữ luôn nằm trong những hot languages trong các năm gần đây. Xuất hiện ở hầu hết các khía cạnh của lập trình như lập trình web, lập trình mobile application, VR, AR, 3D game, lập trình lệnh cho Drone, ... Cho tới bây giờ tôi vẫn không hiểu tại sao javascript lại có thể phổ biến đến vậy, và rốt cuộc điều gì hay ho ở javascript khiến nhà nhà đều học javascipt, người người đều là full stack, hay liệu có đứa nào giống mình không hiểu gì về javascript mà vẫn trở thành full stack developer hay không. Trong lúc học, tìm hiểu về javascript cùng mọi thứ liên quan đến nó, tôi đã vấp phải vô vàn những câu hỏi về javascript, nên tôi đã nảy ra ý định tập trung các câu hỏi đó vào một nơi, để sau này có quên thì còn có chỗ mà tham khảo. Trong bài post lần này tôi sẽ tập trung vào nhữn', 'b', 'c',
];
export default class thispostscreen extends Component {
    taoHang(value, index) {
        return (
            <ListItem style={{flex: 1,}}>
                <Left style={{flex: 1/10, position: 'absolute', top: 20 }}>
                    <Thumbnail circular small source={avatar}/>
                </Left>
                <Body style={{flex: 8/10, paddingLeft: 50, }}>
                    <View style={{backgroundColor: 'white', flexDirection: 'column', padding: 20, paddingTop: 0, borderRadius: 20}}>
                        <Text style={{fontWeight: 'bold', color: color}}>long</Text>
                        <View style={{}}>
                            <Text>{value}</Text>
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
            <Container>
                <Header 
                    style={{height: deviceSize.height/5, backgroundColor: color, alignItems: 'center', justifyContent: 'center'}} androidStatusBarColor={color}
                >

                    <View style={{paddingBottom: 10, paddingTop: 10, alignItem: 'center', justifyContent: 'center',}}>
                        <View style={{flexDirection: 'column', alignItems: 'center',}}>
                            <Thumbnail large source={avatar} style={{borderColor: 'white'}}/>
                            <Text style={{paddingTop: 10, color: 'white'}}>long</Text>
                        </View>
                        
                    </View>
                </Header>
                <Card style={{ flexDirection: 'row', paddingHorizontal: 10, flex: 2/10}}>
                        <Left style={{flex: 1/10}}>
                            <Thumbnail circular small source={avatar}/>
                        </Left>
                        <Body style={{flex: 8/10}}>
                            <Item>
                                <Input multiline={true} placeholder='Comment...' style={{color: color}}/>
                            </Item>
                        </Body>
                        <Right style={{flex: 1/10}}>
                            <TouchableOpacity>
                                <Icon android='md-send' ios='md-send'/>
                            </TouchableOpacity>
                        </Right>
                    </Card>
                <Content>
                    
                    <View style={{height: deviceSize/5}}>
                        <List>
                            {
                                list.map((value, index)=>{
                                    return this.taoHang(value, index)
                                })
                            }
                        </List>
                    </View>
                </Content>
            </Container>
        )
    }
}