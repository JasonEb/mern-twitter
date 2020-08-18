import React from 'react'
import Tweet from './tweet'

class TweetForm extends React.Component {
    constructor(props) {
        super (props)

        this.state = {
            text: ''
        }

        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleSubmit(e){
        e.preventDefault()
        this.props.composeTweet(this.state.text)
    }

    update() {
        return e => this.setState({
            text: e.currentTarget.value
        })
    }

    render() {
        return(
            <div>
                <form onSubmit={this.handleSubmit}>
                    <div>
                        <input 
                            type="textarea"
                            value={this.state.text}
                            onChange={this.update()}
                            placeholder="Write message..." 
                        />
                        <input type="submit" value="Submit" />
                    </div>
                </form>
            </div>
        )
    }
}

export default TweetForm