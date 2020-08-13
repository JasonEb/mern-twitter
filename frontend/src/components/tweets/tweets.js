import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'

class Tweets extends Component {
    constructor(props) {
        super(props)

        this.state = {
            tweets: []
        }
    }

    componentWillMount() {
        this.props.fetchTweets()
    }

    componentWillReceiveProps(newState) {
        this.setState({ tweets: newState.tweets})
    }

    render() {
        return (
            <div>
                Tweets
            </div>
        )
    }
}

export default withRouter(Tweets)