import React, { Component } from 'react';
import ThisPostScreen from './../screens/ThisPostScreen';
import Pakage from './../utils/pakage';
import UserService from './../services/UserServices';
export interface Props {
  navigation: any,
  user: any,
}
export default class thispostcontainer extends Component<Props> {
  constructor(props) {
    super(props);
    this.state = {
      comments: [],
      idBaiDang: 0,
    }
  }

  loadComment(id) {
    this.state.idBaiDang = id;
    
    var baiDang = Pakage.loadComment(id, this.props.user.sothutu);

    this.services = new UserService();
    this.services.update((status)=>{
      console.log('response comment')
      // console.log(status)

        this.setState({comments: status.data})
      
      console.log(this.state.comments);
    }, baiDang);
  }

  // componentDidMount() {
  //   this.loadComment();
  // }
  postComment(idAccount, ndComment, callback) {
    // console.log('idAccount + textComment')
    // console.log(idAccount + " " + textComment)
    console.log('id : ' + this.state.idBaiDang)
    var comment = Pakage.postComment(idAccount, this.state.idBaiDang, ndComment);

    this.service = new UserService();
    this.service.update((status)=> {
      console.log('status')
      console.log(status)
      callback(status)
    }, comment);

  }

  render() {
    // console.log(' id bai dang ' + this.props.idBaiDang + " " + this.props.idNguoiDang)
    // this.loadComment()
    return (
      <ThisPostScreen
       navigation={this.props.navigation} 
       user={this.props.user} 
       comments={this.state.comments}
       postComment = {(idAccount, ndComment, callback)=>this.postComment(idAccount, ndComment, callback)}
       />
    )
  }
};
