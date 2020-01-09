import React from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import green from '@material-ui/core/colors/green';
import amber from '@material-ui/core/colors/amber';
import { 
  NOTIFICATION
} from '../../constants/notification.constant';

import NotificationService from '../../services/NotificationService';

const ws = withStyles((theme) => ({
  success: {
    backgroundColor: green[600],
  },
  error: {
    backgroundColor: theme.palette.error.dark,
  },
  info: {
    backgroundColor: theme.palette.primary.dark,
  },
  warning: {
    backgroundColor: amber[700],
  },
  icon: {
    fontSize: 20,
  },

  container: {
    padding: "10px",
    borderRadius: '4px',
    color: 'white',
    marginRight: '10px',
    marginTop: '10px;'
  }
}));


class Notification extends React.Component<any, any> {
  static defaultProps = {
    classes: {}
  };

  constructor(props: any) {
    super(props);

    this.state = {
      vertical: 'top',
      horizontal: 'right',
      open: false,
      msg: 'this is default props',
      msgType: 'success' as 'success'
    };

    this.setupListener();
  }

  setupListener() {
    NotificationService.sub(NOTIFICATION, (payload: any) => {
      console.log('get notification', payload);
      this.setState({
        open: true,
        msg: payload.msg,
        msgType: payload.msgType
      })
    });
  }

  handleClose = () => {
    this.setState({
      open: false,
    }); 
  }
  
  render() {
    const {open, vertical, horizontal, msg, msgType} = this.state;
    const { classes } = this.props;
    
    return <div>
      <Snackbar
        anchorOrigin={{ vertical, horizontal }}
        open={open}
        onClose={this.handleClose}
        >
        <div className={classes.container + ' ' + classes[msgType]}>
          {msg}
        </div>
      </Snackbar>
    </div>;
  }
}

export default ws(Notification);