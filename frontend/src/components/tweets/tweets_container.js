import { connect } from 'react-redux'
import { fetchTweets } from '../../actions/tweet_actions'
import Tweets from './tweets'

const stateToProps = (state) => {
    return {
        tweets: Object.values(state.tweets.all)
    }
}

const dispatchToProps = dispatch => {
    return {
        fetchTweets: () => dispatch(fetchTweets())
    }
}

export default connect(stateToProps, dispatchToProps)(Tweets)