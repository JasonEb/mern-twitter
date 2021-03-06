const express = require("express")
const router = express.Router()
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const keys = require('../../config/keys')
const passport = require('passport')
const User = require('../../models/User')

//Validations
const validateRegisterInput = require('../../validations/register')
const validateLoginInput = require('../../validations/login')

router.get("/test", (req, res) => res.json({ msg: "This is the users route" }))

//Register
router.post('/register', (req, res) => {
    const { errors, isValid } = validateRegisterInput(req.body)

    if (!isValid) {
        return res.status(400).json(errors)
    }

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
                            .then( user => {
                                const payload = { id: user.id, username: user.username }

                                jwt.sign(payload, keys.secretOrKey, { expiresIn: 3600 }, (err, token) => {
                                    res.json({
                                        success: true,
                                        token: "Bearer " + token
                                    })
                                })
                            })
                            .catch( err => console.log(err))
                    })
                })
            }
        })

})

//Login
router.post('/login', (req, res) =>{
    const { errors, isValid } = validateLoginInput(req.body)

    if (!isValid) {
        return res.status(400).json(errors)
    }
 
    const {email, password} = req.body

    User.findOne({email})
        .then( user => {
            if (!user) {
                return res.status(400).json({email: 'User does not exist'})
            }

            bcrypt.compare(password, user.password)
                .then(isMatch => {
                    if (isMatch) {
                        const payload = {id: user.id, username: user.username}

                        jwt.sign(
                            payload,
                            keys.secretOrKey,
                            // Sets key to expire in an hour
                            {expiresIn: 3600},
                            (err, token) => {
                                res.json({
                                    success: true,
                                    token: 'Bearer ' + token
                                })
                            }
                        )
                    } else {
                        return res.status(400).json({password: 'Incorrect password'})
                    }
                })
        })

})


//Current User
router.get('/current', passport.authenticate('jwt', {session: false}), (req , res) => {
    res.json({
        id: req.user.id,
        username: req.user.username,
        email: req.user.email
    })
})

module.exports = router;