const { Login, UserInformation } = require('../models/register.model');
const crypto = require('crypto');



//save posts in mongodb
exports.save = (req, res) => {
    let { email, userName, password, role, firstName, lastName, securityanswer, securityQuestion, department, userId } = req.body;
    // Hashng Password 
    const secret = 'donsapp';
    const hash = crypto.createHmac('sha256', secret)
        .update(password)
        .digest('hex');

    function validateName(name) {
        if (name.length <= 10) return true;
        return false;
    }
    // validate firstNmae
    if (!validateName(firstName)) return res.send('Firstname should be less than 10 characters');
    if (!validateName(lastName)) return res.send('Lastname should be less than 10 characters');
    if (!validateName(securityanswer)) return res.send('securityanswer should be less than 10 characters');
    if (!validateName(userName)) return res.send('userName should be less than 10 characters');
    // Validate roel
    if (role !== 'Admin' && role !== 'Student' && role !== 'Other' && role !== 'Professor') return res.send('select role');
    if (department !== 'Cse' && department !== 'Music' && department !== 'Mechanical') return res.send('select department');
    userId = Date.now().toString();
    const dataForInformation = { firstName, lastName, role, department, email, userId };
    const dataForLogin = { userName, password: hash, securityanswer, securityQuestion, userId };

    const saveLogin = new Login(dataForLogin);
    const saveInformation = new UserInformation(dataForInformation);

    saveLogin.save()
        .then(data =>
            console.log(data),
            saveInformation.save()
                .then(data => res.status(200).json({ 'post': 'Registered successfully' }))
        )
        .catch(err => {
            console.log(err);
            res.status(400).send('Registration Failed');
        })

};

