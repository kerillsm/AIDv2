import React, { Component } from 'react';
import axios from 'axios';
import { TextField, Button } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';

const styles = theme => ({
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
  },
  messageField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: '455px',
  },
});

class ContactUs extends Component {
  constructor() {
    super();
    this.state = {
      name: '',
      email: '',
      message: '',
      errors: {},
      open: false,
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  handleSubmit(e) {
    e.preventDefault();

    var error = {};

    if (this.state.name.length < 1) {
			error.name = true;
    }
    if (this.state.email.length < 1) {
			error.email = true;
    }
    if (this.state.message.length < 1) {
			error.message = true;
    }

		this.setState({errors: error});

    if (!error.name && !error.email && !error.message) {
      const newMessage = {
        name: this.state.name,
        email: this.state.email,
        message: this.state.message
      }
    
      axios.post('/api/contactus', newMessage)
        .then(res => this.setState({ open: true }))
        .catch(err => console.log(err));
    }
  }

  handleClose = () => {
    this.setState({ open: false });
  };

  render() {
    const { classes } = this.props;

    const { name, email, message } = this.state.errors;

    return (
      <div>
        <Dialog
          open={this.state.open}
          keepMounted
          onClose={this.handleClose}
          aria-labelledby="alert-dialog-slide-title"
          aria-describedby="alert-dialog-slide-description"
        >
          <DialogContent>
            <DialogContentText id="alert-dialog-slide-description">
              Success
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              You message was successfuly sent
            </Button>
          </DialogActions>
        </Dialog>

        <form onSubmit={this.handleSubmit}>
          <TextField
            className={classes.textField}
            id="outlined-name"
            label="Name"
            name="name"
            value={this.state.name}
            onChange={this.handleChange}
            margin="normal"
            variant="outlined"
            error={name && 'true'}
          />
          <TextField
            id="outlined-email-input"
            label="Email"
            type="email"
            name="email"
            onChange={this.handleChange}
            value={this.state.email}
            autoComplete="email"
            margin="normal"
            variant="outlined"
            error={email && 'true'}
          /><br />
          <TextField
            label="Your message"
            rows="5"
            placeholder="Placeholder"
            onChange={this.handleChange}
            value={this.state.message}
            className={classes.messageField} 
            name="message"
            multiline
            margin="normal"
            variant="outlined"
            error={message && 'true'}
          /><br />
          <Button className={classes.textField} type="submit" variant="contained" color="primary">Send message</Button>
        </form>
      </div>
    );
  }
}


export default withStyles(styles)(ContactUs);