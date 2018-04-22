import Database from './../utils/databaseTodos';

export default class Model {
    constructor(DB_NAME) {
        this.db = new Database(DB_NAME);
        
    }
}