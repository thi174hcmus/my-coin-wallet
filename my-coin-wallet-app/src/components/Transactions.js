import React from "react";
import PropTypes from "prop-types";
import {
  useParams, Link
} from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Collapse from "@material-ui/core/Collapse";
import IconButton from "@material-ui/core/IconButton";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";

import { StoreContext } from '../utils/store';
import services from "../services";

const useRowStyles = makeStyles({
  row: {
    "& > *": {
      borderBottom: "unset",
    },
  },
});
const useStyles = makeStyles({
  root: {
    margin: 50,
  },
});

function Row(props) {
  const { row, status } = props;
  const [open, setOpen] = React.useState(false);
  const classes = useRowStyles();
  const store = React.useContext(StoreContext);

  return (
    <React.Fragment>
      <TableRow className={classes.row}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {row.txHash}
        </TableCell>
        <TableCell align="center">{status}</TableCell>
        <TableCell align="right">{new Date(row.timestamp).toString('MM/dd/yy HH:mm:ss')}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box margin={1}>
              <Typography variant="h6" gutterBottom component="div">
                Detail
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableBody>
                    <TableRow key={row.fromAddress}>
                      <TableCell component="th" scope="row">
                       From: <Link to={'/wallet/' + row.fromAddress}>{row.fromAddress}</Link>
                       {(store.walletAddress === row.fromAddress) && '(You)'}
                      </TableCell>
                    </TableRow>
                    <TableRow key={row.fromAddress}>
                      <TableCell > To: <Link to={'/wallet/' + row.toAddress}>{row.toAddress}</Link>
                      {(store.walletAddress === row.toAddress) && '(You)'}</TableCell>
                    </TableRow>
                    <TableRow key={row.fromAddress}>
                      <TableCell>Amount: {row.amount} MC</TableCell>
                    </TableRow>
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

export default function Transactions() {
  const classes = useStyles();
  const store = React.useContext(StoreContext);
  const [transactions, setTransactions] = React.useState([]);
  const [pendingTransactions, setPendingTransactions] = React.useState([]);
  let { address } = useParams();
  console.log('address', address)
  React.useEffect(() => {
    const interval = setInterval(async () => {
      const res = await services.getPendingTransactions(store.walletAddress);
      if(res && res.data && res.data.transactions)
        setPendingTransactions(res.data.transactions)

      const res2 = await services.getTransactions(store.walletAddress);
      if(res2 && res2.data && res2.data.transactions)
        setTransactions(res2.data.transactions)
    }, 1000);
    return () => clearInterval(interval);
  }, []);


  return (
    <div
      style={{
        minHeight: "80vh",
        marginTop: "5vh",
      }}
    >
      <h2>Recent Pending transactions</h2>
      <TableContainer component={Paper}>
        <Table aria-label="caption table">
          {pendingTransactions.length === 0 && (
            <caption>No pending transactions.</caption>
          )}
          <TableHead>
            <TableRow>
              <TableCell />
              <TableCell>TxHash</TableCell>
              <TableCell align="right">Status</TableCell>
              <TableCell align="right">Time&nbsp;</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {pendingTransactions.map((tx) => (
              <Row key={pendingTransactions} row={tx}  status="Pending"/>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <h2>Recent Successful transactions</h2>
      <TableContainer component={Paper}>
        <Table aria-label="caption table">
          {transactions.length === 0 && (
            <caption>No successful transactions.</caption>
          )}
          <TableHead>
            <TableRow>
              <TableCell />
              <TableCell>TxHash</TableCell>
              <TableCell align="right">Status</TableCell>
              <TableCell align="right">Time&nbsp;</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {transactions.map((tx) => (
              <Row key={transactions.txHash} row={tx} status="Success"/>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
