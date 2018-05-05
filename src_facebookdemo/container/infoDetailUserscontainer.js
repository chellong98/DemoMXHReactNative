import React, { Component } from 'react';
import InfoUsersScreen from './../screens/infoDetailUsersscreen';
import Pakage from './../utils/pakage';
import UserService from './../services/UserServices';
export interface Props { 
  navigation: any,
  allPosts: any,
}

export default class infoDetailUsersContainer extends Component<Props> {
  
  constructor(props) {
    super(props) 
    this.state = {

    }
  }
  
  postBaiDang(idnguoidang, noidung, imageUri) {
    var baiDang = Pakage.postBaiDang(idnguoidang, noidung, imageUri);
    // console.log("bai Dang");
    // console.log(baiDang);
    this.services = new UserService();
    this.services.update((status)=>{
      // console.log("response");
      // console.log(status);  
    }, baiDang);
  }

  layToanBoBaiDang(idUser, callback) {    
    var idUser = Pakage.layToanBoBaiDang(idUser);
  // console.log('account')
  // console.log(account); 
    this.services = new UserService();
    this.services.update((status)=>{  
    // console.log("response");
    // console.log(status)       
    
    callback(
      status.data.allPosts,  
      status.data.likesOfPost, 
      status.data.commentsOfPost, 
      status.data.idNguoiLike);
    }, idUser);   
  }
  
 render() {
    const {params} = this.props.navigation.state;
    var user = params.user;
    //  this.layToanBoBaiDang(user.sothutu)
     //truyen vao id nguoi dc chon
    // console.log("user");
    // console.log(user) 
    return (
      <InfoUsersScreen 
      navigation={this.props.navigation} 
      user={user} 
      postBaiDang={(idnguoidang, noidung, imageUri)=>this.postBaiDang(idnguoidang, noidung, imageUri)}
      layToanBoBaiDang={(idUser, callback)=>{this.layToanBoBaiDang(idUser, callback)}}
      />
    )
  }
};
 