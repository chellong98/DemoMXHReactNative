import Model from './Model';
import Setting from './../utils/setting';
var planets = [
    {_id: 'id1', planet: 'Mars', system: 'solar',inhabited: false, satellites: ['Phobos', 'Deimos']},
    {_id: 'id2', planet: 'Earth', system: 'solar', inhabited: true, humans: { genders: 2, eyes: true }},
    { _id: 'id3', planet: 'Jupiter', system: 'solar', inhabited: false },
    { _id: 'id4', planet: 'Omicron Persei 8', system: 'futurama', inhabited: true, humans: { genders: 7 } },
    { _id: 'id5', completeData: { planets: [ { name: 'Earth', number: 3 }, { name: 'Mars', number: 2 }, { name: 'Pluton', number: 9 } ] } }
  ];
  var listTodo = Setting.ListTodo;
export default class TodosModel extends Model {
    constructor() {
        super('listTodo.db');
    }

    insertTodos(item,callback) {
        this.db.insertDB(item, callback)
    }

    findTodos(item,callback) {
        this.db.findDB(item, callback)
    }
    updateTodos(oldDoc, newDoc, option, callback) {
        this.db.updateDB(oldDoc, newDoc, option, callback)
    }
    removeTodos(docs, option, callback) {
        this.db.removeDB(docs, option, callback)
    }
}