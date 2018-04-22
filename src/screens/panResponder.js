import React, { Component } from 'react';
import {PanResponder ,Animated,View, Text, TouchableOpacity, StyleSheet,Alert,RefreshControl } from 'react-native';

export interface Props {
    navigation: any,
    list: any,
    changeValue: Function
}

export default class panresponder extends Component<Props> {
    constructor(props) {
        super(props);
        console.log("asdasdas")
        this.state = {
            pan: new Animated.ValueXY(),

        }
        this.state.pan.setOffset({x:0, y:0})
        this.state.pan.setValue({x:0, y: -0*60+100})
        this.panResponder = PanResponder.create({
            onStartShouldSetPanResponder: ()=>true,
            onPanResponderMove: Animated.event([null,{
              dx: 0,
              dy: this.state.pan.y,
            }]),
            onPanResponderRelease: () => {
              var value = this.state.pan.__getValue();
              var item = Math.round((-value.y+100) / 60); //lay ra index cua tung doi tuong
              console.log(item);
             
              if(item<0 ) item = 0;
              if(item >= this.props.list.length) {
                item = this.props.list.length -1;
              }
              this.state.pan.setOffset({x:0, y:0})
              this.state.pan.setValue({x:0, y: -item*60+100})
              this.changeValue(item);
            },
            onPanResponderGrant: () => { //nhan xuong
              this.state.pan.setOffset(this.state.pan.__getValue());
            }
          });
    }

    changeValue(val) {
        this.props.changeValue(val);
    }
  render() {
  
    return (
        <Animated.View 
        {...this.panResponder.panHandlers}
        style={[
          {transform: [{translateY: this.state.pan.y}]},
          {flex: 1, height: this.props.list.length*60, alignItems: 'center',}
        ]}
      >
     
        {
            
          this.props.list.map((o,i) => {
            return (
              <Text style={{height:60,fontSize: 20, color: '#45637C'}}>{o}</Text>
            )
          })
        }
      </Animated.View>
    )
  }
};
