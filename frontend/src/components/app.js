import React from 'react'
import { AuthRoute, ProtectedRoute } from '../util/route_util'
import { Switch } from 'react-router-dom'
import NavBarContainer from './nav/navbar_container'

import MainPage from './main/main_page'
import LoginFormContainer from './session/login_form_container'
import SignupFormContainer from './session/signup_form_container'

//Tweets
import TweetsContainer from './tweets/tweets_container'
import Profile from './profile/profile'
import TweetFormContainer from './tweets/tweet_form_container'
import TweetFormHooks from './tweets/tweet_form_hooks'

const App = () => (
    <div>
        <NavBarContainer />
        <Switch>
            <AuthRoute exact path="/" component={MainPage} />
            <AuthRoute exact path="/login" component={LoginFormContainer} />
            <AuthRoute exact path="/signup" component={SignupFormContainer} />

            <ProtectedRoute exact path="/tweets" component={TweetsContainer} />
            <ProtectedRoute exact path="/profile" component={Profile} />
            <ProtectedRoute exact path="/new_tweet" component={TweetFormHooks} />
        </Switch>
    </div>
)

export default App