import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import thunkMiddleware from "redux-thunk";
import { combineReducers, createStore, applyMiddleware } from "redux";

import {
  VoxeetProvider,
  reducer as voxeetReducer,
} from "./VoxeetReactComponents";
import Main from "./components/main/Main";

import "../styles/main.less";
import ConfTypeChooser from "./components/appcreator/ConfTypeChooser";

import * as themes from '../theme/schema.json';
import { setToLS } from '../utils/storage';

const ASSET_PATH = process.env.ASSET_PATH || "/";

const reducers = combineReducers({
  voxeet: voxeetReducer,
});

const configureStore = () => createStore(reducers, applyMiddleware(thunkMiddleware));

window.addEventListener("storage", function (e) {
  console.log('Conference ID', sessionStorage.getItem("conferenceId"));
});

console.group('Dolby.io Conference Application');
console.log('GitHub repository: https://github.com/dolbyio-samples/comms-conference-app');
console.groupEnd();

const Index = () => {
  setToLS('all-themes', themes.default);
  return(
    <App />
  )
}


const App =()=>{
return(
  <VoxeetProvider store={configureStore()}>
    <Router basename={ASSET_PATH}>
    <Switch>
          <Route path="/main">
            <Main />
          </Route>
          <Route path="/">
            <ConfTypeChooser />
          </Route>
        </Switch>
    </Router>
  </VoxeetProvider>
);
}

ReactDOM.render(
  <Index />,
  document.getElementById("app")
);