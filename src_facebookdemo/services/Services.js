import Http from './../utils/http';

export default class Services {
    constructor() {
       
        this.header = {
            'Accept': 'application/json',
            'Content-Type': 'multipart/form-data'
            
        };
        this.http = new Http();
    }
}