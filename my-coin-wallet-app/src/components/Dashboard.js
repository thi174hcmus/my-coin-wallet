import React from "react";
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
}));
export default function Dashboard() {
  const classes = useStyles();
  const [copied, setCopied] = React.useState(false);

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
                <Typography variant="body2" color="textSecondary" component="p">
                  Lizards are a widespread group of squamate reptiles, with over
                  6,000 species, ranging across all continents except Antarctica
                </Typography>
              </CardContent>
            </CardActionArea>
            <CardActions className={classes.btnActions}>
              {copied ? <span style={{ color: "green" }}>Copied.</span> : null}
              <CopyToClipboard
                text={"coppy text day ne"}
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
                  10 MC
                </Typography>
              </CardContent>
            </CardActionArea>
            <CardActions className={classes.btnActions}>
              <Button href="/send" size="small" color="primary" align="right">
                Send MC
              </Button>
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
                <Typography variant="body2" color="textSecondary" component="p">
                  10 MC
                </Typography>
              </CardContent>
            </CardActionArea>
            <CardActions className={classes.btnActions}>
              <Button href="/transactions" size="small" color="primary" align="right">
                More...
              </Button>
            </CardActions>
          </Card>
        </Grid>
      </Grid>
    </div>
  );
}
