// == Packages
import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";

// == Components
import Chat from './components/Chat';
import Join from './components/Join';

const App = () => {
  return (
    <div className="app">
      <Router>
        <Route path="/" exact component={Join} />
        <Route path="/chat" component={Chat} />
      </Router>
    </div>

  );
}

export default App;
