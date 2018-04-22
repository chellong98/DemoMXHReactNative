import React, { Component } from 'react';
import EditTodoScreen from './../screens/EditTodoscreen';
import {View} from 'react-native';
export interface Props {
    navigation: any,
    setValue: Function,
}
export default class edittodocontainer extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            year: "",  
            time: "", 
        }
    }

   
    
  render() {
    const {params} = this.props.navigation.state;
    if(params.pageid==1) {
        var year = params.year;//slice(4,params.year.length) + ",2018";
        var hour = params.hour<13 ? params.hour : params.hour-12;
        var minute = params.minute<10 ? 0+""+params.minute : params.minute; 
        var time = hour + ":" + minute;
        var text = params.text;
        // console.log(year + " | " + time);
        // console.log(params.minute);
        return (
            <EditTodoScreen navigation={this.props.navigation} year={year} time={time} text={text}/>
        )
    } else if(params.pageid==2) {
        console.log(params.name + " | " + params.time + " | " + params.status)
        var year = params.time.slice(0,9);
        var time = params.time.slice(10,params.time.length);
        var text = params.name;
       return (<EditTodoScreen navigation={this.props.navigation} year={year} time={time} text={text}/>) 
    }
    // this.setState({year,time});
    
  }
};
