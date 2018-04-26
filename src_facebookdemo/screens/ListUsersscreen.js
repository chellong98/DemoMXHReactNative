import React, { Component } from 'react';
import {View , Animated, Image, StyleSheet,TouchableOpacity, Text,Dimensions} from 'react-native';
import {Container, Card,List, CardItem, Item,Thumbnail, Button, ListItem, Header, Body, Right, Title, Left,Icon, Content} from 'native-base';
import DrawNavContainer from './../container/CustomDrawNav';
import Setting from './../utils/setting';
const {width, height} = Dimensions.get('window');
export interface Props {
    navigation: any, 
    login : Function,
    dataUsers: any,
}

export default class listuser extends Component {
    constructor(props) {
        super(props);
        this.state = {
            // list: [
            //     {hoten: 'giaynhap', image: 'uploadImages/giaynhap.jpg', cover: './../ACT.jpg', ngaysinh: '1998-02-13', linkfacebook: 'https://www.facebook.com/GiayNhapcoder', gioitinh: 'Male', email: 'giaynhapcoder@gmail.com', password: 'cuccut123'},
            //     {hoten: 'chellong', image: 'uploadImages/chellong.jpg', cover: './../ACT.jpg', ngaysinh: '1998-02-13', linkfacebook: 'https://www.facebook.com/GiayNhapcoder', gioitinh: 'Male', email: 'giaynhapcoder@gmail.com', password: 'cuccut123'},
            //     {hoten: 'lehieu', image: 'uploadImages/sucvathieu.jpg', cover: './../ACT.jpg', ngaysinh: '1998-02-13', linkfacebook: 'https://www.facebook.com/GiayNhapcoder', gioitinh: 'Male', email: 'giaynhapcoder@gmail.com', password: 'cuccut123'}
            // ],
            width: 1,
            height: 1,
            layout: new Animated.Value(1),
            list: this.props.dataUsers,
            
        };

        global.listUsers = this.state.list; //cho CustomNav su dung
       
    }

    onLayout(event) {
        const {x, y, height, width} = event.nativeEvent.layout;
        if ( this.state.width==1){

             this.setState({width: width, height: height})
        }
        console.log(width);
    }

    componentWillMount() {
        for(i=0; i<this.state.list.length; i++) {
            this.state.list[i].statusLike = false //them 1 thuoc tinh vao doi tuong trong mang
            this.state.list[i].statusComent = false 
        }
        this.forceUpdate()
     
    }
    taoHang(item, index) {
        console.log("yes");
        var sourceImg = "'"+item.thumbnail+"'";
        
        var likeColor =item.statusLike==true ? '#00903b' : undefined
        var commentColor=item.statusComment==true ? '#00903b' : undefined
        return (
            <ListItem key={index} style={{borderBottomWidth: 0}}>
            <Card onLayout={(e)=>this.onLayout(e)}>
                <CardItem >
                    <Item style={{paddingBottom: 10}}>
                    <Left style={{flexDirection: 'row'}} >                       
                        <Thumbnail source={{uri: Setting.SERVER_API+item.image}}/>
                        <View style={{paddingLeft: 20}}>
                            <Text style={{fontSize: 20,color: '#00903b', fontWeight: '100'}}>{item.hoten}</Text>
                            <Text style={{fontStyle: 'italic'}}>{item.ngaysinh} - <Icon android='md-globe' ios='md-globe' style={{fontSize: 15, color: '#00903b'}}/></Text>
                        </View>
                    </Left>
                    <Right>
                        <Icon android='md-more' ios='md-more'/>
                    </Right>
                    </Item>
                </CardItem>
                <CardItem>
                    <Body> 
                        <Image source={{uri: Setting.SERVER_API+item.imageCover}} style={{width: this.state.width-50, height: this.state.height, marginRight: 20}}/>
                        
                    </Body>
                </CardItem>
                <CardItem >
                    <Left>
                        <Button //nut like
                        transparent
                        onPress={()=>{
                            this.state.list[index].statusLike=!this.state.list[index].statusLike; 
                            this.forceUpdate(); 
                            // console.log(this.state.statusLike)
                            }
                        }
                        >
                            <Text style={{color: likeColor}}><Icon active name="thumbs-up" style={{color: likeColor}}/> Likes</Text>
                        </Button>
                    </Left>
                    <Body>
                        <Button transparent onPress={()=>{  //nut comment
                            this.state.list[index].statusComment=!this.state.list[index].statusComment; 
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
  render() {
    var listItem = this.state.list;
    // console.log("data: ");
    // console.log(listItem);
    return (
        <Container style={{flex: 1}}>
            <Header 
            style={{}} 
            backgroundColor='#00903b' 
            androidStatusBarColor='#00903b'>
                <Left style={{flex: 3/10}} >
                    <TouchableOpacity onPress={ () => {this.props.navigation.navigate('DrawerToggle')}}>
                        <Icon android='md-menu' ios='md-menu' style={{color: 'white'}}/>
                    </TouchableOpacity>
                </Left>
                <Body style={{flex:1, alignItems: 'center'}}>
                    <Title style={{color: 'white'}}>Users Infomation</Title>
                </Body>
                <Right style={{flex: 4/10}}>
                
                </Right>
            </Header>
            <Content style={{flex: 3/10}}>
                <List
                  style={{}}
                >
                {
                    this.state.list.map((value, index)=>{
                        // value.statusLike = true;
                       return this.taoHang(value, index)
                    }) 
                }
                </List>
            </Content>
        </Container>
    )
  }
};

const styles = StyleSheet.create({
    Item: {
        borderBottomWidth: 0,
         flex: 1
    },
    leftItem: {
        flex: 3/10,
    },
    textLeft: {
        fontWeight: '100', 
        color: '#00903b'    
    }
});