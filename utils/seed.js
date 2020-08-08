const faker = require("faker")
const User = require('../models/User')
const Tweet = require('../models/Tweet')
const db = require('../config/keys').mongoURI
const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const _ = require("lodash")

mongoose
    .connect(db, { useNewUrlParser: true})
    .then( () =>  {
        console.log(`Seed file connected to MongoDB successfully`)
        // let users = []
        // let newUser = {}
        // for (let x = 0; x < 10; x++){
        //     newUser = {
        //         username: faker.internet.userName(),
        //         email: faker.internet.email(),
        //         password: bcrypt.hashSync('test123', 10)
        //     }
        //     users.push(newUser)
        // }


        // User.insertMany(users)
        //     .then( (e) => console.log("User seed success"))
        //     .catch( err => console.log("User Seed Error", err))

        //create tweets by getting random user ids assigned to newTweets
        User.find({}).then( (users) => {
            let tweets = []
            for (let x = 0; x < 10; x++){
                const newTweet = new Tweet({
                    text: faker.lorem.sentence(),
                    user: _.sample(users.map( user => user._id )) 
                })
                tweets.push(newTweet)
            }
            return Tweet.insertMany(tweets)
        })
    })
    .catch( err => console.log(err))
