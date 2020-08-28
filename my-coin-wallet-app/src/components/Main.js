import React, { useContext } from "react";
import { BrowserRouter as Router, Switch, Route, Link, Redirect } from "react-router-dom";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import Home from "./Home";
import Dashboard from "./Dashboard";
import AddWallets from "./AddWallets";
import AccessWallets from "./AccessWallets";
import SendCoins from "./SendCoins";
import Transactions from "./Transactions";
import { StoreContext } from '../utils/store';

export default function Main() {
  const store = useContext(StoreContext);

  return (
    <div>
      <CssBaseline />
      <Container fixed>
        <Switch>
          <Route path="/new">
          {store.loggedIn ? <Redirect to="/" /> : <AddWallets />}
          </Route>
          <Route path="/access">
          {store.loggedIn ? <Redirect to="/" /> : <AccessWallets />}
          </Route>
          <Route path="/send">
          {store.loggedIn ? <SendCoins /> : <Redirect to="/" />}
          </Route>
          <Route path="/wallet/:address">
          {store.loggedIn ? <Transactions /> : <Redirect to="/" />}
          </Route>
          <Route path="/">
          {store.loggedIn ? <Dashboard /> : <Home />
          }</Route>
        </Switch>
      </Container>
    </div>
  );
}
