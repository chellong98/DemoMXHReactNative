import React, { Component } from 'react'
import { AsyncStorage, Text, View, TextInput, StyleSheet } from 'react-native'

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
    postBaiDang(idNguoiDang, noidung) {
        var form = new FormData(); //tao form trong
        form.append("idnguoidung",idNguoiDang); //them json vào form
        form.append("noidung",noidung);
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