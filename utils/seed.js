const faker = require("faker")
const User = require('../models/User')
const db = require('../config/keys').mongoURI
const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

mongoose
    .connect(db, { useNewUrlParser: true})
    .then( () =>  {
        console.log(`Seed file connected to MongoDB successfully`)
        let users = []
        let newUser = {}
        for (let x = 0; x < 10; x++){
            newUser = {
                username: faker.internet.userName(),
                email: faker.internet.email(),
                password: bcrypt.hashSync('test123', 10)
            }
            users.push(newUser)
        }


        User.insertMany(users)
            .then( () => console.log("User seed success"))
            .catch( err => console.log("User Seed Error", err))
    })
    .catch( err => console.log(err))
