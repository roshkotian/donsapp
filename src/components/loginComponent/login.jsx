import React, { Component } from "react";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import AppBar from "material-ui/AppBar";
import TextField from "material-ui/TextField";
import RaisedButton from "material-ui/RaisedButton";
import Avatar from "@material-ui/core/Avatar";
import Grid from "@material-ui/core/Grid";
import logo from "../../pudueLogo.jpg";
import { red } from "@material-ui/core/colors";

//const Regex = require("regex");
//const passwordRegex = Regex(/^[a-zA-Z0-9.#$%&/*-+]*$/);

const formValid = formErrors => {
  let valid = true;
  console.log(formErrors);
  Object.values(formErrors).forEach(val => {
    val.length > 0 && (valid = false);
  });
  return valid;
};
export class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: null,
      password: null,
      formErrors: {
        username: "",
        password: ""
      }
    };
  }

  handleSubmit = e => {
    e.preventDefault();

    if (formValid(this.state.formErrors)) {
      console.log(`---Entered information---
      Userneme: ${this.state.username}
      Password: ${this.state.password}`);
    } else {
      console.error("Form invalid");
    }
  };

  handleChange = e => {
    e.preventDefault();

    const { name, value } = e.target;
    let formErrors = this.state.formErrors;

    console.log("Name:", name);
    console.log("Value:", value);

    switch (name) {
      case "username":
        formErrors.username =
          value.length < 6 && value.length > 0
            ? "Username has to be 6 characters"
            : "";
        break;
      case "password":
        formErrors.password =
          value.length > 8 && value.length > 0
            ? ""
            : "Password has to be atleast 8 characters";
        break;
      default:
        break;
    }

    this.setState({ formErrors, [name]: value }, () => {
      console.log(this.state);
    });
  };

  render() {
    const { formErrors } = this.state;

    return (
      <MuiThemeProvider>
        <React.Fragment>
          <AppBar
            title="DonsApp - Social Media Application"
            style={{ background: "#212121" }}
          ></AppBar>
          <Grid container justify="center" alignItems="center">
            <Avatar alt="DonsApp Logo" src={logo} style={styles.bigAvatar} />
          </Grid>
          <TextField
            hintText="Enter your username"
            floatingLabelText="UserName"
            type="text"
            name="username"
            onChange={this.handleChange}
            //defaultValue={values.username}
          />

          {formErrors.username.length > 0 && (
            <span className={styles.errorMessage}>{formErrors.username}</span>
          )}
          <br />
          <TextField
            id="standard-password-input"
            hintText="Enter your password"
            floatingLabelText="Password"
            type="password"
            name="password"
            autoComplete="current-password"
            onChange={this.handleChange}
            //onChange={handleChange("password")}
            //defaultValue={values.password}
          />
          <br />
          {formErrors.password.length > 0 && (
            <span className={styles.errorMessage}>{formErrors.password}</span>
          )}
          <br />
          <RaisedButton
            label="Submit"
            primary={true}
            style={{ background: "#2E3B55" }}
            onClick={this.handleSubmit}
          ></RaisedButton>
        </React.Fragment>
      </MuiThemeProvider>
    );
  }
}

const styles = {
  button: {
    margin: 15
  },
  bigAvatar: {
    margin: 20,
    width: 240,
    height: 300
  },
  title: {
    flexGrow: 1,
    align: "center"

    // display: "none"
  },
  root: {
    flexGrow: 1
  },
  errorMessage: {
    color: red
  }
};

export default Login;
