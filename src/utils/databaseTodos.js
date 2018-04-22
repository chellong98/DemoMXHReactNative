var MongoDB = require('react-native-local-mongodb');
let instance = null;
export default class database {
    constructor(DB_NAME) {
        if(!instance) { 
            console.log('create new database');
            this.db = this.open(DB_NAME);
            instance = this;
        }
        return instance;
    }

    open(DB_NAME) {
        return new MongoDB({filename: DB_NAME, autoload: true});
    }

    insertDB(newDoc, callback) {
        this.db.insert(newDoc, callback);
    }
    
    findDB(doc, callback) {
        this.db.find(doc, callback);
    }
    removeDB(doc,option, callback) {
        this.db.remove(doc, option, callback);
    }
    updateDB(oldDoc, newDoc, option, callback) {
        this.db.update(oldDoc,newDoc, option, callback);
    }
}

