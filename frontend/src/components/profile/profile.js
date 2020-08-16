import React, { useEffect } from 'react'
import { useSelector,useDispatch } from 'react-redux'
import { fetchUserTweets } from '../../actions/tweet_actions'
import Tweet from '../tweets/tweet'

const Profile = () => {
    const user = useSelector( state => {
        return state.session.user
    })

    const tweets = useSelector( state => {
        return state.tweets.user
    })
    
    const dispatch = useDispatch()
    
    useEffect(() =>{
        dispatch(fetchUserTweets(user.id))
    }, [])

    let tweetItems = Object.values(tweets).map( (tweet, idx) => <Tweet key={idx} tweet={tweet} />)

    return (
        <div>Profile
            <div className="tweet-index">
                <h2>Tweets</h2>
                {tweetItems}
            </div>
        </div>
    )
}

export default Profile