import React from "react";
import { Link } from "react-router-dom";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";

import { StoreContext } from '../utils/store';
import services from "../services";

const useStyles = makeStyles((theme) => ({
  root: {
    // maxWidth: 345,
  },
  btnActions: {
    float: "right",
  },
  item: {
    padding: theme.spacing(2),
  },
  itemArea: {
    height: 120,
  },
  walletAddress: {
    overflow: "hidden",
    textOverflow: "ellipsis"
  }
}));
export default function Dashboard() {
  const classes = useStyles();
  const [copied, setCopied] = React.useState(false);
  const store = React.useContext(StoreContext);

  React.useEffect(() => {
    const interval = setInterval(async () => {
      const res = await services.getBalance(store.walletAddress);
      if(res.data && res.data.status === true && res.data.balance){
        store.setBalance(res.data.balance);
      }
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className={classes.root}>
      <Grid
        container
        spacing={0}
        direction="row"
        alignItems="flex-start"
        justify="center"
        style={{
          minHeight: "80vh",
          marginTop: "10vh",
        }}
      >
        <Grid item xs="12" md="3" className={classes.item}>
          <Card>
            <CardActionArea className={classes.itemArea}>
              <CardContent>
                <Typography gutterBottom variant="h5" component="h2">
                  Address
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p" className={classes.walletAddress}>
                  {store.walletAddress || 'Unknow'}
                </Typography>
              </CardContent>
            </CardActionArea>
            <CardActions className={classes.btnActions}>
              {copied ? <span style={{ color: "green" }}>Copied.</span> : null}
              <CopyToClipboard
                text={store.walletAddress}
                onCopy={() => setCopied(true)}
              >
                <Button size="small" color="primary" align="right">
                  Copy
                </Button>
              </CopyToClipboard>
            </CardActions>
          </Card>
        </Grid>
        <Grid item xs="12" md="3" className={classes.item}>
          <Card>
            <CardActionArea className={classes.itemArea}>
              <CardContent>
                <Typography gutterBottom variant="h5" component="h2">
                  Balance
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                  {store.balance} MC
                </Typography>
              </CardContent>
            </CardActionArea>
            <CardActions className={classes.btnActions}>
              <Link to="/send">
                <Button size="small" color="primary" align="right">
                  Send MC
                </Button>
              </Link>
            </CardActions>
          </Card>
        </Grid>
        <Grid item xs="12" md="3" className={classes.item}>
          <Card>
            <CardActionArea className={classes.itemArea}>
              <CardContent>
                <Typography gutterBottom variant="h5" component="h2">
                  Transactions
                </Typography>
                {/* <Typography variant="body2" color="textSecondary" component="p">
                  10 MC
                </Typography> */}
              </CardContent>
            </CardActionArea>
            <CardActions className={classes.btnActions}>
              <Link to={'/wallet/' + store.walletAddress}>
                <Button size="small" color="primary" align="right">
                  More...
                </Button>
              </Link>
            </CardActions>
          </Card>
        </Grid>
      </Grid>
    </div>
  );
}
