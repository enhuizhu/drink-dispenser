import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route } from "react-router-dom";
import store from './store/store';
import Home from './pages/home/Home';
import Notification from './components/notification/Notification';
import './App.css';

const Maintain = () => {
  return <div>Maintain Page</div>;
}

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <Router>
        <Route path="/" component={Home} exact></Route>
        <Route path="/maintain" component={Maintain}></Route>
      </Router>
      <Notification></Notification>
    </Provider>
  );
}

export default App;
