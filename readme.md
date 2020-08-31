# MERN Twitter Project 

This is a completed project from App Academy Online's MERN Stack Curriculum. It was a good experience in understanding the MERN stack from a Rails perspective, and I'd like to share some insight for anybody looking at the project. 

## Installation
1. Git clone repo url
2. Run `npm install` for server 
3. Run `npm frontend-install` to install the frontend. Note that to further manage frontend configuration and dependencies, make sure `cd` to the frontend directory. 

NB: the `config` files are required as well, but those are on the gitignore.  `config/keys.js` is required for mongo Atlas and secret keys, and `config/passport` is needed for authentication. 

```javascript
//keys.js
module.exports = {
    mongoURI: "yourAtlasURL",
    secretOrKey: "yourSecretString"
}
```

```javascript
//passport.js
const JwtStrategy = require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt
const mongoose = require('mongoose')
const User = mongoose.model('User')
const keys = require('../config/keys')

const options = {}
options.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken()
options.secretOrKey = keys.secretOrKey

module.exports = passport => {
    passport.use(new JwtStrategy(options, (jwt_payload, done) => {
        User.findById(jwt_payload.id)
            .then( user => {
                if (user) { 
                //returns user to client
                    return done(null, user)
                }
                // else return false for no user
                return done(null, false)
            })
            .catch( err => console.log(err))
    }))
}
```

### Mongo Atlas Setup
During the Setup Notes, the reading will include MongoDB Atlas instructions. When _copying and pasting the connection string_, the string now has a `<dbname>`. I found it unclear what the dbname is nor is it referenced in the reading currently.

However the `dbname` is up to user's discretion; upon naming it Atlas will create a new database with that name. For example, `test_database?retryWrites=...` will automatically create a database named `test_database` on Atlas. 


# Solution Updates
The current [solution] has a couple issues before it can be ran locally. Core fixes have been submitted for review to the solution repo, and I've also introduced more documentation and refactoring to make the MERN Twitter project more accessible. However these are more subjective in nature so I'll have these updates seperated in different feature branches. 

### Seeds
In the Tweets Reading, populating the dtatabase with dummy data is 

New to the utils folder is `seed.js`, which is a script that connects to mongo database and uses the [faker.js](https://github.com/marak/Faker.js/) library to populate random tweets for random users with the mongoose models. Helpful for interacting with the database and reading data data.

### bodyParse Priority
When initializing `bodyParser` for reading http responses within `app.js`, it has to be called before the api routes. 
```javascript
//app.js

//These routes won't have bodyParser enabled
//because bodyParser is initialized afterwards
app.use("/api/users", users);
app.use("/api/tweets", tweets);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use("/api/tweets", tweets);
```

Initialize bodyParser first for the routes

```javascript
//app.js

//Correct
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use("/api/users", users);
app.use("/api/tweets", tweets);
```
### Joining MongoDB collections 
The curriculum doesn't demonstrate joining collections with Mongoose in the Tweet queries, despite creating an reference for Users in the mongoose Tweet Model. It seems like a good opportunity introduce the `populate` function from Mongoose, especially since the SQL and Rails curriculum heavily explores joining collections. 

This would become more evident when displaying All Tweets on the front-end. The Tweets API will only return the object ID's of the reference, and not be filled with User data such as username. 

```javascript
//routes/api/users.js
router.get("/", (req, res) => {
    let queryOptions = { path: 'User', options: {sort:{date: -1}}}
    Tweet.find().populate('user', 'username email').exec( (err, result) =>{
        if (err) {
            return res.status(404).json({ notweetsFound: 'No tweets found'})
        }
        return res.json(result)
    })
})
```

Above is the updated Tweets GET route demonstrating `populate`. Note how the arguments selects fields or attributes, and especially note the `exec` function chain that concludes the code. 

There is more discussion to be had about the constraints and optimization of querying, but I find it a comfortable area to explore after the back-end curriculum. 

[Mongoose Populate Documentation](https://mongoosejs.com/docs/populate.html)

### Redux Tools Integration
To install `redux-dev-tool`, the instructions provide a few ways to integrate it into the store. Here's how I enabled it using the `composeWithDevTools` npm package while combining multiple middleware. 

```javascript
//store/store.js
import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import logger from 'redux-logger'
import rootReducer from '../reducers/root_reducer'
import { composeWithDevTools } from 'redux-devtools-extension'

const configureStore = (preloadedstate = {}) => (
    createStore(
        rootReducer,
        preloadedstate, composeWithDevTools(
            applyMiddleware(thunk, logger)
        )
    )
)

export default configureStore
```
### Debugging with Node inspect
I debugged the back-end primarily with hosting different windows/tabs for the back-end and front-end scripts. Debugging back-end specifically was used with `node --inspect`, which allows the Chrome browser to attach itself to the server code and enable the same debugging tools as the front-end. 

Even though the project demonstrates the convenience of `concurrently` running both back-end and front-end code, I found it obfuscated the debugging process. Debugging the front-end code is relatively easy, but debugging back-end code requires some configuration. 

Visual Code offers ways of hosting debugging on different ports, which won't be consistent with the front-end api calls. But there is configuration to run debugging straight from the editor. 

[solution]: https://github.com/appacademy/mern-twitter
