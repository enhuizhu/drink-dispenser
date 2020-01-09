import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route } from "react-router-dom";
import store from './store/store';
import Home from './pages/home/Home';
import Maintain from './pages/maintain/Maintain';
import Notification from './components/notification/Notification';
import { Menus } from './components/menus/Menus';
import './App.css';

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <Router>
        <Menus></Menus>
        <Route path="/" component={Home} exact></Route>
        <Route path="/maintain" component={Maintain}></Route>
      </Router>
      <Notification></Notification>
    </Provider>
  );
}

export default App;
