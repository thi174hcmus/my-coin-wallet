import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import Grid from "@material-ui/core/Grid";
import NavigationIcon from "@material-ui/icons/Navigation";

const useStyles = makeStyles((theme) => ({
  root: {
    "& *": {
      margin: theme.spacing(1),
    },
  },
  extendedIcon: {
    marginRight: theme.spacing(1),
  },
}));
export default function Home() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Grid
        container
        spacing={0}
        direction="row"
        alignItems="center"
        justify="center"
        style={{ minHeight: "80vh" }}
      >
        <Grid item>
          <Fab color="primary" variant="extended" href="/new">
            <AddIcon className={classes.extendedIcon} />
            Get a new wallet
          </Fab>
          <Fab color="secondary" variant="extended" href="/access">
            <NavigationIcon className={classes.extendedIcon} />
            Access existing wallet
          </Fab>
        </Grid>
      </Grid>
    </div>
  );
}
