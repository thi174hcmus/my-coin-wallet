import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import StoreProvider from './utils/store';
import Layout from "./components/Layout";
import "./App.css";

function App() {
  return (
    <StoreProvider>
      <Router>
        <Layout className="App" />
      </Router>
    </StoreProvider>
  );
}

export default App;
