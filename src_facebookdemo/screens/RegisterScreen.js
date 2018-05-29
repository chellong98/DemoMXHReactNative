
import React, { Component } from 'react';
import {View ,Alert, ScrollView,  Animated, Image,RefreshControl, Keyboard, StyleSheet,TouchableOpacity, Text,Dimensions, ImageBackground} from 'react-native';
import {Container, Card,List,Toast, CardItem, Item,Thumbnail, Button, ListItem, Input, Header, Body, Right, Title, Left,Icon, Content, CheckBox} from 'native-base';
import { Field,reduxForm ,Form} from 'redux-form';
import DatePicker from 'react-native-datepicker'
import Pakage from './../utils/pakage';
import Setting from './../utils/setting';
const deviceSize = Dimensions.get("window");
var color = '#00903b'
export interface Props {
    navigation: any,
    _signUp: Function,
}
export default class registerscreen extends React.Component<Props>{
    constructor(props) {
        super(props)
        this.state = {
            refreshing: false,
            width: 0,
            date:"",
            uriImage: {
                cover: "https://www.inovex.de/blog/wp-content/uploads/2018/03/react-native-800x450.png",
                avatar: "https://files.gamebanana.com/img/ico/sprays/550f7e584c470.png"
            },
            gender: {
                male: true,
                female: false,
            },
            firstname: "",
            lastname: "",
            email: "",
            password: "",
            iconfirstname: "",
            iconlastname: "",
        }
    }
 
