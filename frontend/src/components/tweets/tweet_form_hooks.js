import React, {useState, useEffect} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Tweet from './tweet'
import { composeTweet } from '../../actions/tweet_actions'

const TweetFormHooks = () => {
    const [text, setText] = useState('')
    const dispatch = useDispatch()

    const handleSubmit = (e) => {
        e.preventDefault()
        dispatch(composeTweet({text: text})).then( setText(''))
    }

    const update = (e) => {
        setText(e.target.value)
    }

    return(
        <div>
            <form onSubmit={handleSubmit}>
                <div>
                    <input 
                        type="textarea"
                        value={text}
                        onChange={update}
                        placeholder="Write message..." 
                    />
                    <input type="submit" value="Submit" />
                </div>
            </form>
        </div>
    )
}

export default TweetFormHooks