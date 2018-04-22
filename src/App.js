import React from 'react';
import {StackNavigator} from 'react-navigation';
import SplashScreenContainer from './containers/splashsreenContainer';
import TodosContainer from './containers/todoContainer';
import NewTodoContainer from './containers/NewTodoContainer';
import EditTodoContainer from './containers/EditTodoContainer';
import RealmContainer from './containers/RealmContainer';
const App = StackNavigator( 
  {
    SplashScreenContainer : {
      screen: SplashScreenContainer
    },
    TodosContainer: {
      screen: TodosContainer,
    },
    NewTodoContainer: {
      screen: NewTodoContainer
    },
    EditTodoContainer: {
      screen: EditTodoContainer
    },
    RealmContainer: {
      screen : RealmContainer
    }
  },
  {
    initialRouteName: "SplashScreenContainer",
    headerMode: "none",
  }
)

export default App;