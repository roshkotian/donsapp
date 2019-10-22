import React, { Component } from 'react';
import { Select as Reactselect } from "react-dropdown-select";
import axios from "axios";
import swal from "sweetalert";
const API_URL="http://localhost:5000/";
const roledata = [
	{ label: 'Student', value: 'Student' },
	{ label: 'Professor', value: 'Professor' },
	{ label: 'Admin', value: 'Admin' },
	{ label: 'Other', value: 'Other' },
];
const departmentdata = [
	{ label: 'Cse', value: 'Cse' },
	{ label: 'Music', value: 'Music' },
	{ label: 'Mechanical', value: 'Mechanical' },
];	

const securitydata = [
	{ label: 'what is the name of your pet?', value: 'what is the name of your pet?' },
	{ label: 'What is your favourite car?', value: 'What is your favourite car?' },
	{ label: 'Where were you Born?', value: 'Where were you Born?' },
];
class Register extends Component {
	state = {
		email: "",
		password: "",
		confrimpassword: "",
		firstname: "",
		lastname: "",
		role: "student",
		username: "",
		department:"",
		securityQuestion:"",
		securityanswer: "",
		role: "",
		errors: {
		}
	};
/*************************************************************************************
						  HANDLE VALUES FOR INPOYT FIELDS
 **************************************************************************************/

	handleChange = (event) => {
		console.log(event.target.value)
		this.setState({ [event.target.name]: event.target.value })
		this.setState({
			errors: Object.assign(this.state.errors, { [event.target.name]: "" })
		});
	}

	handleChangerole(value) {
		this.setState({ role:value[0].value, errors: Object.assign(this.state.errors, {role: "" }) });
	}
	handleChangdepartment(value){
		this.setState({ department:value[0].value, errors: Object.assign(this.state.errors, {department: "" }) });
	}
	handleChangsecurity(value) {
		this.setState({ securityQuestion: value[0].value, errors: Object.assign(this.state.errors, {securityQuestion: "" }) });
	}
    /*************************************************************************************
                             HANDLE  FORM ERRORS
    **************************************************************************************/
	validateForm = () => {
		let { email, username, password, errors, role, firstname, lastname, securityanswer, confrimpassword, department ,securityQuestion} = this.state
		let formIsValid = true
		if (!firstname || firstname == "") {
			formIsValid = false
			errors['firstname'] = '* firstname is required'
		}
		if (firstname !== "") {
			console.log("hh",firstname.length <=15)
			var pattern = new RegExp(/^[a-z A-Z]+$/);
			if (!pattern.test(firstname)) {
				formIsValid = false;
				errors["firstname"] = "firstname should not contain  numbers and  special characters";
			} else if (firstname.length >15){
				formIsValid = false;
				errors["firstname"] = "firstname should  be less then 15 characters";
			}
		}
		if (!lastname || lastname == "") {
			formIsValid = false
			errors['lastname'] = '* lastname is required'
		}

		if (!username || username == "" || username == undefined) {
			formIsValid = false
			errors['username'] = '* username is required'
		}
	
		if (!role || role == "" || role == undefined) {
			formIsValid = false
			errors['role'] = '* role is required'
		}

		if (!securityQuestion || securityQuestion == "" || securityQuestion == undefined) {
			formIsValid = false
			errors['securityQuestion'] = '* security Question is required'
		}
		if (!department || department == "" || department == undefined) {
			formIsValid = false
			errors['department'] = '* department is required'
		}
		if (lastname !== "") {
			var pattern = new RegExp(/^[a-z A-Z]+$/);
			if (!pattern.test(lastname)) {
				formIsValid = false;
				errors["lastname"] = "lastname  should not contain  numbers and special characters";
			} else if (lastname.length > 15) {
				formIsValid = false;
				errors["lastname"] = "lastname should  be less then 15 characters";
			}
		}

		if (!username || username == "") {
			formIsValid = false
			errors['username'] = '* username is required'
		}



		if (!email || email == "") {
			formIsValid = false
			errors['email'] = '* Email is required'
		}
		if (email !== "") {
			var pattern = new RegExp(/^[a-zA-Z0-9]+\@pfw.edu/);
			if (!pattern.test(email)) {
				formIsValid = false;
				errors["email"] = "email address should contain @pfw.edu ";
			}
		}
		if (!password) {
			formIsValid = false
			errors['password'] = '* Password is required'
		}

		if (password !== "") {
			var pattern = new RegExp(/^.{8,}/);
			if (!pattern.test(password)) {
				formIsValid = false;
				errors["password"] = " * Password should be minimum 8 characters.";
			}
		}
		if (!confrimpassword || confrimpassword == "") {
			formIsValid = false
			errors['confrimpassword'] = '* confrim password is required'
		}
		if (confrimpassword != "") {
			if (password !== confrimpassword) {
				formIsValid = false;
				errors["confrimpassword"] = " * Confirm password should be same as the password.";
			}
		}
		if (!securityanswer || securityanswer == "") {
			formIsValid = false
			errors['securityanswer'] = '* security answer is required'
		}
		this.setState({ errors })
		return formIsValid
	}


/*************************************************************************************
					Register API CALLING 
 **************************************************************************************/
	register = async (event) => {
		event.preventDefault();
		if (this.validateForm()) {
			let { email, username, password, role, firstname, lastname, securityanswer, securityQuestion, department} = this.state
			let body = {
				firstName:firstname,
				lastName:lastname,
				role,
				userName:username,
				securityQuestion,
				securityanswer,
				department,
				email,
				password,
				userId:Date.now().toString,
			}
			// {
				// 	"firstName": "Hair",
			// 	"lastName": "Bonam",
			// 	"role": "",
			// 	"department":"CSE",
			// 	"userId": "100021",
			// 	"email": "haribonam9@gmail.com",
			// 	"userName": "haribonam",
			// 	"password":"1234567",
			// 	"securityQuestion": "Sample question",
			// 	"securityanswer": "SAmple answer"
			// }
			console.log("body ===>>>",body);
			
			axios({
				// url: API_URL + 'user/save',
				url:'http://localhost:5000/user/save',
				method: "POST",
				headers: {
					'Content-Type': 'application/json',
				},
				data: JSON.stringify(body)
			}).then(response => {
				if (response) {
					swal("", "you are succesfully  Loggedin!", "success");
					this.props.history.push('/login')
				} else {
					swal("Oops!", "Something went wrong!", "error");
				}
			}).catch(error => {
			})
		}
	}

