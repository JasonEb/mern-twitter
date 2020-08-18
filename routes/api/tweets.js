const express = require("express")
const router = express.Router()
const mongoose = require('mongoose')
const passport = require('passport')

const Tweet = require('../../models/Tweet')
const validateTweetInput = require('../../validations/tweets')

router.get("/", (req, res) => {
    let queryOptions = { path: 'User', options: {sort:{date: -1}}}
    Tweet.find().populate('user', 'username email').exec( (err, result) =>{
        if (err) {
            return res.status(404).json({ notweetsFound: 'No tweets found'})
        }
        return res.json(result)
    })
})

router.get('/user/:user_id', (req, res) => {
    const {user_id} = req.params
    Tweet.find({user: user_id}).populate('user', 'username email').exec( (err, result) =>{
        if (err) {
            return res.status(404).json({ notweetsFound: 'No tweets found'})
        }
        return res.json(result)
    })
})

router.get('/:id', (req, res) => {
    const {id} = req.params
    Tweet.findById({id})
        .then(tweets => res.json(tweet))
        .catch(err => {
            res.status(404).json({notweetFound: 'No tweet found'})
        })
})

router.post('/',
    passport.authenticate('jwt', {session: false}),
    (req, res) => {
        const {errors, isValid} = validateTweetInput(req.body)

        if (!isValid) {
            return res.status(400).json(errors)
        }


        const newTweet = new Tweet({
            text: req.body.text,
            user: req.user.id
        })

        newTweet.save().then(tweet => res.json(tweet))
    }
)

module.exports = router;