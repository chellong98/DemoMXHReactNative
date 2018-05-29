import React, { Component } from 'react';
import {View, Platform, Keyboard,KeyboardAvoidingView, Animated, Image, StyleSheet,TouchableOpacity, Text,Dimensions} from 'react-native';
import {Container, Tab, Tabs, TabHeading, Card,List, CardItem, Item,Thumbnail, Button, ListItem, Header, Body, Right, Title, Left,Icon, Content, Input} from 'native-base';
import Setting from './../utils/setting';
const deviceSize = Dimensions.get("window");
var color = '#00903b'
var messages = [
    {
        nameUser: 'Long Chel',
        avatar: 'https://files.gamebanana.com/img/ico/sprays/550f7e584c470.png',
        message: 'test',
        time: '10:00',
    },
    {
        nameUser: ' Giấy Nháp',
        avatar: 'https://files.gamebanana.com/img/ico/sprays/550f7e584c470.png',
        message: 'Let’s dive right into it. First, a server and client need to be created. The example will be using an Express server and a plain React Native project',
        time: '10:00',
    }
]
var active =[
    {
        nameUser: 'Long Chel',
        avatar: 'https://files.gamebanana.com/img/ico/sprays/550f7e584c470.png',
        active: 1,
    },
    {
        nameUser: 'Giấy Nháp',
        avatar: 'https://files.gamebanana.com/img/ico/sprays/550f7e584c470.png',
        active: 0,
    }
]
export interface Props {
    navigation: any,
    listActive: any
}
export default class componentName extends Component {
    constructor(props) {
        super(props);
        // console.log(active[0].message)
        console.log('list')
        console.log(this.props.listActive)
    }
    _onLayout(event) {
        const{x,y,width, height} = event.nativeEvent.layout;
        console.log(height, width)
    }
    renderRow(value, index) {
            if(value.message!=undefined) {
            return (
                <ListItem style={{borderBottomWidth: 0}}>
                <TouchableOpacity 
                style={{flexDirection: 'row', }}>
                    <Left style={{flex: 2/10, }}>
                        <Thumbnail source={{uri: value.avatar}}/>
                    </Left>
                    <Body style={{flex: 6/10, justifyContent: 'center'}}>
                        <View style={{flexDirection: 'column'}}>
                            <View>
                                <Text style={{fontWeight:'bold', fontSize: 20}}>{value.nameUser}</Text>
                            </View>
                            <View>
                                <Text style={{color: 'grey'}}>{value.message.length>10 ? value.message.slice(0,10).concat('...') : value.message}</Text>
                            </View>
                        </View>
                    </Body>
                    <Right style={{flex: 2/10, }}>
                        <View>
                            <Text style={{color: 'grey'}}>{value.time}</Text>
                        </View>
                    </Right>
                    </TouchableOpacity>
                </ListItem>
            )
        }
       return (
           <TouchableOpacity  onPress={()=>{
            global.socket.emit('newChat',{idAccount: global.account.sothutu, idUser: value.idUser})
            this.props.navigation.navigate('MessengerContainer', {user: value})
            }}>
                <Card style={{flexDirection: 'row', padding: 10}}>
                    <Left style={{flex: 2/10,}}>
                        <View style={{borderWidth: 2, borderColor: color, borderRadius: 56, padding: 2}}>
                            <Thumbnail
                            style={{padding: 2}}
                            onLayout={(e)=>this._onLayout(e)}
                            // style={{}} 
                            source={{uri: Setting.SERVER_API+value.avatar}}/>
                        </View>
                    </Left>
                    <Body style={{flex:  6/10, justifyContent: 'flex-start', flexDirection: 'row'}}>
                        <View>
                            <Text style={{fontSize: 15, fontStyle: 'italic', color: 'grey'}}>{value.idUser==global.account.sothutu ? (value.nameUser+" (Me)") : value.nameUser}</Text>
                        </View>
                    </Body>
                    <Right style={{flex: 2/10}}>
                        <View style={{backgroundColor: value.active ? color : 'red'}}>
                            <Text style={{color: 'white'}}>{value.active ? 'Active' : 'Offline'}</Text>
                        </View>
                    </Right>
                </Card>
           </TouchableOpacity>
        )                                   
    }
  render() {
    return (
        <Container>
            <Header hasTabs style={{backgroundColor: color}} androidStatusBarColor={color}>
                <Left style={{position: 'absolute', top: Platform.OS ? 20 : 0, left: 10}}>
                <TouchableOpacity onPress={()=>this.props.navigation.goBack()}>
                    <Icon style={{color: 'white'}} ios='ios-arrow-back-outline' android='md-arrow-back'/>
                </TouchableOpacity>    
                </Left>
            </Header>
            
            <Tabs
            tabBarUnderlineStyle={{backgroundColor: color}}
            tabBarPosition='bottom'
            style={{backgroundColor: color}}>
            <Tab 
            heading={ <TabHeading style={{...Platform.select({
                android: {
                    backgroundColor: '#edeaea'
                }
                })}}>
                <Icon style={{color: color}} ios='ios-chatbubbles-outline' android='md-chatbubbles' />
                <Text> Messages</Text>
            </TabHeading>}>
                <Content style={{}}>
                    <List style={{flex: 1, }}>
                    {
                        messages.map((value, index)=>{
                            return this.renderRow(value, index)
                        })
                    }
                    </List>
                </Content>
            </Tab>
            <Tab heading={ <TabHeading style={{...Platform.select({
                    android: {
                        backgroundColor: '#edeaea'
                    }
            })}}>
                <Text>Active</Text>
            </TabHeading>}>
                <Content style={{}}>
                    <List >
                    {
                        this.props.listActive.map((value, index)=>{
                            return this.renderRow(value, index)
                        })
                    }
                    </List>
                </Content>
            </Tab>
            <Tab heading={ <TabHeading style={{...Platform.select({
                android: {
                    backgroundColor: '#edeaea'
                }
            })}}>
            <Icon style={{color: color}} name="apps" />
            </TabHeading>}>
                <View>
                    
                </View>
            </Tab>
            </Tabs>
            
      </Container>
    )
  }
};
