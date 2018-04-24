import Services from './Services';
import Setting from './../utils/setting';

export default class userservice extends Services {
    constructor(props) {
        super(props);

        // abc = newuserservice();
        // abc.update(()=>{},)     
        
    }

    update(callback, check) { 
        console.log(check.data);
        this.http.post(Setting.SERVER_NAME+check.url, check.data) //truyen data ve server
        .then(response =>{
            // console.log(response)
            return response.json()}) //tra ve json
        .then(responseJson=>callback(responseJson)) 
    }       
}    