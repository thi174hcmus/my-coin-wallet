import React, { useContext } from "react";
import { makeStyles, withStyles, fade } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import Checkbox from "@material-ui/core/Checkbox";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import TextField from '@material-ui/core/TextField';
import ArrowRightAltIcon from "@material-ui/icons/ArrowRightAlt";
import Button from "@material-ui/core/Button";

import services from "../services";
import { StoreContext } from '../utils/store';

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: '3vh',
    display: 'flex',
    flexWrap: 'wrap',
    flexDirection: 'column'
  },
  margin: {
    margin: theme.spacing(2),
  },
  label: {
    marginTop: '2vh',
    textAlign: 'center'
  }
}));

export default function AccessWallet() {
  const classes = useStyles();
  const prvEl = React.useRef(null);
  const store = useContext(StoreContext);

  const handleClickLogin = async (event) => {
    let prv;
    if(prvEl.current)
      prv = prvEl.current.value;
    if(prv){
      const res = await services.accessWallet(prv);
      if(res.data && res.data.status === true && res.data.wallet){
        store.setLoggedIn(true);
        store.setWalletAddress(res.data.wallet.address)
        store.setBalance(res.data.wallet.balance)
        store.setPrivateKey(prv)
      }
    }
  };

  return (
    <div className={classes.root}>
      <Typography variant="h5" component="h4"  className={classes.label}>
        Access your wallet
      </Typography>
      <form className={classes.root} noValidate>
        <TextField
          className={classes.margin}
          label="Your private key"
          required
          variant="outlined"
          defaultValue=""
          inputRef={prvEl}
          id="validation-outlined-input"
        />

        <Button
          className={classes.margin} variant="contained" color="primary" 
                onClick={handleClickLogin}>
          Sign up
        </Button>
      </form>
    </div>
  );
}
