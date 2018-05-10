import React, { Component } from 'react'
import { AsyncStorage, Text, View, TextInput, StyleSheet } from 'react-native'
var imagePicker = require('react-native-image-picker');
var options = {
    title: 'Select image',
    storageOptions : {
      skipBackup: true,
      path: 'image',
    }
  }
config = {
    login(username, password)    //lay ra user pass va url API
    {
        var form = new FormData(); //tao form trong
        form.append("json",JSON.stringify({username: username, password: password})); //them json vào form
        return {url:'index.php/First_controller/accountController',data:form} //return 
    },
       // buttonDrawNav: [
    //     {name: 'giấy nháp'},
    //     {name: 'chel long'},
    //     {name: 'lê hiếu'},
    //     {name: 'linh vũ'},
    // ]
    getRamdomString() {
        var str = '';
        for(i=0; i<10; i++) {
            str += String.fromCharCode(Math.floor((Math.random() * 26) + 97)) //random 97 - 122
        }
        return str;
    },
    postBaiDang(idNguoiDang, noidung, imageUri) { //day ha um
        // console.log( "url file: "+imageUri);
        var form = new FormData(); //tao form trong
        form.append("idnguoidang",idNguoiDang); //them json vào form
        form.append("noidung",noidung);
        if ( imageUri != null && imageUri.length >0) //image ko co se = null @@
            form.append("image", { 
                uri: imageUri , 
                type: 'image/jpeg',
                name: imageUri!=='' ? this.getRamdomString() : ''} );
                // console.log('imageUri' + imageUri )
            // form.append('image', duong dng,kieu fike )
        return {url: 'index.php/First_controller/postBaiDangController', data: form}
    },
    layToanBoBaiDang(id) {
        var form = new FormData();   
        form.append('idUser', id); 
        return {url: 'index.php/First_controller/layToanBoBaiDangController',data: form}
    },

    getSizeImage(widthLayout, width, height) {
        // return 1.0*width/height;
        return {'width' : widthLayout, 'height' : widthLayout*(1.0*height/width)}
    },

    loadComment(idBaiDang, idNguoiDang) {
        var form = new FormData();
        form.append('idBaiDang', idBaiDang);
        form.append('idNguoiDang', idNguoiDang)

        return {url: 'index.php/First_controller/loadCommentController', 'data':form}
    },

    postComment(idAccount, idPost,  ndComment) {
        var form = new FormData();
        form.append('idAccount', idAccount);
        form.append('ndComment', ndComment);
        form.append('idPost', idPost);

        return {url: 'index.php/First_controller/postCommentController', data: form};
    },

    postLike(idBaiDang, idAccount) {
        var form = new FormData();
        form.append('idBaiDang', idBaiDang)
        form.append('idAccount', idAccount)

        return {url: 'index.php/First_controller/postLikeController', data: form}
    },

    upLoadImage(callback) {
         imagePicker.showImagePicker(options, (response)=>{
          console.log("response image picker")
          console.log(response);
    
          if (response.didCancel) {
            console.log('User cancelled image picker');
          }
          else if (response.error) {
            console.log('ImagePicker Error: ', response.error);
          }
          else if (response.customButton) {
            console.log('User tapped custom button: ', response.customButton);
          } else {
           
            // console.log("source: ")
            // console.log(source);
            callback(response.uri);
            
          }
        })
    },

    async save(key, str) {    
        try {
            await AsyncStorage.setItem('@ChelLong:'+key, str);
            // console.log("key + str: ")
            // console.log(key + " " + str)
        } catch (error) {
            console.log("error save: ");
            console.log(error);
        }
        // $_POST["idnguoidung"]
    },
    async saveLogin(db) {
        await this.save("Login", JSON.stringify(db))
    },
    async get (key) {
        console.log("Get: "  + key);

        try {
            var value = await AsyncStorage.getItem("@ChelLong:"+key).then((value)=>{return value});

            return value;    
        } catch (error) {
            console.log('error: ' + error);
            return null;
        }
    },
    async getLogin() {
        var login = await this.get("Login").then((value)=>{return value});
      
        if(login == null) {
            return null;
        }
        try {
            
            return JSON.parse(login);
        } catch (error) { 
            return null;
        }   
    }

}                                                             
export default config;