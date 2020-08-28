import React from "react";
import { useHistory } from 'react-router-dom';
import { makeStyles } from "@material-ui/core/styles";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import Grid from "@material-ui/core/Grid";
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Alert from '@material-ui/lab/Alert';

import CircularProgress from "@material-ui/core/CircularProgress";
import { green } from "@material-ui/core/colors";
import Button from "@material-ui/core/Button";
import CheckIcon from "@material-ui/icons/Check";
import IconButton from '@material-ui/core/IconButton';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import { Typography } from '@material-ui/core';
import { CopyToClipboard } from "react-copy-to-clipboard";

import services from "../services";
import { StoreContext } from '../utils/store';

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
    minHeight: "80vh",
    marginTop: "5vh"
  },
  content:{
    marginTop: "5vh",
    marginBottom: "5vh",
    textAlign: "center"
  },
  warning:{
    marginTop: "5vh",
    marginBottom: "5vh",
  },
  wrapper: {
    margin: theme.spacing(1),
    position: "relative",
  },
  buttonSuccess: {
    backgroundColor: green[500],
    "&:hover": {
      backgroundColor: green[700],
    },
  },
  fabProgress: {
    color: green[500],
    position: "absolute",
    top: -6,
    left: -6,
    zIndex: 1,
  },
  buttonProgress: {
    color: green[500],
    position: "absolute",
    top: "50%",
    left: "50%",
    marginTop: -12,
    marginLeft: -12,
  },
  label:{
    marginBottom: "5vh"
  },
  backButton: {
    marginRight: theme.spacing(1),
  },
  instructions: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
  walletText: {
    wordBreak: "break-all",
    width: "80%",
    textAlign: "justify",
    margin: "0 auto"
  }
}));

function getSteps() {
  return ['Submit', 'Save your private key', 'Login'];
}

export default function AddWallet() {
  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(0);
  const steps = getSteps();
  const [loading, setLoading] = React.useState(false);
  const [success, setSuccess] = React.useState(false);
  const [privateKey, setPrivateKey] = React.useState();
  const [walletAddress, setWalletAddress] = React.useState();
  const [copiedAddress, setCopiedAddress] = React.useState(false);
  const [copiedPrivate, setCopiedPrivate] = React.useState(false);
  const inputEl = React.useRef(null);
  const timer = React.useRef();
  const history = useHistory();

  React.useEffect(() => {
    return () => {
      clearTimeout(timer.current);
    };
  }, []);

  const handleButtonClick = () => {
    if (!loading && !success) {
      setSuccess(false);
      setLoading(true);
      timer.current = setTimeout(() => {
        onSubmit();
        setSuccess(true);
        setLoading(false);
      }, 1000);
    }      
  };

  const onSubmit = async () => {
    const res = await services.createWallet();
    if(res.data && res.data.privateKey){
      setPrivateKey(res.data.privateKey)
      setWalletAddress(res.data.address)
    }
  };

function getStepContent(stepIndex) {
  switch (stepIndex) {
    case 0:
      return (<Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justify="center"
      >
        <Grid item>
          <div className={classes.wrapper}>
            <Fab
              aria-label="save"
              color="primary"
              className={success ? classes.buttonSuccess : ""}
              onClick={handleButtonClick}
            >
              {success ? <CheckIcon /> : <AddIcon />}
            </Fab>
            {loading && (
              <CircularProgress size={68} className={classes.fabProgress} />
            )}
          </div>
        </Grid>
        <Grid item>
          <div className={classes.wrapper}>
            <Button
              variant="contained"
              color="primary"
              className={success ? classes.buttonSuccess : ""}
              disabled={loading}
              onClick={handleButtonClick}
            >
              Create wallet
            </Button>
            {loading && (
              <CircularProgress size={24} className={classes.buttonProgress} />
            )}
          </div>
        </Grid>
      </Grid>);
    case 1:
      return (<>
        <Typography variant="h5" component="h4"  className={classes.label}>
          Your wallet was created!
        </Typography>
        <Typography variant="h5" component="h4"  className={classes.label} className={classes.walletText}>
          <Typography component="p">Your address: 
              {copiedAddress ? <span style={{ color: "green" }}>Copied.</span> : null}
            <CopyToClipboard
              text={walletAddress}
              onCopy={() => setCopiedAddress(true)}
            >
              <Button size="small" color="primary" align="right">
                Copy
              </Button>
            </CopyToClipboard>
          </Typography>
           {walletAddress}
        </Typography>
        <Typography variant="h5" component="h4"  className={classes.label} className={classes.walletText}>
          <Typography component="p">Your private key:
              {copiedPrivate ? <span style={{ color: "green" }}>Copied.</span> : null}
            <CopyToClipboard
              text={privateKey}
              onCopy={() => setCopiedPrivate(true)}
            >
              <Button size="small" color="primary" align="right">
                Copy
              </Button>
            </CopyToClipboard>
          </Typography>
          {privateKey}
        </Typography>        

        <Alert severity="warning" className={classes.warning}>Don't Lose Private Key! It can not be recovered if you lose it.</Alert>
      </>);
    case 2:
      break;
    default:
      return 'Unknown stepIndex';
  }
}

  const handleNext = () => {
    switch(activeStep){
      case 0:
      if(!success){
        return;
      }
      break;
      case 1:
      break;
      case 2:
        history.push("/access");
      break;
    }
    setActiveStep((prevActiveStep) => prevActiveStep + 1);  
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  return (
    <div className={classes.root}>
      <Stepper activeStep={activeStep} alternativeLabel>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>

      <div className={classes.content}>
        {getStepContent(activeStep)}
      </div>

      <div>
        {activeStep === steps.length ? (
          <div>
            <Typography className={classes.instructions}>Your wallet was created</Typography>
            {/* <Button onClick={handleReset}>Reset</Button> */}
          </div>
        ) : (
          <div>
            <div>
              <Button
                disabled={activeStep === 0}
                onClick={handleBack}
                className={classes.backButton}
              >
                Back
              </Button>
              <Button variant="contained" color="primary" onClick={handleNext}>
                {activeStep === steps.length - 1 ? 'Login' : 'Next'}
              </Button>
            </div>
          </div>
        )}
      </div>
      
    </div>
  );
}
