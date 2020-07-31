const express = require("express");
const router = express.Router();
const bcrypt = require('bcryptjs');
const User = require('../../models/User');

const bodyParser = require('body-parser');

router.get("/test", (req, res) => res.json({ msg: "This is the users route" }));

//Register
router.post('/register', (req, res) => {
    // Check for duplicate email
    User.findOne({ email: req.body.email})
        .then( user => {
            if(user) {
                return res.status(400).json({email: "That email is already in use"})
            } else {
                const newUser = new User({
                    username: req.body.username,
                    email: req.body.email,
                    password: req.body.password
                })

                bcrypt.genSalt(10, (err, salt) => {
                    bcrypt.hash(newUser.password, salt, (err, hash) => {
                        if (err) throw err;

                        newUser.password = hash
                        newUser.save()
                            .then( user => res.json(user))
                            .catch( err => console.log(err))
                    })
                })
            }
        })

})

//Login
router.post('/login', (req, res) =>{
    const {email, password} = req.body

    User.findOne({email})
        .then( user => {
            if (!user) {
                return res.status(400).json({email: 'User does not exist'})
            }

            bcrypt.compare(password, user.password)
                .then(isMatch => {
                    if (isMatch) {
                        res.json({msg: 'Success'})
                    } else {
                        return res.status(400).json({password: 'Incorrect password'})
                    }
                })
        })

})

module.exports = router;