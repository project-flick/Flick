import { useState } from 'react';
import './UI.scss'

// 0=display text, 1=css class, 2=active style
const FollowButtonStates = {
	FOLLOW: ["Follow", "follow", 1],
	FOLLOW_BACK: ["Follow Back", "follow-back", 1],
	FOLLOWED: ["Followed", "followed", 0],
	FOLLOWING: ["Following", "following", 0]
}

const FollowButton = (props) => {

	// Calculate this button's state by checking whether props.user
	// is following the current logged in user or not
	const [followState] = useState(props.followState);

	return (
		<button className={`follow-btn ${followState[1]} ${followState[2]?'':'active'}`}>
			{followState[0]}
		</button>
	)
}

export {FollowButtonStates, FollowButton}