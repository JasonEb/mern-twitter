import React, { Component } from 'react'

class Tweet extends Component {
    render() {
        return (
            <div className="tweet">
                <h3>{this.props.tweet.text}</h3>
            </div>
        )
    }
}

export default Tweet