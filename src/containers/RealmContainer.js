import React, { Component } from 'react';
import RealmScreen from './../screens/Realmscreen';
import TodosModel from './../model/TodosModel';
import Setting from './../utils/setting';
import Database from './../utils/databaseTodos';
var Datastore = require('react-native-local-mongodb')
db = new Datastore({ filename: 'asyncStorageKey', autoload: true });
dbPlanet = new Datastore({filename: 'todo.db', autoload: true});
dbTodos = new Datastore({filename: 'todosapp.db', autoload: true});
this.db1 = new Database('todo1');
var doc = { hello: 'world'
               , n: 5
               , today: new Date()
               , notthere: null
               , notToBeSaved: undefined  // Will not be saved
               , fruits: [ 'apple', 'orange', 'pear' ]
               , infos: { name: 'react-native-local-mongodb' }
               };
this.todosmodel = new TodosModel();

 var planets = [
   {_id: 'id1', planet: 'Mars', system: 'solar',inhabited: false, satellites: ['Phobos', 'Deimos']},
   {_id: 'id2', planet: 'Earth', system: 'solar', inhabited: true, humans: { genders: 2, eyes: true }},
   { _id: 'id3', planet: 'Jupiter', system: 'solar', inhabited: false },
   { _id: 'id4', planet: 'Omicron Persei 8', system: 'futurama', inhabited: true, humans: { genders: 7 } },
   { _id: 'id5', completeData: { planets: [ { name: 'Earth', number: 3 }, { name: 'Mars', number: 2 }, { name: 'Pluton', number: 9 } ] } }
 ];
var listtodo = Setting.ListTodo;

// dbTodos.insert(listtodo,(err, newDoc) =>{   // Callback is optional
//   // newDoc is the newly inserted document, including its _id
//   // newDoc has no key called notToBeSaved since its value was undefined
//   console.log('1 insert')
//   console.log(newDoc)
// });  
// dbPlanet.insert(planets, (err, docs)=>{
//   console.log(docs)
// })
// dbPlanet.update({planet: 'Mars'},{planet: 'Pluto'},{}, (err, numReplaced)=>{
//   console.log(numReplaced)
// })
// dbPlanet.find({},(err, docs)=>{
//   console.log(docs)
// });

// dbPlanet.find({},(err, docs)=>{
//   console.log(docs)
// });

// dbTodos.remove({}, { multi: true }, function (err, numRemoved) {
// })

export default class reamlContainer extends Component {
  componentWillMount() {
    // this.db1 = new Database('todo1');
    
    this.todosmodel = new TodosModel();
    // this.todosmodel.insertTodos(listtodo);
    this.todosmodel.removeTodos();
    // this.todosmodel.insertTodos();
    this.todosmodel.findTodos({}, (err, doc)=>{
      console.log(doc);
    });
  }
  componentDidMount(){
    // this.todosmodel.insertTodos();
    this.todosmodel = new TodosModel();
    // this.todosmodel.findTodos();
    // this.todosmodel.insertTodos({name: 'over night',
    // time: '11/1',
    // status: 1,})
    // this.todosmodel.findTodos({});
  }
  insertDbPlanet() {
    dbPlanet.insert({_id: 'id6', planet: 'Mecury', system: 'solar', inhabited: true, humans: { genders: 3, eyes: false }}, (err, docs)=>{
      console.log(docs);
    })
  }

  insertTodo() {
    
  }

  render() {
    return (
      <RealmScreen/>
    )
  }
};
