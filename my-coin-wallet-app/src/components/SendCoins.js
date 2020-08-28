import React from "react";
import { useHistory } from 'react-router-dom';
import { makeStyles } from "@material-ui/core/styles";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import InputAdornment from "@material-ui/core/InputAdornment";
import FormControl from "@material-ui/core/FormControl";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import AccountCircle from "@material-ui/icons/AccountCircle";

import IconButton from "@material-ui/core/IconButton";
import FilledInput from "@material-ui/core/FilledInput";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import FormHelperText from "@material-ui/core/FormHelperText";
import Visibility from "@material-ui/icons/Visibility";
import Typography from "@material-ui/core/Typography";
import Button from '@material-ui/core/Button';

import services from "../services";
import { StoreContext } from '../utils/store';

const useStyles = makeStyles((theme) => ({
  margin: {
    margin: theme.spacing(1),
  },
}));

export default function SendCoin() {
  const classes = useStyles();
  const [toAddress, setToAddress] = React.useState();
  const [amount, setAmount] = React.useState();
  const store = React.useContext(StoreContext);
  const history = useHistory();

  const onSubmit = async () => {
    if(!toAddress)
      return; 
    if(!store.privateKey)
      return; 
    if(!amount)
      return; 
    if(amount < 0 || amount > store.balance){
      alert('Invalid amount.')
    }
    const res = await services.send(store.privateKey, toAddress, amount)
    if(res.data.status === true){
      history.push(`/wallet/${store.walletAddress}`)
    } else if(res.data.msg){
      alert(res.data.msg)
    }
  }
  const onChangeAddress = (event) =>{
    setToAddress(event.target.value)
  }
  const onChangeAmount = (event) =>{
    setAmount(event.target.value)
  }
  return (
    <div>
      <div className={classes.margin}>
        <Typography variant="h3" component="h4">
          Send transaction
        </Typography>
        <Grid
          container
          spacing={1}
          direction="column"
          alignItems="center"
          style={{
            minHeight: "80vh",
            marginTop: "10vh",
          }}
        >
          <FormControl fullWidth className={classes.margin} variant="outlined">
            <InputLabel htmlFor="outlined-adornment-password">
              To address
            </InputLabel>
            <OutlinedInput
              id="outlined-adornment-password"
              type="text"
              onChange={onChangeAddress}
              value={toAddress}
              // onChange={handleChange("password")}
              endAdornment={
                <InputAdornment position="start">
                  <IconButton
                    aria-label="toggle password visibility"
                    // onClick={handleClickShowPassword}
                    // onMouseDown={handleMouseDownPassword}
                    edge="start"
                  >
                    <AccountCircle />
                  </IconButton>
                </InputAdornment>
              }
              labelWidth={70}
            />
          </FormControl>
          <FormControl fullWidth className={classes.margin} variant="outlined">
            <InputLabel htmlFor="outlined-adornment-password">
              Amount
            </InputLabel>
            <OutlinedInput
              id="outlined-adornment-password"
              type="text"
              onChange={onChangeAmount}
              value={amount}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    // onClick={handleClickShowPassword}
                    // onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    MC
                  </IconButton>
                </InputAdornment>
              }
              labelWidth={70}
            />
          </FormControl>
        <Button variant="contained" size="large" color="primary" className={classes.margin}
        onClick={onSubmit}>
          Send
        </Button>
        </Grid>
      </div>
    </div>
  );
}