	render() {
		let { email, password, errors, role, securityQuestion, firstname, lastname, confrimpassword, username, department} = this.state
		return (
			<div className="login-page">
				<div className="login-outer text-center">
					<div className="login-inner">
						<div >
							<img src="assets/images/icons/registerlogo.jpg" alt="logo" title="logo" />
						</div>
						<form className="login-form">
							{/* <p>First Name</p> */}
							<div className="form-group">
								<input className="form-control" type="text" name="firstname" value={firstname} placeholder="Enter firstname" id="firstname" onChange={this.handleChange} />
								<p className=" text-danger text-center">{errors.firstname}</p>
							</div>
							{/* <h2> Last Name</h2> */}
							<div className="form-group">
								<input className="form-control" type="text" name="lastname" value={lastname} placeholder="Enter Lastname" id="lastname" onChange={this.handleChange} />
								<p className=" text-danger text-center">{errors.lastname}</p>
							</div>
							{/* <h2>Email</h2> */}
							<div className="form-group">
								<input className="form-control" type="email" name="email" value={email} placeholder="Enter email" id="email" onChange={this.handleChange} />
								<p className=" text-danger text-center">{errors.email}</p>
							</div>
							{/* <h2>Password</h2> */}
							<div className="form-group">
								<Reactselect options={roledata} placeholder="Select role" dropdownPosition="auto" searchable={false} value={role} onChange={(value) => this.handleChangerole(value)} />
								<p className="text-danger text-center">{errors.role}</p>
							</div>
							<div className="form-group">
								<Reactselect options={departmentdata} placeholder="Select department" dropdownPosition="auto" searchable={false} value={department} onChange={(value) => this.handleChangdepartment(value)} />
								<p className="text-danger text-center">{errors.department}</p>
							</div>
							<div className="form-group">
								<input className="form-control" type="text" name="username" value={username} placeholder="Enter username" id="username" onChange={this.handleChange} />
								<p className=" text-danger text-center">{errors.username}</p>
							</div>
							<div className="form-group">
								<input className="form-control" type="password" placeholder="Password" name="password" value={password} placeholder="Password" id="password" onChange={this.handleChange} />
								<p className=" text-danger text-center">{errors.password}</p>
							</div>
							<div className="form-group">
								<input className="form-control" type="password" placeholder="Password" name="confrimpassword" value={confrimpassword} placeholder="Confrim  Password" id="password" onChange={this.handleChange} />
								<p className=" text-danger text-center">{errors.confrimpassword}</p>
							</div>
							<div className="form-group">
								<Reactselect options={securitydata} placeholder="Select Security question" dropdownPosition="auto" searchable={false} value={securityQuestion} onChange={(value) => this.handleChangsecurity(value)} />
								<p className="text-danger text-center">{errors.securityQuestion}</p>
							</div>
							<div className="form-group">
								<input className="form-control" type="text" name="securityanswer" placeholder="Enter security  answer" id="securityanswer" onChange={this.handleChange} />
								<p className=" text-danger text-center">{errors.securityanswer}</p>
							</div>
			
							<div className="forgot-password">
								<div className="forgot-link">
									<a href="javascript:;" className="link" onClick={()=>this.props.history.push("/login")}>Cancel</a>
								</div>
							</div>
						</form>
					</div>
					<div className="login-btn">
						<button className="btn btn-primary btn-block" onClick={(e) => this.register(e)}>Register</button>
					</div>
				</div>
			</div>
		);
	}
}
export default Register; 