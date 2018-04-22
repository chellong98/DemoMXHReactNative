import Http from './../utils/http';

export default class Services {
    constructor() {
       
        this.header = {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            
        };
        this.http = new Http();
    }
}