import React, { Fragment } from "react";
import { NavLink, useHistory } from "react-router-dom";
import { fade, makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import AccountCircle from "@material-ui/icons/AccountCircle";
import Switch from "@material-ui/core/Switch";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormGroup from "@material-ui/core/FormGroup";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import Link from "@material-ui/core/Link";
import InputBase from '@material-ui/core/InputBase';

import services from "../services";
import { StoreContext } from '../utils/store';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  nav: {
    flexGrow: 1,
  },
  title: {
    color: "#fff"
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: 'auto',
    },
  },
  inputRoot: {
    color: '#fff',
  },
  inputInput: {
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '40ch',
    },
    color: "#fff"
  },
}));

export default function Header() {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const store = React.useContext(StoreContext);
  const history = useHistory();
  
  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const logOutOnClick = () => {
    store.setLoggedIn(false)
    store.setWalletAddress()
    history.push('/')
  };
  const keyPressedMining = async (event) => {
    if (event.key === "Enter") {
      const address = event.target.value;
      event.target.value = "";
      if(!address) return;
      const res = await services.mining(address)
      if(res && res.data && res.data.status == true)
      {
        alert(`A new block was mined.\nReward has been sent to ${address}`)
      }
      else alert("Error")
    }
  }

  return (
    <>
      <AppBar position="sticky" className={classes.root}>
        <Toolbar>
          <Typography variant="h6" className={classes.nav}>
            <Link color="inherit">
              <NavLink to="/" className={classes.title}>
                MCW
              </NavLink>
            </Link>
          </Typography>
                <Typography variant="p" component="h4"  className={classes.label}>
                  Auto Mining Robot (Work when there are transactions) =>>
                </Typography>
              <div className={classes.search}>
                <InputBase
                  placeholder="Type your wallet and Enter to get free MC"
                  classes={{
                    root: classes.inputRoot,
                    input: classes.inputInput,
                  }}
                  inputProps={{ 'aria-label': 'search' }}
                  onKeyPress={keyPressedMining}
                />
              </div>
            {store.loggedIn ? (

            <div>  
              <IconButton
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={open}
                onClose={handleClose}
              >
                  <MenuItem onClick={handleClose}>
                    <NavLink
                      to="/"
                    >
                      My wallet
                    </NavLink>
                  </MenuItem>
                  <MenuItem onClick={logOutOnClick}>Logout</MenuItem>
              </Menu>
            </div>
               ) : (
                <Fragment>
                  <MenuItem onClick={handleClose}>
                    <NavLink
                      to="/access" className={classes.title}
                    >
                      Sign In
                    </NavLink>
                  </MenuItem>
                  <MenuItem onClick={handleClose}>
                    <NavLink
                      to="/new" className={classes.title}
                    >
                      Sign Up
                    </NavLink>
                  </MenuItem>
                </Fragment>
                )}
        </Toolbar>
      </AppBar>
    </>
  );
}
