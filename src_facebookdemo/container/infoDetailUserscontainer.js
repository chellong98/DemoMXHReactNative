import React, { Component } from 'react';
import InfoUsersScreen from './../screens/infoDetailUsersscreen';
import Pakage from './../utils/pakage';
import UserService from './../services/UserServices';
export interface Props { 
  navigation: any,

}
export default class infoDetailUsersContainer extends Component<Props> {
  postBaiDang(idnguoidang, noidung) {
    var baiDang = Pakage.postBaiDang(idnguoidang, noidung);
    // console.log("bai Dang");
    // console.log(baiDang);
    this.services = new UserService();
    this.services.update((status)=>{
      console.log("response");
      console.log(status);  
    }, baiDang);

  }
  render() {
    return (
      <InfoUsersScreen navigation={this.props.navigation} postBaiDang={(idnguoidang, noidung)=>this.postBaiDang(idnguoidang, noidung)}/>
    )
  }
};
 