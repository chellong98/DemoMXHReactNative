import Services from './Services';
import Setting from './../utils/setting';
var header = {
  
    'Content-Type': 'multipart/form-data'
    
};
export default class userservice extends Services {
    constructor(props) {
        super(props);

        // abc = newuserservice();
        // abc.update(()=>{},)     
        
    }

    update(callback, check) { 
        console.log(check.data);
        this.http.post(Setting.SERVER_API+check.url, check.data, header) //truyen data ve server
        .then(response =>{
             
            return response.text()}) //tra ve json
        .then(responseJson=>{
            console.log('responseJson')
            console.log(responseJson)
           // return;
          //  callback(responseJson)}) 
          callback(JSON.parse(responseJson))}) 
    }       
}    