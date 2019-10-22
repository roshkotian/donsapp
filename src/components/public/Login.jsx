import React, { Component } from 'react';
class Login extends Component {
    state = {
        emailId: "",
        password: "",
        rememberme: false,
        checked: false,
        isLoading: false,
        errors: {
        }
    };



    /*************** Remember Me ********************/
    rememberMe = () => {
        this.setState({ rememberme: Boolean(!this.state.rememberme) });
    }
    handleChange = (event) => {
        // console.log(event.target.value)
        this.setState({ [event.target.name]: event.target.value })
        this.setState({
            errors: Object.assign(this.state.errors, { [event.target.name]: "" })
        });
    }
    /*************************************************************************************
                             HANDLE  FORM ERRORS
    **************************************************************************************/
    validateForm = () => {
        let { emailId, password, errors } = this.state
        let formIsValid = true
        if (!emailId || emailId == "") {
            formIsValid = false
            errors['emailId'] = 'Email is required'
        }
        if (emailId !== "") {
            var pattern = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
            if (!pattern.test(emailId)) {
                formIsValid = false;
                errors["emailId"] = "Invalid email Address.";
            }
        }
        if (!password) {
            formIsValid = false
            errors['password'] = 'Password is Required'
        }
        this.setState({ errors })
        return formIsValid
    }



    render() {
        let { emailId, password, errors, rememberme} = this.state

        return (
            <div className="login-page">
                <div className="login-outer text-center">
                    <div className="login-inner">
                        <div >
                            <img src="assets/images/icons/registerlogo.jpg" alt="logo" title="logo" />
                        </div>
                        <form className="login-form" onSubmit={(e) => this.loginForm(e)}>
                            <div className={errors.emailId ? "form-group error-input" : "form-group"}>
                                <input className="form-control" type="email" placeholder="Username or email" name="emailId" value={emailId} placeholder="Enter email" id="emailId" onChange={this.handleChange} />
                                <p className=" text-danger text-center">{errors.emailId}</p>
                            </div>
                            <div className={errors.password ? "form-group error-input" : "form-group"}>
                                <input className="form-control" type="password" placeholder="Password" name="password" value={password} placeholder="Enter Password" id="password" onChange={this.handleChange} />
                                <p className=" text-danger text-center">{errors.password}</p>
                            </div>
                          <div className="signup-link">
                                <a href="javascript:;" onClick={()=>this.props.history.push("/")} className="link">Don´t have an account? Sign up</a>
                            </div> 
                        </form>
                        <div className="login-btn">
                            <button className="btn btn-primary btn-block" type="submit">Login</button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
export default Login; 