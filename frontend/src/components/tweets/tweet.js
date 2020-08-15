import React, { Component } from 'react'

class Tweet extends Component {
    render() {
        let { user,text } = this.props.tweet
        let { username } = user
        return (
            <div className="tweet">
                <h4>{username}</h4><pre>{text}</pre>
            </div>
        )
    }
}

export default Tweet