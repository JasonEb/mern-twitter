import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import Tweet from './tweet'

class Tweets extends Component {
    constructor(props) {
        super(props)
    }

    componentWillMount() {
        this.props.fetchTweets()
    }

    componentWillReceiveProps(newState) {
        this.setState({ tweets: newState.tweets})
    }

    render() {
        let tweetItems = this.props.tweets.map( (tweet, idx) => <Tweet key={idx} tweet={tweet} />)
        return (
            <div className="tweet-index">
                <h2>Tweets</h2>
                {tweetItems}
            </div>
        )
    }
}

export default withRouter(Tweets)