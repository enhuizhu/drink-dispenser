import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import store from './store/store';

import './App.css';

const Home = () => {
  return <div>
    home
  </div>;
}

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
    </Provider>
  );
}

export default App;
