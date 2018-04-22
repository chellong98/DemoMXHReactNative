import React, { Component } from 'react';
import Todos from './../screens/todosscreen';
import Setting from './../utils/setting';
import TodosModel from './../model/TodosModel';
import {Container,Right, Header, Body, Left, Title,Content, Separator, ListItem, Thumbnail,List } from 'native-base';
import {View, Text, TouchableOpacity, StyleSheet,Alert,RefreshControl } from 'react-native';
var ListDone = Setting.ListTodo;
export interface Props {
  navigation: any,
  // time: any,
}
export interface State {}

export default class todoContainer extends Component<Props,State> {
  constructor (props) {
    super(props);
    this.state = {
      data : [],
      check: true,
      time: '',
    }
  }
  componentDidMount() {
    this.todosmodel = new TodosModel();
    // this.todosmodel.insertTodos(ListDone, (err, doc)=>{
    //   console.log(doc);
    // });
    // this.todosmodel.removeTodos();    
    this.todosmodel.findTodos({},(err,doc)=>{ //select *from database
      this.setState({data: doc});
      console.log(this.state.data);
    })
  }
  navigateEditTodo(status, name, time) {
    this.props.navigation.navigate('EditTodoContainer', {
      name: name,
      time: time,
      status: status,
      pageid : 2,
    })
    console.log(name+" | "+time+" | "+status);
  }
  renderItem(type,item,row)
  {
  console.log("rơ: "+row)
  if(item.status!=type) return 
    if (type==1)
    {
      return ( 
        <ListItem key = {row} style={styles.listItem} onPress={()=>this.navigateEditTodo(type, item.name, item.time)} >
        
        <Left>
          <TouchableOpacity onPress = {()=>this.changeStatus(row,item)} >
            <Thumbnail source={require('./../../images/checked.png')} />
          </TouchableOpacity>
        </Left>
        <Body style={styles.bodyItem}>
          <Title style={{color: '#45637C'}}>
            {item.name}
          </Title>
          <View style={{borderBottomWidth: 1, borderBottomColor: '#45637C', position: 'relative', bottom: 10, width: '100%'}}></View>
        </Body>
    
      </ListItem>)
    }
    else if (type==0)
    {
      return ( 
        <ListItem key = {row} style={styles.listItem} onPress={()=>this.navigateEditTodo(type, item.name, item.time)}>
        <Left>
          <TouchableOpacity onPress = {()=>this.changeStatus(row,item)}>
            <Thumbnail source={require('./../../images/notcheck.png')} />
          </TouchableOpacity>
        </Left>
        <Body style={styles.bodyItem}>
        <Title style={{color: '#45637C'}}>{item.name}</Title>
        </Body>
        <Right style={{flex: 7/10,}}>
          <Text style={{color: '#45637C'}}>{item.time!="" ? "Due: "+item.time.slice(0,4)+" @ "+item.time.slice(10,item.time.length) : '' }</Text>
        </Right>
      </ListItem>)
    }
  }

  changeStatus(index,item)
  {
  
    item.status = 1-item.status; //thay doi status
  
    this.state.data[index].status =   item.status //thay doi gia tri status cua phan tu trong mang
  
    data = this.state.data; //sets stae
    this.todosmodel = new TodosModel(); //update status
    this.todosmodel.updateTodos({name: this.state.data[index].name}, {$set: {status: item.status}},{}, (err, numAffected, affectedDocuments, upsert)=>{
      console.log('update: ')
      console.log( numAffected+ " | "+affectedDocuments+" | "+ upsert)
    });
    this.forceUpdate();
  
  console.log("click")
  
  }
 
  render() {
    const {params} = this.props.navigation.state;
    if(params==undefined) {
      console.log('no params navigate');
    }else{
      var item = params.item;
      // this.props.time = item.time;
      // item.time = "Due: " + item.time.slice(0,4)+" @ "+item.time.slice(10,item.time.length);
      console.log(item.time);
      // if(this.state.data.indexOf(item)) return;
      this.todosmodel = new TodosModel();

      // var check=null;
      // this.todosmodel.findTodos(item, (err, doc)=>{
      //   check = doc;
      //   console.log('check: ');
        
      // });
      // console.log(check);
      console.log(this.state.check);
      if(this.state.check) { //neeu list da ton tai item thi khong them item do vao nua
        this.todosmodel.insertTodos(item, (err,doc)=>{
            console.log('item ');
            console.log(doc);
            this.setState({check: false})
        })
      } 
      console.log(this.state.data.length);
    }
    return (
        <Todos 
         data = {this.state.data}
         renderItem = {(type, item, row)=>this.renderItem(type, item, row)}
         navigation={this.props.navigation}
         />
    )
  }
};

const styles = StyleSheet.create({
  listItem: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
  },
  bodyItem: {
    position: 'absolute', 
    left: 80,
    
  }
});