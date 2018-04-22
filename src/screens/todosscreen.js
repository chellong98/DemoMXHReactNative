import React, { Component } from 'react';
import {Container,Right, Header, Body, Left, Title,Content, Separator, ListItem, Thumbnail,List } from 'native-base';
import {View, Text, TouchableOpacity, StyleSheet,Alert,RefreshControl } from 'react-native';


export interface Props {
  navigation: any,
  data : any,
  renderItem : Function,
}
export default class todos extends Component<Props> {
  constructor(props){
    super(props)
    
  }
  render() {
    
   
    return (
      <Container style={{flex: 1, backgroundColor: '#FFFFFF'}} >
        <Header style={{backgroundColor: '#FFFFFF'}} >
            <View style={{justifyContent: 'center'}}>
              <Title style={{color: '#45637C'}}>Todos</Title>              
            </View>
            <TouchableOpacity style={{position: 'absolute', right: 10, top: 13}} onPress={()=>this.props.navigation.navigate('NewTodoContainer')}>
              <Text style={{color: '#45637C', fontSize: 20}}>New</Text>
            </TouchableOpacity>
        </Header>
        <Content style={{flex: 1,}}>
          <View>
            <Separator bordered>
              <Text>Not Done</Text> 
            </Separator> 
            <List> 
            {
              this.props.data.map((value,index)=>{ //cai nay la sao
                return this.props.renderItem(0,value,index)
              })

            } 
            </List>
            <Separator bordered>
              <Text>Done</Text>
            </Separator>
            <List> 
             {
               this.props.data.map((value,index)=>{
                  return this.props.renderItem(1,value,index)
              })
            }
          </List>
          </View>
        </Content>
      </Container>
      
    )
  }
  
};
 
