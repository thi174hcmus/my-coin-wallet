import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import Layout from "./components/Layout";
import "./App.css";

function App() {
  return (
    <Router>
      <Layout className="App" />
    </Router>
  );
}

export default App;