    _onLayout(event) {
        const {x,y,width, height} = event.nativeEvent.layout;
        if(this.state.width!=0) return;
        this.setState({width})
        console.log('width ' + width)
        
    }
    _datePicker(date) {
        console.log('date')
        console.log(date)
        this.setState({date: date})
    }
    _uploadImageCover() {
        // Pakage.upLoadImage((uri)=> {
        //     this.setState({uriImage: {cover: uri, avatar: this.state.uriImage.avatar}})
        // })
        
    }
    _uploadImageAvatar() {
        Pakage.upLoadImage((uri)=> {
            this.setState({uriImage: {cover: this.state.uriImage.cover, avatar: uri}})
        })
    }
    checkValidate(item) {
        
        console.log(item)
        if(Setting.check.maxLength15(item)!=undefined){
            Toast.show({
                text: Setting.check.maxLength15(item),
                type: 'warning',
                buttonText: "OK",
                duration: 2000,
                position: 'top'
            })
            return false
        } 
         if(Setting.check.minLength2(item)!=undefined) {
            Toast.show({
                text: Setting.check.minLength2(item),
                type: 'warning',
                buttonText: "OK",
                duration: 2000,
                position: 'top'
            })
            return false
        }
         if(Setting.check.alphaNumeric(item)!=undefined) {
            Toast.show({
                text: Setting.check.alphaNumeric(item),
                type: 'warning',
                buttonText: "OK",
                duration: 2000,
                position: 'top'
            })
            return false
        }
        return true
    }
    signUp() {
        if(this.state.firstname=="" || this.state.lastname=="" || this.state.email=="" || this.state.password=="" || this.state.date=="") {
            Toast.show({
                text: "all fields is required",
                type: 'warning',
                buttonText: "OK",
                duration: 2000,
                position: 'top'
            })
            return 
        }
       if(!this.checkValidate(this.state.firstname)) {
           console.log(this.state.firstname)
           console.log('first name')
            return
       }
       if(!this.checkValidate(this.state.lastname)) {
            console.log('last name')
            return
        }
        if(Setting.check.email(this.state.email)!=undefined) {
            Toast.show({
                text: Setting.check.email(this.state.email),
                type: 'warning',
                buttonText: "OK",
                duration: 2000,
            })
            return
       }
       if(!this.checkValidate(this.state.password)) {
            console.log('password')
            return
        }
        else {
            let info = {
                firstname: this.state.firstname,
                lastname: this.state.lastname,
                email: this.state.email,
                password: this.state.password,
                gender: this.state.gender.male ? 'Male' : 'Female',
                linkfacebook: '',
                imageAvatar: this.state.uriImage.avatar,
                imageCover: this.state.uriImage.cover,
                birthday: this.state.date,
            }
            
            console.log('info')
            console.log(info)
            this.props._signUp(info)
        }
    }
    render() {
        console.log('image cover ' + this.state.uriImage.cover)
        return (
            <Container>
                <Header style={{backgroundColor: color}} androidStatusBarColor={color}>
                    <Left style={{flex: 1/10}}>
                        <TouchableOpacity onPress={()=>this.props.navigation.goBack()}>
                            <Icon android='md-arrow-back' ios='md-arrow-back' style={{color: 'white'}}/>
                        </TouchableOpacity>
                    </Left>
                    <Body style={{flex: 8/10}}>
                        <Title style={{color: 'white',}}>Sign Up</Title>
                    </Body>
                    <Right style={{flex: 1/10}}>

                    </Right>
                </Header>
                <Content>
                    <Card style={{flex: 3/10,backgroundColor: 'rgba(0, 144, 59, 0.5)'}}>
                        <TouchableOpacity
                        ref={(self)=>this._button=self}
                        // onPress={()=>this._button.setOpacityTo(0.)}
                        style={{backgroundColor: 'white'}}
                        onPress={()=>this._uploadImageCover()}
                        >
                            <Animated.View style={{opacity: 0.2, }}>
                            <Image style={{width: deviceSize.width-5, height: deviceSize.height/4}} source={{uri: this.state.uriImage.cover}}
                            />
                            </Animated.View>
                        </TouchableOpacity>
                        <TouchableOpacity 
                        onPress={()=>this._uploadImageAvatar()}
                        style={{position: 'absolute', zIndex: 10, top: deviceSize.height/10, left: deviceSize.width/2-this.state.width/2, borderWidth: 1, borderRadius: this.state.width/2}}>
                            <Thumbnail 
                            onLayout={(e)=>this._onLayout(e)}
                            large 
                            source={{uri: this.state.uriImage.avatar}}
                            />
                       </TouchableOpacity>
                    </Card>
                    <List style={styles.list}
                        
                      
                    >
                        <ListItem style={styles.listitem}>
                            <Left style={styles.leftlistitem}>
                                <Icon 
                                style={{color: this.state.iconfirstname==='md-checkmark' ? color : null}}
                                android={this.state.iconfirstname=="" ? 'md-alert' : this.state.iconfirstname} ios={this.state.iconfirstname=="" ? 'md-alert' : this.state.iconfirstname}/>
                            </Left>
                            <Body style={styles.bodylistitem}>
                                <Text style={{fontWeight: 'bold', fontSize: 15}}>First name</Text> 
                            </Body>
                            <Left style={styles.rightlistitem}>
                                <Input
                                onKeyPress={(submit)=>{
                                    if(this.checkValidate(this.state.firstname)) {
                                        this.setState({iconfirstname: 'md-checkmark'})
                                    } else {
                                        this.setState({iconfirstname: 'md-alert'})
                                    }
                                }}
                                // onKeyPress={(keypress)=>console.log(keypress.nativeEvent)}
                                onChangeText={(text)=>this.setState({firstname: text})}
                                returnKeyType="next" 
                                style={{color: color}}/>
                            </Left>
                        </ListItem >
                        <ListItem style={styles.listitem}>
                            <Left style={styles.leftlistitem}>
                                <Icon style={{color: this.state.iconlastname=='md-checkmark' ? color : null}}
                                android={this.state.iconlastname=="" ? 'md-alert' : this.state.iconlastname} ios={this.state.iconlastname=="" ? 'md-alert' : this.state.iconlastname}/>
                            </Left>
                            <Body style={styles.bodylistitem}>
                                <Text style={{fontWeight: 'bold', fontSize: 15}}>Last name</Text> 
                            </Body>
                            <Left style={styles.rightlistitem}>
                                <Input
                                onKeyPress={(submit)=>{
                                    if(this.checkValidate(this.state.lastname)) {
                                        this.setState({iconlastname: 'md-checkmark'})
                                    }else {
                                        this.setState({iconlastname: 'md-alert'})
                                    }
                                }}
                                returnKeyType="next"
                                // onKeyPress={(keypress)=>console.log(keypress.nativeEvent)}
                                onChangeText={(text)=>this.setState({lastname: text})}
                                style={{color: color}}/>
                            </Left>
                        </ListItem>
                        <ListItem style={styles.listitem}>
                            <Left style={styles.leftlistitem}>
                                <Icon android='md-mail' ios='md-mail' 
                                style={{color: Setting.check.email(this.state.email)!=undefined ? 'red' : undefined}}/>
                            </Left>
                            <Body style={styles.bodylistitem}>
                                <Text style={{fontWeight: 'bold', fontSize: 15}}>Email</Text> 
                            </Body>
                            <Left style={styles.rightlistitem}>
                                <Input
                                onKeyPress={(submit)=>{
                                    if(Setting.check.email(this.state.email)!=undefined) {
                                        Toast.show({
                                            text: Setting.check.email(this.state.email),
                                            type: 'warning',
                                            buttonText: "OK",
                                            duration: 2000,
                                        })
                                    }
                                }} 
                                onChangeText={(text)=>this.setState({email: text})}
                                keyboardType="email-address" 
                                returnKeyType="next" 
                                style={{color: color}}/>
                            </Left>
                        </ListItem>
                        <ListItem style={styles.listitem}>
                        <Left style={styles.leftlistitem}>
                            <Icon 
                            style={{color: Setting.check.maxLength15(this.state.password)==undefined&&Setting.check.minLength2(this.state.password)==undefined&&Setting.check.alphaNumeric(this.state.password)==undefined ? undefined : 'red'}}
                            android='md-lock' ios='md-lock'/>
                        </Left>
                        <Body style={styles.bodylistitem}>
                            <Text returnKeyType="next" style={{fontWeight: 'bold', fontSize: 15}}>Password</Text> 
                        </Body>
                        <Left style={styles.rightlistitem}>
                            <Input 
                            onKeyPress={(submit)=>{
                                this.checkValidate(this.state.password);
                            }}
                            onChangeText={(text)=>this.setState({password: text})}
                            returnKeyType="next" 
                            secureTextEntry 
                            style={{color: color}}/>
                        </Left>
                        </ListItem>

                    </List>
                    <View style={styles.checkbox}>
                        <View style={{flexDirection: 'row'}}>
                            <Icon android='md-transgender ' ios='md-transgender' style={{fontSize:20}}/> 
                            <Text style={{fontWeight: 'bold'}}> Gender</Text>
                        </View>
                        <View style={{flexDirection: 'row'}}>
                            <CheckBox checked={this.state.gender.male} 
                            onPress={()=>{this.setState({gender: {male: !this.state.gender.male , female: !this.state.gender.female}})}}
                            color={color}/>
                            <Text style={{paddingLeft: 10}}> Male</Text>
                        </View>
                        <View style={{flexDirection: 'row'}}>
                            <CheckBox 
                            onPress={()=>this.setState({gender: {male: !this.state.gender.male , female: !this.state.gender.female}})}
                            checked={this.state.gender.female} 
                            color={color}/>
                            <Text style={{paddingLeft: 10}}> Female</Text>
                        </View>
                    </View>
                    <View style={{backgroundColor: 'white', paddingBottom: 10,}}>
                    <ListItem style={{ height: 50}}>
                        <Left style={styles.leftlistitem}>
                        <Icon android='md-calendar' ios='md-calendar'/>
                        </Left>
                        <Body style={styles.bodylistitem}>
                            <Text style={{fontWeight: 'bold', fontSize: 15}}>BirthDay</Text> 
                        </Body>
                        <Left style={styles.rightlistitem}>
                            <DatePicker
                            style={{width: 200}}
                            date={this.state.date}
                            mode="date"
                            placeholder="select date"
                            format="YYYY-MM-DD"
                            androidMode='calendar'
                            maxDate="2018-12-31"
                            minDate="1900-01-01"
                            confirmBtnText="Confirm"
                            cancelBtnText="Cancel"
                            customStyles={{
                            dateIcon: {
                                position: 'absolute',
                                left: 0,
                                top: 4,
                                marginLeft: 0
                            },
                            dateInput: {
                                marginLeft: 36,
                                borderRadius: 30
                            }
                            // ... You can check the source to find the other keys.
                            }}
                            onDateChange={(date)=>this._datePicker(date)}
      />
                        </Left>
                    </ListItem>
                    </View>
                    <View >
                        <Button  full success onPress={()=>this.signUp()}>
                            <Text style={{color: 'white'}}>Sign Up</Text>
                        </Button>
                    </View>
                </Content>
            </Container>
        )
    }
}

const styles = StyleSheet.create({
    list: {
        marginTop: 10,
        backgroundColor: 'white',
        paddingBottom: 10,
    },
    listitem: {
        height: 50
    },
    leftlistitem: {
        flex: 1/10
    },
    bodylistitem: {
        flex: 3/10
    },
    rightlistitem: {
        flex: 6/10
    },
    checkbox: {
        marginTop: 10,
        flexDirection: 'row',
        marginLeft: 20,
        paddingBottom: 10
    }
});