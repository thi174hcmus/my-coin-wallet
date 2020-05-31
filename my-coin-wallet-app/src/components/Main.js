import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import Home from "./Home";
import Dashboard from "./Dashboard";
import AddWallets from "./AddWallets";
import AccessWallets from "./AccessWallets";
import SendCoins from "./SendCoins";
import Transactions from "./Transactions";

export default function Main() {
  const isAuthenticated = true;
  return (
    <div>
      <CssBaseline />
      <Container fixed>
        {/* A <Switch> looks through its children <Route>s and
              renders the first one that matches the current URL. */}
        <Switch>
          <Route path="/new">
            <AddWallets />
          </Route>
          <Route path="/access">
            <AccessWallets />
          </Route>
          <Route path="/send">
            <SendCoins />
          </Route>
          <Route path="/transactions">
            <Transactions />
          </Route>
          <Route path="/">{isAuthenticated ? <Dashboard /> : <Home />}</Route>
        </Switch>
      </Container>
    </div>
  );
}
