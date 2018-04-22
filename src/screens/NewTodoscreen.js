import React, { Component } from 'react';
import {PanResponder, Keyboard,Animated,View, Text, TouchableOpacity, StyleSheet,Alert,RefreshControl } from 'react-native';
import {Container,Right,Switch,Icon,Item,Input, Header, Body, Left, Title,Content, Separator, ListItem, Thumbnail,List } from 'native-base';
import PanResponderView from './panResponder';
import Setting from './../utils/setting';
import EditTodoScreen from './EditTodoscreen';
import TodosContainer from './../containers/todoContainer';
const listDate = [
  '1 July','2 July','3 July','4 July','5 July','6 July','7 July','8 July','9 July','10 July','11 July','12 July','13 July','14 July','15 July','16 July','17 July','18 July','19 July','20 July',
];
const listHour = [
  
];
const listMinute = [

];

var month = [];
var month_names_short= ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
var week_name = ['Mon', 'Tue', 'Wen', 'Thus', 'Fri', 'Sat', 'Sun'];
export interface Props {
  navigation : any,
  getDate: Function,
}
export default class newtodoscreen extends Component<Props> {

  constructor(props) {

    super(props);
    this.state = {
      status : false,
      animYear:new Animated.ValueXY(),
      animHour: new Animated.ValueXY(),
      year: "0",
      hour: "0",
      minute: "0",
      text: "",
    }
    this.props.getDate(2,2018);
    for(i=0; i<12; i++) {
      var day = this.props.getDate(i+1,2018);
      var k = 0;
      for(j=1; j<=day; j++) {
        month.push(week_name[k]+" "+ j + " " + month_names_short[i]);
        k++;
        if(k>=7) k=0;
      }
    }

    for(i=0; i<60; i++) {
      listMinute.push(i);
    }
    for(i=0; i<24; i++) {
      listHour.push(i);
    }

  }

  
  renderDate() {
    if(this.state.status === true) {
      return (<View>
        <ListItem style={{paddingHorizontal: 10, flex: 1}}>
          <Left>
            <Text style={styles.text}>Due by</Text>
          </Left>
          <Body style={{ position: 'relative', right: 30}}>
            <Text style={styles.text}>July 17, 2018</Text>
          </Body>
          <Right style={{flex: 6/10}}>
              <Text style={{color: '#45637C', fontSize: 15}}>1:00 PM</Text>  
          </Right>
        </ListItem>
        {this.datePicker()}
        </View>
      )
    }
  }
  
  datePicker()
  {
 
   
    return (
    <Animated.View style={{flex:1,flexDirection: 'row',height:200, backgroundColor: 'white'}}>
    <View style={styles.choice}></View>
      <PanResponderView list={month} changeValue={(val)=>this.setState({year: val})}/>
      <PanResponderView list={listHour} changeValue={(val)=>this.setState({hour: val})}/>
      <PanResponderView list={listMinute} changeValue={(val)=>this.setState({minute: val})}/>
    </Animated.View>
    )
  }

  setValue() {
    Keyboard.dismiss()
    console.log(month[this.state.year]);
    console.log(this.state.text);
    this.props.navigation.navigate('EditTodoContainer', {
      year: month[this.state.year], 
      hour: this.state.hour,
      minute: this.state.minute,
      text: this.state.text,
      pageid : 1,
    })
    
  }
  render() {

    return (
    <Container style={{flex: 1}}>
        <Header style={{backgroundColor: '#FFFFFF'}}>
            <Left>
              <TouchableOpacity onPress={()=>this.props.navigation.navigate('TodosContainer')}>
                <Icon name='close'  style={{color: '#45637C', fontSize: 40,}}/> 
              </TouchableOpacity>                             
            </Left>
            <Body style={{alignItems: 'center', marginLeft: 40}}>
                <Title style={{color: '#45637C'}}>New Todo</Title>
            </Body>
            <Right>
              <TouchableOpacity onPress={()=>this.setValue()}>
                <Text style={styles.text}>Save</Text>
              </TouchableOpacity>
            </Right>
        </Header>
        <View style={{flex: 1}}>
          
            <Content>
              <Item regular style={{backgroundColor: '#FFFFFF', marginTop: 20, paddingTop: 1}}>
                <Input  
                  placeholder='Todo Name'  
                  placeholderTextColor='rgba(69,99,124,0.5)' 
                  onChangeText={(text)=>this.setState({text})}
                
                />
              </Item>
              <View style={{backgroundColor: '#FFFFFF', marginTop: 20, paddingTop: 10, paddingBottom: 30, flex: 5/10}}>
                <ListItem style={{paddingHorizontal: 10, }}>
                    <Left>
                      <Text style={styles.text}>Due Date</Text>
                    </Left>
                    <Right>
                      <Switch 
                      onValueChange={(val)=>this.setState({status: val})} 
                      value={this.state.status} 
                      />          
                  </Right>
                </ListItem>
                {
                  this.renderDate()
                }
              </View>
            </Content>
          </View>
       
    </Container>
    )
  }
};

const styles = StyleSheet.create({
  text: {
    color: '#45637C', fontSize: 20
 
  },
  choice: { 
    borderBottomColor: 'grey',
    borderTopColor: 'grey',
    borderBottomWidth: 1, borderTopWidth: 1, 
    position: 'absolute', 
    top: 97, 
    height: 30, 
    zIndex: 1000, 
    width: '100%'
  }
});