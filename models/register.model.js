const { Schema, model } = require('mongoose');

const UserInformationSchema = new Schema({
    firstName: String,
    lastName: String,
    role: String,
    department: String,
    userId: String,
    email: String,
}, { timestamps: true, });

const LoginsSchema = new Schema({
    userId: String,
    userName: String,
    password: String,
    activeIndicator: {
        type: String,
        default: "Y"
    },
    securityQuestion: String,
    securityanswer: String
}, { timestamps: true, });

const UserInformation = model('userinformations', UserInformationSchema);
const Login = model('logins', LoginsSchema);

module.exports = { Login, UserInformation };
